import { Animation } from './Animation.js';
import { AnimationManagerPresets } from '../utils/AnimationManagerPresets.js';

/**
 * 关键帧动画类 - 支持多个关键帧的复杂动画
 */
export class KeyframeAnimation {
  constructor(config) {
    this.id = config.id || 'keyframe_' + Math.random().toString(36).substr(2, 9);
    this.property = config.property;
    this.keyframes = config.keyframes || []; // [{ time: 0, value: 0, easing: 'linear' }]
    this.duration = config.duration || 1;
    this.startTime = config.startTime || 0;
    this.delay = config.delay || 0;
    this.repeat = config.repeat || 1;
    this.direction = config.direction || 'normal';
    this.fillMode = config.fillMode || 'both';
    
    // 排序关键帧
    this.keyframes.sort((a, b) => a.time - b.time);
    
    this.actualStartTime = this.startTime + this.delay;
    this.endTime = this.actualStartTime + this.duration;
  }

  /**
   * 获取关键帧动画在当前时间的值
   * @param {number} time 当前时间
   * @returns {number|null} 动画值
   */
  getValueAtTime(time) {
    if (time < this.actualStartTime) {
      return this.fillMode === 'backwards' || this.fillMode === 'both' ? this.keyframes[0]?.value : null;
    }

    if (time > this.endTime) {
      return this.fillMode === 'forwards' || this.fillMode === 'both' ? this.keyframes[this.keyframes.length - 1]?.value : null;
    }

    const animTime = time - this.actualStartTime;
    return this.calculateKeyframeValue(animTime);
  }

  /**
   * 计算关键帧动画值
   * @param {number} animTime 动画时间
   * @returns {number} 动画值
   */
  calculateKeyframeValue(animTime) {
    const normalizedTime = animTime / this.duration;
    
    // 找到当前时间对应的关键帧区间
    for (let i = 0; i < this.keyframes.length - 1; i++) {
      const currentKeyframe = this.keyframes[i];
      const nextKeyframe = this.keyframes[i + 1];
      
      if (normalizedTime >= currentKeyframe.time && normalizedTime <= nextKeyframe.time) {
        // 计算在当前区间内的进度
        const segmentProgress = (normalizedTime - currentKeyframe.time) / (nextKeyframe.time - currentKeyframe.time);
        
        // 应用缓动函数
        const easing = nextKeyframe.easing || currentKeyframe.easing || 'linear';
        const easedProgress = this.ease(segmentProgress, easing);
        
        // 插值计算
        return this.lerp(currentKeyframe.value, nextKeyframe.value, easedProgress);
      }
    }
    
    // 如果时间超出范围，返回最后一个关键帧的值
    return this.keyframes[this.keyframes.length - 1]?.value || 0;
  }

  /**
   * 线性插值
   */
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * 缓动函数（复用Animation类的实现）
   */
  ease(t, type) {
    const animation = new Animation({ easing: type });
    return animation.ease(t, type);
  }
}

/**
 * 通用动画管理器 - 类似 Creatomate 的动画系统
 * 支持多种动画类型、预设动画和关键帧动画
 */
export class AnimationManager {
  constructor() {
    this.animations = new Map(); // 存储所有动画
    this.presets = new Map(); // 存储预设动画
    this.keyframes = new Map(); // 存储关键帧动画
    
    // 初始化预设动画
    this.initializePresets();
  }

  /**
   * 创建动画
   * @param {Object} config 动画配置
   * @returns {Animation} 动画实例
   */
  createAnimation(config) {
    const animation = new Animation(config);
    this.animations.set(animation.id, animation);
    return animation;
  }

  /**
   * 创建关键帧动画
   * @param {Object} config 关键帧动画配置
   * @returns {KeyframeAnimation} 关键帧动画实例
   */
  createKeyframeAnimation(config) {
    const animation = new KeyframeAnimation(config);
    this.keyframes.set(animation.id, animation);
    return animation;
  }

  /**
   * 应用预设动画
   * @param {string} presetName 预设名称
   * @param {Object} options 动画选项
   * @returns {Animation|Array<Animation>} 动画实例或动画数组（多属性动画）
   */
  applyPreset(presetName, options = {}) {
    const preset = this.presets.get(presetName);
    if (!preset) {
      throw new Error(`预设动画 "${presetName}" 不存在`);
    }

    // 检查是否为多属性动画
    if (preset.type === 'multi' && preset.properties) {
      // 返回多属性动画数组
      return preset.properties.map(prop => {
        const config = {
          ...prop,
          ...options,
          id: this.generateId()
        };
        return this.createAnimation(config);
      });
    } else {
      // 单属性动画
      const config = {
        ...preset,
        ...options,
        id: this.generateId()
      };
      return this.createAnimation(config);
    }
  }

  /**
   * 批量创建动画
   * @param {Array} animations 动画配置数组
   * @returns {Array} 动画实例数组
   */
  createAnimations(animations) {
    return animations.map(anim => this.createAnimation(anim));
  }

  /**
   * 获取动画
   * @param {string} id 动画ID
   * @returns {Animation} 动画实例
   */
  getAnimation(id) {
    return this.animations.get(id);
  }

  /**
   * 移除动画
   * @param {string} id 动画ID
   */
  removeAnimation(id) {
    this.animations.delete(id);
  }

  /**
   * 清除所有动画
   */
  clearAnimations() {
    this.animations.clear();
  }

  /**
   * 获取所有可用的预设动画
   * @returns {Array} 预设动画名称数组
   */
  getAvailablePresets() {
    return Array.from(this.presets.keys());
  }

  /**
   * 添加自定义预设动画
   * @param {string} name 预设名称
   * @param {Object|Array} config 动画配置，支持单属性或多属性
   */
  addPreset(name, config) {
    // 如果配置是数组，表示多属性动画
    if (Array.isArray(config)) {
      this.presets.set(name, {
        type: 'multi',
        properties: config
      });
    } else {
      // 单属性动画
      this.presets.set(name, config);
    }
  }

  /**
   * 初始化预设动画 - 从 AnimationManagerPresets.js 中加载配置
   */
  initializePresets() {
    // 从 AnimationManagerPresets 中加载所有预设动画
    Object.entries(AnimationManagerPresets).forEach(([presetName, presetConfig]) => {
      this.addPreset(presetName, presetConfig);
    });
  }

  /**
   * 生成唯一ID
   * @returns {string} 唯一ID
   */
  generateId() {
    return 'anim_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * 销毁动画管理器
   */
  destroy() {
    this.animations.clear();
    this.presets.clear();
    this.keyframes.clear();
  }
}


// 导出默认实例
export const animationManager = new AnimationManager();