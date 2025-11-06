import { BaseElement } from "./base.js";
import { ffmpeg, readFileStreams } from "../utils/ffmpegUtils.js";
import { join } from "path";
import fs from "fs";

/**
 * 音频可视化元素
 * 支持多种可视化类型：waveform、spectrum、bars、circle
 */
export class AudioVisualizerElement extends BaseElement {
  constructor(config) {
    super(config);
    
    // 音频源
    this.audioFile = config.audioFile || config.source || config.src;
    this.audioPath = null;
    
    // 可视化类型
    this.visualizerType = config.visualizerType || 'waveform'; // waveform, spectrum, bars, circle
    
    // 尺寸属性（需要从 config 中获取，BaseElement 可能没有处理）
    this.width = config.width || this.width || '200px';
    this.height = config.height || this.height || '100px';
    
    // 样式配置
    this.color = config.color || '#ffffff';
    this.backgroundColor = config.backgroundColor || null;
    this.lineWidth = config.lineWidth || 2;
    this.barWidth = config.barWidth || 4;
    this.barSpacing = config.barSpacing || 2;
    this.maxBars = config.maxBars || 32;
    this.sensitivity = config.sensitivity || 1.0; // 灵敏度倍增器
    
    // 音频数据缓存
    this.audioData = null; // 原始 PCM 数据
    this.spectrumData = null; // 频谱数据缓存
    this.sampleRate = 48000; // 采样率
    this.samplesPerFrame = 0; // 每帧采样数
    
    // 音频时长和偏移
    this.audioDuration = 0;
    this.cutFrom = config.cutFrom || 0;
    this.cutTo = config.cutTo;
    
    this.isInitialized = false;
  }

  async initialize() {
    await super.initialize();
    
    if (this.audioFile) {
      // 检查并准备音频文件
      await this.prepareAudioFile();
      // 提取音频数据
      await this.extractAudioData();
      this.isInitialized = true;
    }
  }

  /**
   * 准备音频文件（下载或复制到临时目录）
   */
  async prepareAudioFile() {
    if (!this.audioFile) {
      throw new Error('音频文件路径未指定');
    }

    // 如果已经是本地路径，直接使用
    if (!this.audioFile.startsWith('http')) {
      this.audioPath = this.audioFile;
      return;
    }

    // 如果是 HTTP URL，需要下载（可以使用现有的 downloadAndDetect）
    const { downloadAndDetect } = await import('../utils/download.js');
    const result = await downloadAndDetect(this.audioFile, this.tmpDir);
    this.audioPath = result.filePath;
  }

  /**
   * 提取音频数据
   * 使用 FFmpeg 提取原始 PCM 数据
   */
  async extractAudioData() {
    if (!this.audioPath) {
      throw new Error('音频文件路径无效');
    }

    // 检查文件是否有音频流
    const streams = await readFileStreams(this.audioPath);
    if (!streams.some(s => s.codec_type === "audio")) {
      throw new Error(`文件 ${this.audioPath} 不包含音频流`);
    }

    // 获取音频信息
    const audioStream = streams.find(s => s.codec_type === "audio");
    const duration = audioStream.duration || 0;
    this.audioDuration = this.cutTo 
      ? Math.min(duration, this.cutTo - this.cutFrom)
      : duration;

    // 计算每帧采样数
    this.samplesPerFrame = Math.floor(this.sampleRate / (this.fps || 30));

    // 提取 PCM 数据到临时文件
    // 确保 tmpDir 存在
    const tmpDir = this.tmpDir || process.env.TEMP || process.env.TMP || '/tmp';
    const tempPcmPath = join(tmpDir, `audio-${Date.now()}.pcm`);
    
    const args = [
      '-nostdin',
      ...(this.cutFrom ? ['-ss', this.cutFrom.toString()] : []),
      '-i', this.audioPath,
      ...(this.cutTo ? ['-t', (this.cutTo - this.cutFrom).toString()] : []),
      '-f', 's16le', // 16-bit signed little-endian
      '-ar', this.sampleRate.toString(),
      '-ac', '1', // 单声道
      '-y', tempPcmPath
    ];

    await ffmpeg(args);

    // 读取 PCM 数据
    const pcmBuffer = fs.readFileSync(tempPcmPath);
    
    // 转换为 16-bit 整数数组
    const samples = new Int16Array(pcmBuffer.buffer, pcmBuffer.byteOffset, pcmBuffer.length / 2);
    
    // 归一化到 -1 到 1 范围
    this.audioData = Array.from(samples).map(s => s / 32768.0);
    
    // 调试信息
    if (this.audioData.length > 0) {
      const maxAmplitude = Math.max(...this.audioData.map(Math.abs));
      console.log(`[AudioVisualizer] 音频数据提取成功: ${this.audioData.length} 个采样点, 最大振幅: ${maxAmplitude.toFixed(4)}`);
    } else {
      console.warn(`[AudioVisualizer] 警告: 音频数据为空`);
    }

    // 清理临时文件
    try {
      fs.unlinkSync(tempPcmPath);
    } catch (error) {
      // 忽略删除错误
    }
  }

  /**
   * 获取当前时间的音频数据
   */
  getAudioDataAtTime(time) {
    if (!this.audioData || this.audioData.length === 0) {
      return null;
    }

    // 计算相对于元素开始时间的音频时间
    const audioTime = time - this.startTime;
    if (audioTime < 0 || audioTime > this.duration) {
      return null;
    }

    // 计算采样索引范围
    const startSample = Math.floor(audioTime * this.sampleRate);
    const endSample = Math.min(
      startSample + this.samplesPerFrame,
      this.audioData.length
    );

    if (startSample >= this.audioData.length || startSample < 0) {
      return null;
    }

    // 提取当前帧的音频数据
    const frameData = this.audioData.slice(startSample, endSample);
    
    // 确保有数据
    if (!frameData || frameData.length === 0) {
      return null;
    }
    
    return frameData;
  }

  /**
   * 计算 FFT（简化版频谱分析）
   * 使用简单的 FFT 算法计算频谱
   */
  calculateSpectrum(audioData) {
    const N = audioData.length;
    if (N === 0) return null;

    // 应用窗函数（Hamming）
    const windowed = audioData.map((value, i) => {
      const window = 0.54 - 0.46 * Math.cos(2 * Math.PI * i / (N - 1));
      return value * window;
    });

    // 简化的 FFT（使用 Cooley-Tukey 算法的简化版本）
    // 这里使用更简单的方法：计算每个频率的幅度
    const spectrumSize = Math.min(this.maxBars, Math.floor(N / 2));
    const spectrum = new Array(spectrumSize).fill(0);

    // 计算每个频率分量的幅度
    for (let k = 0; k < spectrumSize; k++) {
      let real = 0;
      let imag = 0;
      
      for (let n = 0; n < N; n++) {
        const angle = -2 * Math.PI * k * n / N;
        real += windowed[n] * Math.cos(angle);
        imag += windowed[n] * Math.sin(angle);
      }
      
      // 计算幅度
      spectrum[k] = Math.sqrt(real * real + imag * imag) / N;
    }

    return spectrum;
  }

  /**
   * 计算 RMS（均方根）值，用于波形显示
   */
  calculateRMS(audioData) {
    if (!audioData || audioData.length === 0) return 0;
    
    const sum = audioData.reduce((acc, val) => acc + val * val, 0);
    return Math.sqrt(sum / audioData.length) * this.sensitivity;
  }

  /**
   * 计算峰值，用于波形显示
   */
  calculatePeak(audioData) {
    if (!audioData || audioData.length === 0) return 0;
    
    const max = Math.max(...audioData.map(Math.abs));
    return max * this.sensitivity;
  }

  /**
   * 读取下一帧
   */
  async readNextFrame(time, canvas) {
    if (!this.isInitialized || !this.audioData) {
      if (time === 0 || Math.floor(time) % 5 === 0) {
        console.warn(`[AudioVisualizer] 帧 ${time.toFixed(2)}s: 未初始化或音频数据为空`);
      }
      return null;
    }

    // 获取当前时间的音频数据
    const frameAudioData = this.getAudioDataAtTime(time);
    if (!frameAudioData || frameAudioData.length === 0) {
      if (time === 0 || Math.floor(time) % 5 === 0) {
        console.warn(`[AudioVisualizer] 帧 ${time.toFixed(2)}s: 无音频数据`);
      }
      return null;
    }

    // 调试：打印第一帧的数据信息
    if (time < 0.1) {
      const maxAmp = Math.max(...frameAudioData.map(Math.abs));
      console.log(`[AudioVisualizer] 帧 ${time.toFixed(2)}s: 数据长度=${frameAudioData.length}, 最大振幅=${maxAmp.toFixed(4)}`);
    }

    // 根据可视化类型渲染不同的效果
    const frameData = await this.renderVisualization(time, frameAudioData, canvas);
    
    if (!frameData) {
      if (time === 0 || Math.floor(time) % 5 === 0) {
        console.warn(`[AudioVisualizer] 帧 ${time.toFixed(2)}s: 渲染失败，返回null`);
      }
      return null;
    }

    // 应用变换（缩放、旋转、透明度等）
    const transform = this.getTransformAtTime(time);
    const positionProps = this.getPositionProps();

    const result = {
      ...frameData,
      x: positionProps.left,
      y: positionProps.top,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      rotation: transform.rotation,
      opacity: transform.opacity,
      originX: positionProps.originX,
      originY: positionProps.originY
    };

    // 调试：打印第一帧的位置信息
    if (time < 0.1) {
      console.log(`[AudioVisualizer] 帧 ${time.toFixed(2)}s: 位置=(${result.x}, ${result.y}), 尺寸=(${result.width}, ${result.height})`);
    }

    return result;
  }

  /**
   * 渲染可视化效果
   */
  async renderVisualization(time, audioData, canvas) {
    const { createCanvas } = await import('canvas');
    const { parsePositionValue } = await import('../utils/positionUtils.js');
    
    // 解析尺寸
    const width = typeof this.width === 'string' 
      ? parsePositionValue(this.width, this.canvasWidth, 'px')
      : (this.width || 200);
    const height = typeof this.height === 'string'
      ? parsePositionValue(this.height, this.canvasHeight, 'px')
      : (this.height || 100);

    if (!width || !height || width <= 0 || height <= 0) {
      console.warn(`[AudioVisualizer] 无效的尺寸: width=${width}, height=${height}`);
      return null;
    }

    // 创建一个刚好够大的画布，而不是全尺寸
    const tempCanvas = createCanvas(width, height);
    const ctx = tempCanvas.getContext('2d');

    // 设置抗锯齿
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 填充透明背景
    ctx.clearRect(0, 0, width, height);

    // 绘制背景（如果有）
    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      // 如果没有背景，绘制一个半透明的测试背景，确保能看到区域
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
    }

    // 绘制一个明显的测试矩形边框
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // 根据类型渲染不同的可视化（相对于画布中心）
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    
    const centerX = width / 2;
    const centerY = height / 2;

    switch (this.visualizerType) {
      case 'waveform':
        this.renderWaveform(ctx, audioData, centerX, centerY, width, height);
        break;
      case 'spectrum':
        this.renderSpectrum(ctx, audioData, centerX, centerY, width, height);
        break;
      case 'bars':
        this.renderBars(ctx, audioData, centerX, centerY, width, height);
        break;
      case 'circle':
        this.renderCircle(ctx, audioData, centerX, centerY, width, height);
        break;
      default:
        this.renderWaveform(ctx, audioData, centerX, centerY, width, height);
    }

    // 获取图像数据
    const imageData = tempCanvas.toBuffer('raw');
    return {
      data: imageData,
      width: width,
      height: height
    };
  }

  /**
   * 渲染波形图（示波器效果）
   */
  renderWaveform(ctx, audioData, x, y, width, height) {
    if (!audioData || audioData.length === 0) {
      console.warn('[AudioVisualizer] renderWaveform: 音频数据为空');
      return;
    }

    const centerY = y;
    const halfHeight = height / 2;
    const samples = Math.min(audioData.length, Math.floor(width));

    if (samples === 0) {
      console.warn(`[AudioVisualizer] renderWaveform: samples=0, width=${width}, audioData.length=${audioData.length}`);
      return;
    }

    // 绘制示波器网格线（淡色）
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.lineWidth = 1;
    
    // 水平网格线
    for (let i = 0; i <= 4; i++) {
      const gridY = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, gridY);
      ctx.lineTo(width, gridY);
      ctx.stroke();
    }
    
    // 垂直网格线
    for (let i = 0; i <= 10; i++) {
      const gridX = (width / 10) * i;
      ctx.beginPath();
      ctx.moveTo(gridX, 0);
      ctx.lineTo(gridX, height);
      ctx.stroke();
    }
    
    // 绘制中心基准线（更明显）
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // 绘制波形（使用原始音频值，不是绝对值，显示正负波形）
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    
    for (let i = 0; i < samples; i++) {
      const sampleIndex = Math.floor((i / samples) * audioData.length);
      // 使用原始音频值（有正负），创建真实的示波器效果
      const amplitude = audioData[sampleIndex] * this.sensitivity;
      // 限制振幅范围，但保持正负值
      const clampedAmplitude = Math.max(-0.95, Math.min(0.95, amplitude));
      
      const drawX = (i / samples) * width;
      const drawY = centerY - clampedAmplitude * halfHeight;

      if (i === 0) {
        ctx.moveTo(drawX, drawY);
      } else {
        ctx.lineTo(drawX, drawY);
      }
    }

    ctx.stroke();
  }

  /**
   * 渲染频谱图
   */
  renderSpectrum(ctx, audioData, x, y, width, height) {
    if (!audioData || audioData.length === 0) return;

    // 计算频谱
    const spectrum = this.calculateSpectrum(audioData);
    if (!spectrum || spectrum.length === 0) return;

    const centerY = y;
    const barWidth = width / spectrum.length;
    const maxAmplitude = Math.max(...spectrum) || 1;

    ctx.beginPath();

    for (let i = 0; i < spectrum.length; i++) {
      const amplitude = (spectrum[i] / maxAmplitude) * height * this.sensitivity;
      const drawX = x - width / 2 + i * barWidth;
      const topY = centerY - amplitude / 2;
      const bottomY = centerY + amplitude / 2;

      ctx.moveTo(drawX, topY);
      ctx.lineTo(drawX, bottomY);
    }

    ctx.stroke();
  }

  /**
   * 渲染条形图
   */
  renderBars(ctx, audioData, x, y, width, height) {
    if (!audioData || audioData.length === 0) {
      console.warn('[AudioVisualizer] renderBars: 音频数据为空');
      return;
    }

    // 计算频谱
    const spectrum = this.calculateSpectrum(audioData);
    if (!spectrum || spectrum.length === 0) {
      console.warn('[AudioVisualizer] renderBars: 频谱数据为空');
      return;
    }

    // 限制条形数量
    const numBars = Math.min(this.maxBars, spectrum.length);
    const maxAmplitude = Math.max(...spectrum) || 1;

    if (maxAmplitude === 0) {
      console.warn('[AudioVisualizer] renderBars: 最大振幅为0');
      return;
    }

    const totalBarWidth = numBars * this.barWidth + (numBars - 1) * this.barSpacing;
    const startX = x - totalBarWidth / 2;
    const baseY = y + height / 2;

    // 调试：绘制边框，确保能看到绘制区域
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);

    // 绘制条形
    ctx.fillStyle = this.color;
    
    for (let i = 0; i < numBars; i++) {
      const spectrumIndex = Math.floor((i / numBars) * spectrum.length);
      let amplitude = (spectrum[spectrumIndex] / maxAmplitude) * height * this.sensitivity;
      
      // 确保最小高度可见（至少 10 像素）
      if (amplitude < 10) {
        amplitude = 10;
      }
      
      // 限制最大高度（不超过画布高度的 90%）
      amplitude = Math.min(amplitude, height * 0.9);
      
      const barX = startX + i * (this.barWidth + this.barSpacing);
      const barY = baseY - amplitude;

      // 确保条形在画布范围内
      if (barX >= 0 && barX + this.barWidth <= width && barY >= 0 && barY + amplitude <= height) {
        ctx.fillRect(barX, barY, this.barWidth, amplitude);
      }
    }
    
    // 调试：在第一帧打印信息
    if (this._debugFrame === undefined) {
      this._debugFrame = true;
      console.log(`[AudioVisualizer] renderBars: numBars=${numBars}, maxAmplitude=${maxAmplitude.toFixed(4)}, width=${width}, height=${height}`);
    }
  }

  /**
   * 渲染圆形可视化
   */
  renderCircle(ctx, audioData, x, y, width, height) {
    if (!audioData || audioData.length === 0) return;

    // 计算频谱
    const spectrum = this.calculateSpectrum(audioData);
    if (!spectrum || spectrum.length === 0) return;

    const centerX = x;
    const centerY = y;
    const radius = Math.min(width, height) / 4;
    const maxAmplitude = Math.max(...spectrum) || 1;
    const numPoints = Math.min(this.maxBars, spectrum.length);
    const angleStep = (2 * Math.PI) / numPoints;

    ctx.beginPath();

    for (let i = 0; i < numPoints; i++) {
      const spectrumIndex = Math.floor((i / numPoints) * spectrum.length);
      const amplitude = (spectrum[spectrumIndex] / maxAmplitude) * radius * this.sensitivity;
      const angle = i * angleStep;
      const r = radius + amplitude;

      const drawX = centerX + r * Math.cos(angle);
      const drawY = centerY + r * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(drawX, drawY);
      } else {
        ctx.lineTo(drawX, drawY);
      }
    }

    ctx.closePath();
    ctx.stroke();
    
    // 可选：填充
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  async close() {
    // 清理资源
    this.audioData = null;
    this.spectrumData = null;
  }
}

