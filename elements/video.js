import { BaseElement } from "./base.js";
import { createVideoElement } from "./videoProcessor.js";
import { parseSizeValue } from "../utils/positionUtils.js";

/**
 * 视频元素
 */
export class VideoElement extends BaseElement {
  constructor(config) {
    super(config);
    this.source = config.source||config.src;
    this.track = config.track || 1;
    this.transition = config.transition;
    this.videoElement = null;
    this.canvasWidth = config.canvasWidth;
    this.canvasHeight = config.canvasHeight;
    // 视频特有属性 - 解析尺寸值，支持百分比和像素单位
    this.videoWidth = config.width ? parseSizeValue(config.width, this.canvasWidth) : this.canvasWidth;
    this.videoHeight = config.height ? parseSizeValue(config.height, this.canvasHeight) : this.canvasHeight;
    this.fit = config.fit || 'cover'; // 'cover', 'contain', 'fill', 'scale-down'
    
    // 视频截取属性
    this.cutFrom = config.cutFrom; // 开始时间（秒）
    this.cutTo = config.cutTo; // 结束时间（秒）
    this.speedFactor = config.speedFactor || 1; // 播放速度倍数
    
    // 视频循环属性
    this.loop = config.loop || false; // 是否循环播放
    
    // 音频相关属性
    this.mute = config.mute !== undefined ? config.mute : true; // 默认静音
    this.volume = config.volume !== undefined ? config.volume : 1; // 音量控制
  }

  async initialize() {
    await super.initialize();
    
    if (this.source) {
      this.videoElement = await createVideoElement({
        source: this.source,
        width: this.videoWidth,
        height: this.videoHeight,
        fps: this.fps,
        fit: this.fit,
        cutFrom: this.cutFrom,
        cutTo: this.cutTo,
        speedFactor: this.speedFactor,
        loop: this.loop,
        elementDuration: this.duration,
        containerWidth: this.canvasWidth,
        containerHeight: this.canvasHeight,
        // 音频相关参数
        mute: this.mute,
        volume: this.volume
      });
      
      // 如果有音频流，保存音频路径
      if (this.videoElement.audioStream && !this.mute) {
        this.audioPath = this.videoElement.audioStream.path;
        console.log(`[VideoElement] 视频音频路径: ${this.audioPath}`);
      }
    }
  }

  async readNextFrame(time, canvas) {
    if (!this.videoElement) {
      await this.initialize();
    }
    
    if (!this.videoElement) {
      return null;
    }

    const progress = this.getProgressAtTime(time);
    const transform = this.getTransformAtTime(time);
    
    // 获取视频帧
    const frameData = await this.videoElement.readNextFrame(progress, canvas);
    
    if (frameData) {
      // 创建完整的帧数据，包含所有变换信息
      return this.createCompleteFrameData(frameData, transform);
    }
    
    return null;
  }
  
  /**
   * 获取音频元素（如果视频不禁音）
   */
  async getAudioElements() {
    if (this.mute) {
      return [];
    }
    
    // 如果还没有初始化，先初始化
    if (!this.videoElement) {
      await this.initialize();
    }
    
    // 如果初始化后仍然没有音频路径，说明视频没有音频或提取失败
    if (!this.audioPath) {
      console.log(`[VideoElement] 视频 ${this.source} 没有音频轨道或音频提取失败`);
      return [];
    }
    
    // 创建一个临时的音频元素来代表视频的音频
    const { AudioElement } = await import('./audio.js');
    const audioElement = new AudioElement({
      type: 'audio',
      source: this.audioPath,
      startTime: this.startTime || 0,
      duration: this.duration || 0,
      volume: this.volume,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    });
    
    return [audioElement];
  }


  async close() {
    if (this.videoElement && this.videoElement.close) {
      await this.videoElement.close();
    }
  }
}
