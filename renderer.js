import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { nanoid } from "nanoid";
import fsExtra from "fs-extra";
import os from "os";

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
      
      // 检查是否启用并行渲染
      const parallelConfig = this.config.parallel;
      if (parallelConfig && parallelConfig.enabled) {
        return await this.renderParallel(timeline, parallelConfig);
      }
      
      // 原有的串行渲染逻辑
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
      
      // 创建可重用的 canvas，避免每帧都创建新的
      const { createFabricCanvas } = await import('./canvas/fabric.js');
      const reusableCanvas = createFabricCanvas({
        width: timeline.canvasWidth,
        height: timeline.canvasHeight
      });
      
      // 逐帧渲染
      for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
        const currentTime = frameIndex / timeline.fps;
        
        if (this.config.verbose) {
          console.log(`渲染帧 ${frameIndex + 1}/${totalFrames} (${currentTime.toFixed(2)}s)`);
        }
        
        // 每帧渲染前清理 canvas，避免对象累积
        reusableCanvas.clear();
        
        // 获取合成帧，传入可重用的 canvas
        const frameData = await timeline.getCompositeFrameAtTime(currentTime, reusableCanvas);
        
        if (frameData && frameData.length === frameSize) {
          // 写入 FFmpeg（等待写入完成，确保顺序）
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
      
      // 渲染完成后清理 canvas
      if (reusableCanvas && reusableCanvas.dispose) {
        reusableCanvas.dispose();
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
      const args = [];
      
      // 添加输入文件
      args.push('-i', stream.path);
      
      // 如果有延迟，使用 adelay 滤镜
      if (stream.start > 0) {
        const delayMs = Math.round(stream.start * 1000); // 转换为毫秒
        args.push('-af', `adelay=${delayMs}:all=1`);
        // console.log(`[Renderer] 添加音频延迟: ${stream.start}s (${delayMs}ms)`);
      }
      
      // 添加输出参数
      args.push(
        '-c:a', 'flac',
        '-y', mixedAudioPath
      );
      
      // console.log(`[Renderer] 单音频处理命令:`, args);
      await ffmpeg(args);
      // console.log(`[Renderer] 单音频处理完成`);
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
      
      // 混合所有音频流 - 参考 FFCreator 使用 normalize=0 避免音量被等分
      const mixInputs = audioStreams.map((_, i) => `[a${i}]`).join('');
      const mixFilter = `${mixInputs}amix=inputs=${audioStreams.length}:duration=longest:dropout_transition=0:normalize=0[aout]`;
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

    // 优化编码参数以提高速度
    const preset = this.config.fast ? 'ultrafast' : (this.config.preset || 'medium');
    const crf = this.config.crf !== undefined ? this.config.crf : (this.config.fast ? 28 : 23);
    
    args.push(
      '-c:v', 'libx264',
      '-preset', preset,
      '-crf', crf.toString(),
      '-pix_fmt', 'yuv420p',  // 使用更兼容的颜色格式
      '-movflags', 'faststart',
      '-r', outputFps.toString(), // 输出帧率 = 输入帧率 × 倍速
      '-threads', '0' // 使用所有可用 CPU 核心
    );

    // 如果有音频，添加音频编码和倍速处理
    if (this.mixedAudioPath) {
      if (this.playbackSpeed !== 1.0) {
        // 使用atempo滤镜调整音频速度
        args.push('-filter:a', `atempo=${this.playbackSpeed}`);
      }
      // 使用更高质量的音频编码参数
      args.push('-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2');
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
   * 优化：使用流式写入，处理缓冲区满的情况
   */
  async writeFrameToFfmpeg(frameData) {
    return new Promise((resolve, reject) => {
      if (!this.ffmpegProcess || !this.ffmpegProcess.stdin) {
        reject(new Error('FFmpeg 进程未启动'));
        return;
      }

      // 直接写入，如果返回 false 说明缓冲区已满
      const written = this.ffmpegProcess.stdin.write(frameData, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
      
      // 如果 write 返回 false，说明缓冲区已满，等待 drain 事件
      if (!written) {
        this.ffmpegProcess.stdin.once('drain', () => {
          resolve();
        });
      }
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
   * 并行渲染视频（分段渲染）
   * @param {Object} timeline - 时间线对象
   * @param {Object} parallelConfig - 并行渲染配置
   * @param {number} parallelConfig.segmentDuration - 每段时长（秒），默认 10
   * @param {number} parallelConfig.maxConcurrent - 最大并发数，默认 CPU 核心数
   * @returns {Promise<string>} 输出文件路径
   */
  async renderParallel(timeline, parallelConfig) {
    const segmentDuration = parallelConfig.segmentDuration || 10; // 每段10秒
    const maxConcurrent = parallelConfig.maxConcurrent || os.cpus().length; // 默认使用所有CPU核心
    const totalDuration = timeline.duration;
    
    console.log(`🚀 启用并行渲染: 总时长 ${totalDuration.toFixed(2)}s, 每段 ${segmentDuration}s, 最大并发 ${maxConcurrent}`);
    
    // 计算分段
    const segments = [];
    for (let startTime = 0; startTime < totalDuration; startTime += segmentDuration) {
      const endTime = Math.min(startTime + segmentDuration, totalDuration);
      const duration = endTime - startTime;
      segments.push({ startTime, endTime, duration, index: segments.length });
    }
    
    console.log(`📦 共 ${segments.length} 个渲染段`);
    
    // 确保所有元素都已初始化（并行渲染前必须完成）
    // 优化：并行初始化所有元素，而不是串行
    console.log('初始化所有元素...');
    const totalElements = timeline.elements.length;
    const initPromises = timeline.elements.map(async (element, index) => {
      if (!element.isInitialized && typeof element.initialize === 'function') {
        await element.initialize();
        return index;
      }
      return null;
    });
    
    // 使用 Promise.allSettled 并行初始化，即使某些失败也继续
    const initResults = await Promise.allSettled(initPromises);
    const successCount = initResults.filter(r => r.status === 'fulfilled' && r.value !== null).length;
    console.log(`\n所有元素初始化完成 (${successCount}/${totalElements} 成功)`);
    
    // 处理音频（全局处理一次）
    console.log('处理音频...');
    const audioElements = await timeline.getAudioElements();
    let globalMixedAudioPath = null;
    if (audioElements.length > 0) {
      console.log(`发现 ${audioElements.length} 个音频元素，开始处理...`);
      await this.processAudio(timeline, audioElements);
      globalMixedAudioPath = this.mixedAudioPath;
      console.log('音频处理完成');
    } else {
      console.log('没有音频元素');
    }
    
    // 并行渲染各个段
    const segmentFiles = [];
    const segmentDir = join(this.tmpDir, 'segments');
    await fsExtra.ensureDir(segmentDir);
    
    // 使用更可靠的并发控制机制
    const executing = [];
    let completedCount = 0;
    
    // 创建一个信号量来控制并发
    const semaphore = {
      count: maxConcurrent,
      queue: [],
      async acquire() {
        return new Promise((resolve) => {
          if (this.count > 0) {
            this.count--;
            resolve();
          } else {
            this.queue.push(resolve);
          }
        });
      },
      release() {
        this.count++;
        if (this.queue.length > 0) {
          const next = this.queue.shift();
          this.count--;
          next();
        }
      }
    };
    
    // 为每个段创建渲染任务
    const renderTasks = segments.map(async (segment) => {
      // 获取信号量
      await semaphore.acquire();
      
      const startTime = Date.now();
      try {
        const segmentFile = join(segmentDir, `segment-${segment.index}.mp4`);
        
        console.log(`\n[段 ${segment.index}] 开始渲染: ${segment.startTime.toFixed(2)}s - ${segment.endTime.toFixed(2)}s (${segment.duration.toFixed(2)}s)`);
        
        // 渲染段（无超时限制）
        await this.renderSegment(timeline, segment, segmentFile, globalMixedAudioPath);
        
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        
        // 添加到完成列表（使用互斥锁保护）
        segmentFiles.push({ file: segmentFile, index: segment.index });
        completedCount++;
        
        const progress = Math.floor((completedCount / segments.length) * 100);
        console.log(`\n[段 ${segment.index}] ✅ 渲染完成 (耗时 ${elapsed}s)`);
        process.stdout.write(`\r总体进度: ${progress}% (${completedCount}/${segments.length} 段完成)`);
        
      } catch (error) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.error(`\n❌ [段 ${segment.index}] 渲染失败 (耗时 ${elapsed}s):`, error.message || error);
        throw error;
      } finally {
        // 释放信号量
        semaphore.release();
      }
    });
    
    // 等待所有段渲染完成
    console.log(`\n开始并行渲染 ${segments.length} 个段，最大并发数: ${maxConcurrent}`);
    
    // 启动进度监控（每2秒更新一次总体进度）
    const progressInterval = setInterval(() => {
      const progress = Math.floor((completedCount / segments.length) * 100);
      const runningCount = segments.length - completedCount;
      process.stdout.write(`\r总体进度: ${progress}% (${completedCount}/${segments.length} 段完成, ${runningCount} 段进行中)`);
    }, 2000);
    
    try {
      await Promise.all(renderTasks);
      clearInterval(progressInterval);
      console.log('\n✅ 所有段渲染完成，开始合并...');
    } catch (error) {
      clearInterval(progressInterval);
      console.error('\n❌ 并行渲染过程中出错:', error);
      throw error;
    }
    
    // 合并所有段
    await this.concatVideos(segmentFiles, this.config.outPath);
    
    // 清理临时文件
    await fsExtra.remove(segmentDir);
    
    console.log(`\n✨ 并行渲染完成: ${this.config.outPath}`);
    
    // 清理临时目录
    await this.close();
    
    return this.config.outPath;
  }
  
  /**
   * 渲染单个视频段
   * @param {Object} timeline - 时间线对象
   * @param {Object} segment - 段信息 { startTime, endTime, duration, index }
   * @param {string} outputPath - 输出文件路径
   * @param {string} audioPath - 音频文件路径（可选）
   * @returns {Promise<void>}
   */
  async renderSegment(timeline, segment, outputPath, audioPath) {
    const { startTime, endTime, duration, index } = segment;
    const totalFrames = Math.ceil(duration * timeline.fps);
    const frameSize = timeline.canvasWidth * timeline.canvasHeight * 4; // RGBA
    const outputFps = timeline.fps * this.playbackSpeed;
    
    let segmentFfmpegProcess = null;
    let reusableCanvas = null;
    
    try {
      // 创建段专用的 FFmpeg 进程
      segmentFfmpegProcess = this.createSegmentFfmpegProcess(outputPath, audioPath, startTime, duration, outputFps);
      
      // 每个段使用独立的 canvas，避免并发冲突
      // 注意：在优化后的帧生成逻辑中，每个帧使用临时 canvas，这里不再需要 reusableCanvas
      const { createFabricCanvas } = await import('./canvas/fabric.js');
      
      // 渲染该段的所有帧
      // 简化：回到串行渲染，但保持代码清晰
      // 并行优化在段级别已经足够，帧级别的并行可能引入复杂性和死锁风险
      const reusableCanvas = createFabricCanvas({
        width: timeline.canvasWidth,
        height: timeline.canvasHeight
      });
      
      try {
        // 统计段0和后续段的元素数量差异（仅第一帧）
        if (index === 0 || index === 1) {
          const sampleTime = startTime;
          const activeElements = timeline.getActiveElementsAtTime(sampleTime);
          console.log(`\n[段 ${index}] 时间 ${sampleTime.toFixed(2)}s 活跃元素数: ${activeElements.length}`);
          if (this.config.verbose && activeElements.length > 0) {
            activeElements.forEach((el, i) => {
              console.log(`  - 元素 ${i}: ${el.type}, startTime=${el.startTime?.toFixed(2)}, endTime=${el.endTime?.toFixed(2)}`);
            });
          }
        }
        
        for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
          const relativeTime = frameIndex / timeline.fps; // 相对于段开始的时间
          const absoluteTime = startTime + relativeTime; // 绝对时间
          
          // 每10帧或每1秒显示一次进度
          if (frameIndex % 10 === 0 || frameIndex === totalFrames - 1) {
            const frameProgress = Math.floor((frameIndex / totalFrames) * 100);
            process.stdout.write(`\r[段 ${index}] 帧进度: ${frameProgress}% (${frameIndex}/${totalFrames} 帧, 时间: ${absoluteTime.toFixed(2)}s)`);
          }
          
          // 清理 canvas
          reusableCanvas.clear();
          
          // 获取合成帧（无超时限制）
          const frameData = await timeline.getCompositeFrameAtTime(absoluteTime, reusableCanvas);
          
          if (frameData && frameData.length === frameSize) {
            // 写入 FFmpeg（无超时限制）
            await this.writeFrameToSegmentFfmpeg(segmentFfmpegProcess, frameData);
          } else {
            if (this.config.verbose) {
              console.warn(`[段 ${index}] 帧数据无效: 帧${frameIndex}, 大小: ${frameData ? frameData.length : 0}, 期望: ${frameSize}`);
            }
          }
        }
      } finally {
        // 清理 canvas
        if (reusableCanvas && reusableCanvas.dispose) {
          reusableCanvas.dispose();
        }
      }
      
      // 结束 FFmpeg 进程
      await this.finishSegmentFfmpegProcess(segmentFfmpegProcess);
      segmentFfmpegProcess = null;
      
    } catch (error) {
      console.error(`[段 ${index}] 渲染出错:`, error);
      // 确保清理资源
      if (segmentFfmpegProcess) {
        try {
          segmentFfmpegProcess.kill('SIGKILL');
        } catch (e) {
          // 忽略清理错误
        }
      }
      throw error;
    } finally {
      // 清理资源
      if (reusableCanvas && reusableCanvas.dispose) {
        try {
          reusableCanvas.dispose();
        } catch (e) {
          // 忽略清理错误
        }
      }
    }
  }
  
  /**
   * 创建段专用的 FFmpeg 进程
   */
  createSegmentFfmpegProcess(outputPath, audioPath, startTime, duration, outputFps) {
    const args = [
      '-f', 'rawvideo',
      '-vcodec', 'rawvideo',
      '-pix_fmt', 'rgba',
      '-s', `${this.config.width}x${this.config.height}`,
      '-r', this.config.fps.toString(),
      '-i', '-'
    ];
    
    // 如果有音频，添加音频输入并裁剪
    if (audioPath) {
      args.push('-i', audioPath);
      // 使用 atrim 和 asetpts 裁剪音频到对应时间段
      args.push('-filter_complex', `[1:a]atrim=start=${startTime}:duration=${duration},asetpts=PTS-STARTPTS[a]`);
      args.push('-map', '0:v'); // 映射视频流
      args.push('-map', '[a]'); // 映射音频流
    }
    
    // 编码参数
    const preset = this.config.fast ? 'ultrafast' : (this.config.preset || 'medium');
    const crf = this.config.crf !== undefined ? this.config.crf : (this.config.fast ? 28 : 23);
    
    args.push(
      '-c:v', 'libx264',
      '-preset', preset,
      '-crf', crf.toString(),
      '-pix_fmt', 'yuv420p',
      '-movflags', 'faststart',
      '-r', outputFps.toString(),
      '-threads', '0'
    );
    
    // 音频编码
    if (audioPath) {
      if (this.playbackSpeed !== 1.0) {
        args.push('-filter:a', `atempo=${this.playbackSpeed}`);
      }
      args.push('-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2');
    }
    
    args.push('-y', outputPath);
    
    const process = spawn('ffmpeg', args, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    process.stderr.on('data', (data) => {
      if (this.config.verbose) {
        console.log(`[段 ${startTime.toFixed(2)}s] FFmpeg:`, data.toString());
      }
    });
    
    process.on('error', (error) => {
      console.error(`[段 ${startTime.toFixed(2)}s] FFmpeg 错误:`, error);
    });
    
    return process;
  }
  
  /**
   * 写入帧数据到段 FFmpeg 进程
   */
  async writeFrameToSegmentFfmpeg(process, frameData) {
    return new Promise((resolve, reject) => {
      if (!process || !process.stdin) {
        reject(new Error('FFmpeg 进程未启动'));
        return;
      }
      
      const written = process.stdin.write(frameData, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
      
      if (!written) {
        process.stdin.once('drain', () => {
          resolve();
        });
      }
    });
  }
  
  /**
   * 完成段 FFmpeg 进程
   */
  async finishSegmentFfmpegProcess(process) {
    return new Promise((resolve, reject) => {
      if (!process) {
        resolve();
        return;
      }
      
      let resolved = false;
      
      const cleanup = () => {
        if (!resolved) {
          resolved = true;
        }
      };
      
      process.stdin.end();
      
      process.on('close', (code) => {
        cleanup();
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg 进程退出，代码: ${code}`));
        }
      });
      
      process.on('error', (error) => {
        cleanup();
        reject(error);
      });
    });
  }
  
  /**
   * 合并多个视频段
   * @param {Array} segmentFiles - 段文件数组 [{ file, index }, ...]
   * @param {string} outputPath - 输出文件路径
   * @returns {Promise<void>}
   */
  async concatVideos(segmentFiles, outputPath) {
    // 按索引排序
    segmentFiles.sort((a, b) => a.index - b.index);
    
    // 创建 concat 文件列表
    const concatFilePath = join(this.tmpDir, 'concat-list.txt');
    
    // 使用 path.resolve 确保路径是绝对路径，然后转换为 FFmpeg 需要的格式
    const { resolve, isAbsolute } = await import('path');
    const concatContent = segmentFiles.map(seg => {
      // 将路径转换为绝对路径（如果还不是绝对路径）
      let absolutePath;
      if (isAbsolute(seg.file)) {
        // 已经是绝对路径
        absolutePath = seg.file;
      } else {
        // 相对路径，转换为绝对路径
        absolutePath = resolve(seg.file);
      }
      // 转换为 FFmpeg 需要的格式（使用正斜杠，并转义特殊字符）
      const ffmpegPath = absolutePath.replace(/\\/g, '/').replace(/'/g, "\\'");
      return `file '${ffmpegPath}'`;
    }).join('\n');
    
    // 调试：输出 concat 文件内容（仅在 verbose 模式下）
    if (this.config.verbose) {
      console.log('\n[合并] concat-list.txt 内容:');
      console.log(concatContent);
    }
    
    await fsExtra.writeFile(concatFilePath, concatContent, 'utf-8');
    
    // 验证文件是否存在
    for (const seg of segmentFiles) {
      if (!await fsExtra.pathExists(seg.file)) {
        throw new Error(`段文件不存在: ${seg.file}`);
      }
    }
    
    // 使用 FFmpeg concat demuxer 合并视频
    const { ffmpeg } = await import('./utils/ffmpegUtils.js');
    const args = [
      '-f', 'concat',
      '-safe', '0',
      '-i', concatFilePath,
      '-c', 'copy', // 直接复制流，不重新编码（更快）
      '-y', outputPath
    ];
    
    await ffmpeg(args);
    
    // 清理 concat 文件
    await fsExtra.remove(concatFilePath);
  }

  /**
   * 关闭渲染器
   */
  async close() {
    if (this.ffmpegProcess) {
      try {
        this.ffmpegProcess.kill();
        this.ffmpegProcess = null;
      } catch (e) {
        // 忽略清理错误
      }
    }
    
    // 清理临时目录（延迟清理，避免文件锁定问题）
    if (this.tmpDir && await fsExtra.pathExists(this.tmpDir)) {
      try {
        // 等待一小段时间，确保所有文件句柄都已关闭
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 尝试多次删除，处理 Windows 文件锁定问题
        let retries = 3;
        while (retries > 0) {
          try {
            await fsExtra.remove(this.tmpDir);
            console.log(`✓ 临时目录已清理: ${this.tmpDir}`);
            break;
          } catch (error) {
            retries--;
            if (retries > 0) {
              // 等待更长时间后重试
              await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
              // 在 Windows 上，如果文件被锁定，只警告不抛出错误
              if (process.platform === 'win32' && (error.code === 'EBUSY' || error.code === 'ENOENT')) {
                console.warn(`⚠️ 临时目录清理失败（文件可能被锁定）: ${this.tmpDir}`);
              } else {
                console.warn(`⚠️ 清理临时目录失败: ${error.message}`);
              }
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ 清理临时目录时出错: ${error.message}`);
      }
    }
  }
}
