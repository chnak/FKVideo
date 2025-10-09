/**
 * 音频管理器
 * 统一管理所有音频元素，简化音频配置和时间管理
 */
export class AudioManager {
  constructor() {
    this.audioElements = new Map(); // 存储所有音频元素
    this.audioStreams = []; // 存储音频流信息
  }

  /**
   * 注册音频元素
   * @param {string} id 音频元素唯一ID
   * @param {Object} config 音频配置
   */
  registerAudio(id, config) {
    const audioElement = {
      id,
      source: config.source,
      startTime: config.startTime || 0, // 在视频中的开始时间
      duration: config.duration, // 播放时长
      volume: config.volume || 1.0,
      fadeIn: config.fadeIn || 0,
      fadeOut: config.fadeOut || 0,
      loop: config.loop || false,
      // 计算结束时间
      endTime: (config.startTime || 0) + config.duration
    };

    this.audioElements.set(id, audioElement);
    console.log(`[AudioManager] 注册音频: ${id}, 时间: ${audioElement.startTime}-${audioElement.endTime}s`);
  }

  /**
   * 获取指定时间活跃的音频元素
   * @param {number} time 当前时间
   * @returns {Array} 活跃的音频元素列表
   */
  getActiveAudioAtTime(time) {
    const activeAudio = [];
    for (const [id, audio] of this.audioElements.entries()) {
      if (time >= audio.startTime && time < audio.endTime) {
        activeAudio.push(audio);
      }
    }
    return activeAudio;
  }

  /**
   * 获取所有音频流信息（用于FFmpeg）
   * @returns {Array} 音频流数组
   */
  getAllAudioStreams() {
    return Array.from(this.audioElements.values()).map(audio => ({
      path: audio.source,
      start: audio.startTime,
      duration: audio.duration,
      volume: audio.volume,
      fadeIn: audio.fadeIn,
      fadeOut: audio.fadeOut,
      loop: audio.loop
    }));
  }

  /**
   * 清理所有音频元素
   */
  clear() {
    this.audioElements.clear();
    this.audioStreams = [];
  }
}
