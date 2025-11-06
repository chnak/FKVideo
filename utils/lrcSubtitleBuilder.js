import { LRCParser } from './lrcParser.js';
import fs from 'fs';

/**
 * LRC 字幕构建器
 * 用于从 LRC 文件创建字幕元素
 */
export class LRCSubtitleBuilder {
  /**
   * 从 LRC 文件加载字幕
   * @param {string} lrcPath - LRC 文件路径
   * @param {Object} options - 字幕样式选项
   * @returns {Promise<Array>} 字幕元素配置数组
   */
  static async loadFromFile(lrcPath, options = {}) {
    const lyrics = await LRCParser.parseFile(lrcPath);
    return LRCParser.toSubtitleElements(lyrics, options);
  }

  /**
   * 从 LRC 内容字符串加载字幕
   * @param {string} lrcContent - LRC 文件内容
   * @param {Object} options - 字幕样式选项
   * @returns {Array} 字幕元素配置数组
   */
  static loadFromContent(lrcContent, options = {}) {
    const lyrics = LRCParser.parse(lrcContent);
    return LRCParser.toSubtitleElements(lyrics, options);
  }

  /**
   * 将字幕元素添加到场景或轨道
   * @param {Object} sceneOrTrack - 场景或轨道对象
   * @param {string} lrcPath - LRC 文件路径
   * @param {Object} options - 字幕样式选项
   * @returns {Promise<Object>} 返回场景或轨道对象（支持链式调用）
   */
  static async addSubtitlesFromLRC(sceneOrTrack, lrcPath, options = {}) {
    if (!fs.existsSync(lrcPath)) {
      throw new Error(`LRC 文件不存在: ${lrcPath}`);
    }

    const subtitleElements = await this.loadFromFile(lrcPath, options);
    
    // 获取场景或轨道的开始时间（如果存在）
    // 字幕的 startTime 是相对于场景/轨道的，所以不需要额外调整
    // LRC 中的时间戳已经是相对于场景开始的时间
    
    // 将字幕元素添加到场景或轨道
    for (const subtitleConfig of subtitleElements) {
      // 使用 addSubtitle 而不是 addText，因为 LRC 解析出来的是 subtitle 类型
      // startTime 是 LRC 中解析的时间戳，相对于场景开始时间（场景的 startTime 通常是 0）
      sceneOrTrack.addSubtitle(subtitleConfig);
    }

    return sceneOrTrack;
  }
}

