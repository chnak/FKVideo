import fs from 'fs';

/**
 * LRC 文件解析器
 * 支持标准 LRC 格式：[mm:ss.xx]歌词内容
 */
export class LRCParser {
  /**
   * 解析 LRC 文件
   * @param {string} lrcPath - LRC 文件路径
   * @returns {Promise<Array>} 解析后的歌词数组，格式: [{time: 秒数, text: '歌词内容'}, ...]
   */
  static async parseFile(lrcPath) {
    if (!fs.existsSync(lrcPath)) {
      throw new Error(`LRC 文件不存在: ${lrcPath}`);
    }

    const content = fs.readFileSync(lrcPath, 'utf-8');
    return this.parse(content);
  }

  /**
   * 解析 LRC 内容字符串
   * @param {string} content - LRC 文件内容
   * @returns {Array} 解析后的歌词数组
   */
  static parse(content) {
    const lines = content.split(/\r?\n/);
    const lyrics = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // 解析时间戳和歌词
      // 格式: [mm:ss.xx]歌词内容 或 [mm:ss:xx]歌词内容
      const timeRegex = /\[(\d{2}):(\d{2})[\.:](\d{2})\]/g;
      let match;
      let lastIndex = 0;

      while ((match = timeRegex.exec(trimmed)) !== null) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const centiseconds = parseInt(match[3], 10);
        
        // 转换为秒数
        const time = minutes * 60 + seconds + centiseconds / 100;
        
        lastIndex = match.index + match[0].length;
      }

      // 提取歌词文本（最后一个时间戳之后的内容）
      if (lastIndex > 0) {
        const text = trimmed.substring(lastIndex).trim();
        if (text) {
          // 获取所有时间戳
          const timeRegex2 = /\[(\d{2}):(\d{2})[\.:](\d{2})\]/g;
          let timeMatch;
          while ((timeMatch = timeRegex2.exec(trimmed)) !== null) {
            const minutes = parseInt(timeMatch[1], 10);
            const seconds = parseInt(timeMatch[2], 10);
            const centiseconds = parseInt(timeMatch[3], 10);
            const time = minutes * 60 + seconds + centiseconds / 100;
            
            lyrics.push({
              time: time,
              text: text
            });
          }
        }
      }
    }

    // 按时间排序
    lyrics.sort((a, b) => a.time - b.time);

    return lyrics;
  }

  /**
   * 将 LRC 歌词转换为字幕元素配置数组
   * @param {Array} lyrics - 解析后的歌词数组
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
      fadeIn = 0.3,
      fadeOut = 0.3,
      minDuration = 0.5, // 最小显示时长
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
            nextLyric.time - lyric.time - 0.1 // 留 0.1 秒间隔
          )
        );
      } else {
        // 最后一句，使用最小时长或默认时长
        duration = Math.max(minDuration, 1);
      }

      elements.push({
        ...options,
        type: 'subtitle',  // 使用 subtitle 类型，而不是 text
        text: lyric.text,
        textColor: textColor,
        fontSize: fontSize,
        x: x,
        y: y,
        textAlign: textAlign,
        startTime: lyric.time,  // LRC 中的时间戳，相对于场景开始时间
        duration: duration,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
      });
    }

    return elements;
  }
}

