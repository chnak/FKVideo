import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { nanoid } from "nanoid";
import fsExtra from "fs-extra";

/**
 * 视频渲染器 - 负责将时间线渲染为视频文件
 */
export class VideoRenderer {
  constructor(config) {
    this.config = config;
    this.tmpDir = config.tmpDir||join(dirname(config.outPath), `video-maker-tmp-${nanoid()}`);
    this.ffmpegProcess = null;
    this.mixedAudioPath = null; // 用于存储混合后的音频文件路径
    this.playbackSpeed = config.playbackSpeed || 1.0; // 倍速播放，默认1.0倍速
    config.tmpDir=this.tmpDir;
  }

  /**
   * 渲染视频
   */
  async render(timeline) {
    try {
      await fsExtra.ensureDir(this.tmpDir);
      
      const totalFrames = Math.ceil(timeline.duration * timeline.fps);
      const frameSize = timeline.canvasWidth * timeline.canvasHeight * 4; // RGBA
      const outputFps = timeline.fps * this.playbackSpeed; // 输出帧率 = 原始帧率 × 倍速
      timeline.tmpDir = this.tmpDir;
      //  console.log(`开始渲染: ${timeline.canvasWidth}x${timeline.canvasHeight} ${timeline.fps}fps → ${outputFps.toFixed(2)}fps (${this.playbackSpeed}x倍速), 总帧数: ${totalFrames}`);
      
      // 检查是否有音频元素
      const audioElements = await timeline.getAudioElements();
      // console.log(`[Renderer] 发现 ${audioElements.length} 个音频元素`);
      
      if (audioElements.length > 0) {
        // console.log(`[Renderer] 音频元素详情:`, audioElements.map(el => ({
        //   type: el.type,
        //   source: el.source,
        //   startTime: el.startTime,
        //   duration: el.duration
        // })));
        // 处理音频
        await this.processAudio(timeline, audioElements);
      } else {
        // console.log(`[Renderer] 没有发现音频元素`);
      }
      
      // 启动 FFmpeg 进程
      this.startFfmpegProcess();
      
      // 逐帧渲染
      for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
        const currentTime = frameIndex / timeline.fps;
        
        if (this.config.verbose) {
          console.log(`渲染帧 ${frameIndex + 1}/${totalFrames} (${currentTime.toFixed(2)}s)`);
        }
        
        // 获取合成帧
        const frameData = await timeline.getCompositeFrameAtTime(currentTime);
        
        if (frameData && frameData.length === frameSize) {
          // 写入 FFmpeg
          await this.writeFrameToFfmpeg(frameData);
        } else {
          console.warn(`帧数据无效: ${frameIndex}`);
        }
        
        // 进度回调
        if (!this.config.verbose && frameIndex % 10 === 0) {
          const progress = Math.floor((frameIndex / totalFrames) * 100);
          process.stdout.write(`\r渲染进度: ${progress}%`);
        }
      }
      
      // 结束 FFmpeg 进程
      await this.finishFfmpegProcess();
      
      // console.log(`\n渲染完成: ${this.config.outPath}`);
      
      // 清理临时目录
      await this.close();
      
      return this.config.outPath;
      
    } catch (error) {
      console.error('渲染失败:', error);
      // 确保在错误时也清理临时目录
      try {
        await this.close();
      } catch (closeError) {
        console.warn('清理资源时出错:', closeError.message);
      }
      throw error;
    }
  }

  /**
   * 处理音频
   */
  async processAudio(timeline, audioElements) {
    // console.log(`[Renderer] 开始处理 ${audioElements.length} 个音频元素`);
    
    // 初始化所有音频元素
    for (const audioElement of audioElements) {
      // console.log(`[Renderer] 初始化音频元素: ${audioElement.source}`);
      await audioElement.initialize();
    }
    
    // 收集音频流信息
    const audioStreams = [];
    for (const audioElement of audioElements) {
      const stream = audioElement.getAudioStream();
      if (stream) {
        audioStreams.push(stream);
        // console.log(`[Renderer] 添加音频流: ${stream.path}`);
      }
    }
    
    if (audioStreams.length > 0) {
      // 混合音频
      this.mixedAudioPath = await this.mixAudioStreams(audioStreams);
      // console.log(`[Renderer] 音频混合完成: ${this.mixedAudioPath}`);
    }
  }

  /**
   * 混合音频流
   */
  async mixAudioStreams(audioStreams) {
      // console.log(`[Renderer] 开始混合 ${audioStreams.length} 个音频流`);
      const { ffmpeg } = await import('./utils/ffmpegUtils.js');
      const { join } = await import('path');
      
      const mixedAudioPath = join(this.tmpDir, 'mixed-audio.flac');
      // console.log(`[Renderer] 混合音频输出路径: ${mixedAudioPath}`);
    
    if (audioStreams.length === 1) {
      // 只有一个音频流，直接复制
      // console.log(`[Renderer] 只有一个音频流，直接复制`);
      const stream = audioStreams[0];
      const args = [
        '-i', stream.path,
        '-c:a', 'flac',
        '-y', mixedAudioPath
      ];
      
      // 如果有延迟，添加延迟
      if (stream.start > 0) {
        args.splice(2, 0, '-itsoffset', stream.start.toString());
      }
      
      // console.log(`[Renderer] 单音频复制命令:`, args);
      await ffmpeg(args);
      // console.log(`[Renderer] 单音频复制完成`);
    } else {
      // 多个音频流，使用 filter_complex 处理延迟
      // console.log(`[Renderer] 使用 filter_complex 处理 ${audioStreams.length} 个音频流`);
      
      // 构建输入参数
      const inputArgs = [];
      const filterParts = [];
      
      for (let i = 0; i < audioStreams.length; i++) {
        const stream = audioStreams[i];
        inputArgs.push('-i', stream.path);
        
        // 为每个音频流创建延迟和音量调整
        let filter = `[${i}:a]`;
        let hasFilter = false;
        
        // 添加延迟
        if (stream.start > 0) {
          filter += `adelay=${Math.floor(stream.start * 1000)}|${Math.floor(stream.start * 1000)}`;
          hasFilter = true;
        }
        
        // 添加音量调整
        if (stream.mixVolume !== undefined && stream.mixVolume !== 1.0) {
          if (hasFilter) {
            filter += `,volume=${stream.mixVolume}`;
          } else {
            filter += `volume=${stream.mixVolume}`;
            hasFilter = true;
          }
        }
        
        // 如果没有滤镜，直接复制音频
        if (!hasFilter) {
          filter = `[${i}:a]acopy[a${i}]`;
        } else {
          filter += `[a${i}]`;
        }
        
        filterParts.push(filter);
      }
      
      // 混合所有音频流
      const mixInputs = audioStreams.map((_, i) => `[a${i}]`).join('');
      const mixFilter = `${mixInputs}amix=inputs=${audioStreams.length}:duration=longest:dropout_transition=0[aout]`;
      filterParts.push(mixFilter);
      
      const args = [
        '-nostdin',
        ...inputArgs,
        '-filter_complex', filterParts.join(';'),
        '-map', '[aout]',
        '-c:a', 'flac',
        '-y', mixedAudioPath
      ];
      
      // console.log(`[Renderer] 多音频混合命令:`, args);
      await ffmpeg(args);
      // console.log(`[Renderer] 多音频混合完成`);
    }
    
    return mixedAudioPath;
  }

  /**
   * 启动 FFmpeg 进程
   */
  startFfmpegProcess() {
    const outputFps = this.config.fps * this.playbackSpeed;
    
    const args = [
      '-f', 'rawvideo',
      '-vcodec', 'rawvideo',
      '-pix_fmt', 'rgba',
      '-s', `${this.config.width}x${this.config.height}`,
      '-r', this.config.fps.toString(), // 输入帧率保持原始帧率
      '-i', '-'
    ];

    // 如果有音频，添加音频输入
    if (this.mixedAudioPath) {
      args.push('-i', this.mixedAudioPath);
    }

    args.push(
      '-c:v', 'libx264',
      '-preset', this.config.fast ? 'ultrafast' : 'medium',
      '-crf', '23',
      '-pix_fmt', 'yuv420p',  // 使用更兼容的颜色格式
      '-movflags', 'faststart',
      '-r', outputFps.toString() // 输出帧率 = 输入帧率 × 倍速
    );

    // 如果有音频，添加音频编码和倍速处理
    if (this.mixedAudioPath) {
      if (this.playbackSpeed !== 1.0) {
        // 使用atempo滤镜调整音频速度
        args.push('-filter:a', `atempo=${this.playbackSpeed}`);
      }
      args.push('-c:a', 'aac', '-b:a', '128k');
    }

    args.push('-y', this.config.outPath);

    this.ffmpegProcess = spawn('ffmpeg', args, {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    this.ffmpegProcess.stderr.on('data', (data) => {
      if (this.config.verbose) {
        console.log('FFmpeg:', data.toString());
      }
    });

    this.ffmpegProcess.on('error', (error) => {
      console.error('FFmpeg 错误:', error);
    });
  }

  /**
   * 写入帧数据到 FFmpeg
   */
  async writeFrameToFfmpeg(frameData) {
    return new Promise((resolve, reject) => {
      if (!this.ffmpegProcess || !this.ffmpegProcess.stdin) {
        reject(new Error('FFmpeg 进程未启动'));
        return;
      }

      this.ffmpegProcess.stdin.write(frameData, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * 完成 FFmpeg 进程
   */
  async finishFfmpegProcess() {
    return new Promise((resolve, reject) => {
      if (!this.ffmpegProcess) {
        resolve();
        return;
      }

      this.ffmpegProcess.stdin.end();
      
      this.ffmpegProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg 退出码: ${code}`));
        }
      });
    });
  }

  /**
   * 关闭渲染器
   */
  async close() {
    if (this.ffmpegProcess) {
      this.ffmpegProcess.kill();
      this.ffmpegProcess = null;
    }
    
    // 清理临时目录
    if (await fsExtra.pathExists(this.tmpDir)) {
      try {
        await fsExtra.remove(this.tmpDir);
        console.log(`✓ 临时目录已清理: ${this.tmpDir}`);
      } catch (error) {
        console.warn(`⚠️ 清理临时目录失败: ${error.message}`);
      }
    }
  }
}
