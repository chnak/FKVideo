import { BaseElement } from "./base.js";
import { createTitleElement } from "./titleProcessor.js";
import { parseSubtitles,calculateMixedTextCapacity } from "../utils/fabricSplitText.js";
import { AudioElement } from "./audio.js";
/**
 * 文本元素
 */
export class SubtitleElement extends BaseElement {
  constructor(config) {
    super(config);
    this.text = config.text || '';
    this.fontPath = config.fontPath;
    this.fontFamily = config.fontFamily;
    this.fontSize = config.fontSize || 72; // 添加 fontSize 参数，默认 72px
    this.textColor = config.textColor || config.color || '#ffffff';
    this.position = config.position || 'center';
    // this.zoomDirection = config.zoomDirection; // 不设置默认值，只有传入时才启用
    // this.zoomAmount = config.zoomAmount || 0.2;
    this.split = config.split || null;
    this.splitDelay = config.splitDelay || 0.1;
    this.splitDuration = config.splitDuration || 0.3;
    this.titleElement = null;
    this.canvasWidth = config.canvasWidth;
    this.canvasHeight = config.canvasHeight;
    
    // 阴影配置
    this.shadow = config.shadow || null;
    this.shadowColor = config.shadowColor || '#000000';
    this.shadowBlur = config.shadowBlur || 0;
    this.shadowOffsetX = config.shadowOffsetX || 0;
    this.shadowOffsetY = config.shadowOffsetY || 0;
    
    // 文本边框配置
    this.stroke = config.stroke || null;
    this.strokeColor = config.strokeColor || '#000000';
    this.strokeWidth = config.strokeWidth || 1;
    
    this.audio = config.audio || null;
    this.volume = config.volume || 1.0;
    this.fadeIn = config.fadeIn || 0;
    this.fadeOut = config.fadeOut || 0;

  }

  async initialize() {
    await super.initialize();
    
    if (!this.titleElements) {
      // 解析 fontSize（支持 rpx, px, vw, vh, % 等单位）
      const parsedFontSize = typeof this.fontSize === 'string' 
        ? BaseElement.parseFontSize(this.fontSize, this.canvasWidth, this.canvasHeight)
        : (this.fontSize || 72);
      
      const maxLength = calculateMixedTextCapacity(this.canvasWidth*0.85, parsedFontSize, this.text, this.fontFamily);
      const text_list=parseSubtitles(this.text,this.duration,maxLength.maxChars);
      
      this.titleElements=[]
      let startTime=0
      // 使用 for...of 循环确保异步操作顺序执行
      for (let index = 0; index < text_list.length; index++) {
        const item = text_list[index];
        const titleElement = await createTitleElement({
          text: item.text, // 使用 item.text 而不是 this.text
          fontPath: this.fontPath,
          fontFamily: this.fontFamily,
          fontSize: parsedFontSize, // 传递解析后的 fontSize 参数
          textColor: this.textColor,
          position: this.position,
          x: this.x,
          y: this.y,
          originX: this.originX,
          originY: this.originY,
          zoomDirection: this.zoomDirection,
          zoomAmount: this.zoomAmount,
          animations: this.animations, // 传递 animations 参数
          split: this.split,
          splitDelay: this.splitDelay,
          splitDuration: this.splitDuration,
          duration: item.duration,
          startTime: this.startTime + startTime, // 相对于 subtitle 元素的 startTime
          width: this.canvasWidth,
          height: this.canvasHeight,
          // 传递阴影配置
          shadow: this.shadow,
          shadowColor: this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX: this.shadowOffsetX,
          shadowOffsetY: this.shadowOffsetY,
          // 传递边框配置
          stroke: this.stroke,
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth
        });
        
        // 设置段落的时间信息（相对于 subtitle 元素的 startTime）
        const paragraphStartTime = this.startTime + startTime;
        const paragraphDuration = item.duration;
        const paragraphEndTime = paragraphStartTime + paragraphDuration;
        
        titleElement.startTime = paragraphStartTime;
        titleElement.duration = paragraphDuration;
        titleElement.endTime = paragraphEndTime;
        this.titleElements.push(titleElement);
        
        startTime += item.duration;
      }
      this.audioElements=[]
      if (this.audio) {
        // console.log(`[Subtitle] 创建全局音频元素: ${audio}`);
        const audioElement = new AudioElement({
          type: 'audio',
          source: this.audio,
          volume: this.volume,
          fadeIn: this.fadeIn,
          fadeOut: this.fadeOut,
          startTime: this.startTime || 0, // 使用字幕元素的 startTime
          duration: this.duration
        });
        await audioElement.initialize();
        this.audioElements.push(audioElement);
      }
    }

  }

  async readNextFrame(time, canvas) {
    // 如果时间在 delay 之前，不显示元素
    // 注意：time 可能是相对时间（从 composition 传递）或绝对时间
    // 判断方法：如果 time < this.startTime，说明是相对时间
    const absoluteTime = time < this.startTime ? (this.startTime + time) : time;
    const elementStartTime = this.startTime + this.delay;
    if (absoluteTime < elementStartTime) {
      return null;
    }
    
    if (!this.titleElements) {
      await this.initialize();
    }
    
    if (!this.titleElements || this.titleElements.length === 0) {
      return null;
    }

    // 查找当前时间对应的段落
    // titleElement.startTime 是绝对时间（包含 this.startTime）
    // 使用 absoluteTime 进行比较
    const titleElement = this.titleElements.find(item => absoluteTime >= item.startTime && absoluteTime <= item.endTime);
    if (!titleElement) {
      return null;
    }
    
    // 计算相对于该段落的进度和时间
    // titleElement.readNextFrame 期望 time 是相对于元素开始时间的
    // 但 titleElement 的 startTime 已经包含了 subtitle 的 startTime
    // 所以我们需要传递相对于 titleElement.startTime 的时间
    const relativeTime = absoluteTime - titleElement.startTime;
    const progress = Math.max(0, Math.min(relativeTime / titleElement.duration, 1));
    // 使用 absoluteTime 计算 transform，因为 getTransformAtTime 期望绝对时间
    const transform = this.getTransformAtTime(absoluteTime);
    
    // 获取标题帧，传递相对时间（相对于 titleElement.startTime）
    const frameData = await titleElement.readNextFrame(progress, canvas, relativeTime);
    
    if (frameData) {
      // 更新元素的尺寸
      if (frameData.width) this.width = frameData.width;
      if (frameData.height) this.height = frameData.height;
      
      // 创建完整的帧数据，包含所有变换信息
      // 注意：这里传递 absoluteTime 而不是 time，因为 transform 计算需要绝对时间
      return this.createCompleteFrameData(frameData, transform, absoluteTime);
    }
    
    return null;
  }

  /**
   * 获取音频元素列表（用于渲染器）
   */
  async getAudioElements() {
    // 确保 titleElements 被初始化
    if (!this.titleElements) {
      await this.initialize();
    }
    
    if (!this.titleElements || this.titleElements.length === 0) {
      return [];
    }
    
    return this.audioElements;
  }


  async close() {
    if (this.titleElements && Array.isArray(this.titleElements)) {
      for (const titleElement of this.titleElements) {
        if (titleElement && typeof titleElement.close === 'function') {
          await titleElement.close();
        }
      }
    }
  }
}
