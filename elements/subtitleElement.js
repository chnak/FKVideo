import { BaseElement } from "./base.js";
import { AudioManager } from "./audioManager.js";
import { createTextElement } from "./subtitleProcessor.js";
import { parseSizeValue } from "../utils/positionUtils.js";

/**
 * 字幕元素 - 简化版本
 * 专注于字幕显示和音频管理
 */
export class SubtitleElement extends BaseElement {
  constructor(config) {
    super(config);
    
    // 字幕属性
    this.text = config.text || '';
    this.font = config.font;
    this.fontPath = config.fontPath;
    this.fontFamily = config.fontFamily;
    this.fillColor = config.fillColor || '#ffffff';
    this.strokeColor = config.strokeColor;
    this.strokeWidth = config.strokeWidth || 0;
    this.textAlign = config.textAlign || 'left';
    this.textBaseline = config.textBaseline || 'top';
    this.lineHeight = config.lineHeight || 1.2;
    this.backgroundColor = config.backgroundColor;
    this.position = config.position || 'bottom';
    this.padding = config.padding || 10;
    
    // 音频属性
    this.audio = config.audio;
    this.volume = config.volume || 1.0;
    this.fadeIn = config.fadeIn || 0;
    this.fadeOut = config.fadeOut || 0;
    
    // 内部组件
    this.textElement = null;
    this.audioManager = new AudioManager();
  }

  async initialize() {
    await super.initialize();
    
    // 初始化文本元素（不包含音频）
    this.textElement = await createTextElement({
      text: this.text,
      font: this.font,
      fontPath: this.fontPath,
      fontFamily: this.fontFamily,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
      lineHeight: this.lineHeight,
      maxWidth: this.maxWidth,
      duration: this.duration,
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
      position: this.position,
      padding: this.padding,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      // 不传递音频配置给文本元素
      audio: null,
      volume: 1.0,
      fadeIn: 0,
      fadeOut: 0
    });

    // 如果有音频，注册到音频管理器
    if (this.audio) {
      this.audioManager.registerAudio(`subtitle_${this.id}`, {
        source: this.audio,
        startTime: this.startTime,
        duration: this.duration,
        volume: this.volume,
        fadeIn: this.fadeIn,
        fadeOut: this.fadeOut
      });
    }
  }

  async readNextFrame(time, canvas) {
    if (!this.textElement) {
      return null;
    }

    // 检查是否在播放时间内
    if (time < this.startTime || time >= this.endTime) {
      return null;
    }

    // 计算进度
    const progress = (time - this.startTime) / this.duration;
    
    // 渲染文本
    const frameData = await this.textElement.readNextFrame(progress, canvas, time);
    
    if (frameData) {
      const transform = this.getTransformAtTime(time);
      return this.createCompleteFrameData(frameData, transform);
    }

    return null;
  }

  /**
   * 获取音频流信息
   */
  getAudioStreams() {
    return this.audioManager.getAllAudioStreams();
  }

  /**
   * 获取音频元素（兼容接口）
   */
  async getAudioElements() {
    // 返回空数组，因为音频由音频管理器统一管理
    return [];
  }

  async close() {
    if (this.textElement && this.textElement.close) {
      await this.textElement.close();
    }
    this.audioManager.clear();
  }
}
