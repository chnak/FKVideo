import { Lrc } from 'lrc-kit';
import fs from 'fs';

/**
 * LRC 字幕构建器
 * 使用 lrc-kit 库从 LRC 文件创建字幕元素
 */
export class LRCSubtitleBuilder {
  /**
   * 从 LRC 文件加载字幕
   * @param {string} lrcPath - LRC 文件路径
   * @param {Object} options - 字幕样式选项
   * @returns {Promise<Array>} 字幕元素配置数组
   */
  static loadFromFile(lrcPath, options = {}) {
    if (!fs.existsSync(lrcPath)) {
      throw new Error(`LRC 文件不存在: ${lrcPath}`);
    }

    const content = fs.readFileSync(lrcPath, 'utf-8');
    return this.loadFromContent(content, options);
  }

  /**
   * 从 LRC 内容字符串加载字幕
   * @param {string} lrcContent - LRC 文件内容
   * @param {Object} options - 字幕样式选项
   * @returns {Array} 字幕元素配置数组
   */
  static loadFromContent(lrcContent, options = {}) {
    // 使用 lrc-kit 解析 LRC 内容
    const parsedLrc = Lrc.parse(lrcContent);
    
    // 转换为字幕元素配置
    return this.toSubtitleElements(parsedLrc.lyrics, options);
  }

  /**
   * 将 lrc-kit 解析的歌词数组转换为字幕元素配置数组
   * @param {Array} lyrics - lrc-kit 解析的歌词数组，格式: [{timestamp: 秒数, content: '歌词内容'}, ...]
   * @param {Object} options - 配置选项
   * @returns {Array} 字幕元素配置数组
   */
  static toSubtitleElements(lyrics, options = {}) {
    const {
      textColor = '#ffffff',
      fontSize = 32,
      x = '50%',
      y = '80%',
      textAlign = 'center',
      minDuration = 1, // 最小显示时长
      maxDuration = 5.0  // 最大显示时长
    } = options;

    const elements = [];

    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i];
      const nextLyric = lyrics[i + 1];

      // 计算显示时长
      let duration;
      if (nextLyric) {
        // 下一句歌词开始前结束，留一点间隔
        duration = Math.max(
          minDuration,
          Math.min(
            maxDuration,
            nextLyric.timestamp - lyric.timestamp - 0.1 // 留 0.1 秒间隔
          )
        );
      } else {
        // 最后一句，使用最小时长或默认时长
        duration = Math.max(minDuration, 3);
      }
      
      elements.push({
        ...options,
        type: 'subtitle',  // 使用 subtitle 类型
        text: lyric.content,  // lrc-kit 使用 content 字段
        textColor: textColor,
        fontSize: fontSize,
        x: x,
        y: y,
        textAlign: textAlign,
        startTime: lyric.timestamp,  // lrc-kit 使用 timestamp 字段（单位：秒）
        duration: duration
      });
    }

    return elements;
  }

  /**
   * 将字幕元素添加到场景或轨道
   * @param {Object} sceneOrTrack - 场景或轨道对象
   * @param {string} lrcPath - LRC 文件路径
   * @param {Object} options - 字幕样式选项
   * @returns {Promise<Object>} 返回场景或轨道对象（支持链式调用）
   */
  static addSubtitlesFromLRC(sceneOrTrack, lrcPath, options = {}) {
    if (!fs.existsSync(lrcPath)) {
      throw new Error(`LRC 文件不存在: ${lrcPath}`);
    }

    const subtitleElements = this.loadFromFile(lrcPath, options);
    
    // 将字幕元素添加到场景或轨道
    for (const subtitleConfig of subtitleElements) {
      // 使用 addSubtitle 而不是 addText，因为 LRC 解析出来的是 subtitle 类型
      // startTime 是 LRC 中解析的时间戳，相对于场景开始时间（场景的 startTime 通常是 0）
      sceneOrTrack.addSubtitle(subtitleConfig);
    }

    return sceneOrTrack;
  }
}
