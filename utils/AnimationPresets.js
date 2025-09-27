/**
 * 动画预设效果
 * 统一使用 AnimationManagerPresets 中的配置
 */

import { 
  AnimationManagerPresets, 
  getAnimationManagerPreset, 
  getAnimationManagerPresetNames,
  isMultiPropertyAnimation as isManagerMultiProperty
} from './AnimationManagerPresets.js';

// 直接导出 AnimationManagerPresets 作为 AnimationPresets
export const AnimationPresets = AnimationManagerPresets;

// ========== 过渡效果预设 ==========

export const TransitionPresets = {
  // 淡入淡出过渡
  fade: {
    name: "fade",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 滑动过渡
  slideLeft: {
    name: "slideLeft",
    duration: 0.5,
    easing: "easeInOut"
  },

  slideRight: {
    name: "slideRight", 
    duration: 0.5,
    easing: "easeInOut"
  },

  slideUp: {
    name: "slideUp",
    duration: 0.5,
    easing: "easeInOut"
  },

  slideDown: {
    name: "slideDown",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 缩放过渡
  zoomIn: {
    name: "zoomIn",
    duration: 0.5,
    easing: "easeInOut"
  },

  zoomOut: {
    name: "zoomOut",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 旋转过渡
  rotate: {
    name: "rotate",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 翻转过渡
  flip: {
    name: "flip",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 溶解过渡
  dissolve: {
    name: "dissolve",
    duration: 0.5,
    easing: "easeInOut"
  },

  // 擦除过渡
  wipeLeft: {
    name: "wipeLeft",
    duration: 0.5,
    easing: "easeInOut"
  },

  wipeRight: {
    name: "wipeRight",
    duration: 0.5,
    easing: "easeInOut"
  },

  wipeUp: {
    name: "wipeUp",
    duration: 0.5,
    easing: "easeInOut"
  },

  wipeDown: {
    name: "wipeDown",
    duration: 0.5,
    easing: "easeInOut"
  }
};

/**
 * 获取动画预设
 * @param {string} presetName 预设名称
 * @param {object} overrides 覆盖参数
 * @returns {object|array} 动画配置
 */
export function getAnimationPreset(presetName, overrides = {}) {
  // 首先尝试 AnimationManagerPresets (已作为 AnimationPresets 导出)
  if (AnimationPresets[presetName]) {
    const preset = AnimationPresets[presetName];
    
    if (Array.isArray(preset)) {
      return preset.map(prop => ({ ...prop, ...overrides }));
    }
    
    return { ...preset, ...overrides };
  }
  
  // 如果 AnimationManagerPresets 中没有，尝试直接调用
  try {
    return getAnimationManagerPreset(presetName, overrides);
  } catch (error) {
    throw new Error(`动画预设 "${presetName}" 不存在`);
  }
}

/**
 * 获取过渡预设
 * @param {string} presetName 预设名称
 * @param {object} overrides 覆盖参数
 * @returns {object} 过渡配置
 */
export function getTransitionPreset(presetName, overrides = {}) {
  const preset = TransitionPresets[presetName];
  if (!preset) {
    throw new Error(`过渡预设 "${presetName}" 不存在`);
  }
  
  return { ...preset, ...overrides };
}

/**
 * 获取所有动画预设名称
 * @returns {string[]} 预设名称列表
 */
export function getAnimationPresetNames() {
  return getAnimationManagerPresetNames();
}

/**
 * 获取所有过渡预设名称
 * @returns {string[]} 预设名称列表
 */
export function getTransitionPresetNames() {
  return Object.keys(TransitionPresets);
}

/**
 * 获取所有动画预设名称（包含 AnimationManager 预设）
 * @returns {string[]} 预设名称列表
 */
export function getAllAnimationPresetNames() {
  const managerNames = getAnimationManagerPresetNames();
  return managerNames.sort();
}

/**
 * 检查是否为多属性动画
 * @param {string} presetName 预设名称
 * @returns {boolean} 是否为多属性动画
 */
export function isMultiPropertyAnimation(presetName) {
  const preset = AnimationPresets[presetName];
  if (preset) {
    return Array.isArray(preset);
  }
  return isManagerMultiProperty(presetName);
}