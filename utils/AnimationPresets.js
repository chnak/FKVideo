/**
 * 动画预设效果
 * 提供常用的动画效果预设
 * 包含基础预设和 AnimationManager 预设
 */

import { 
  AnimationManagerPresets, 
  getAnimationManagerPreset, 
  getAnimationManagerPresetNames,
  isMultiPropertyAnimation as isManagerMultiProperty
} from './AnimationManagerPresets.js';

export const AnimationPresets = {
  // 淡入淡出效果
  fadeIn: {
    name: "fadeIn",
    property: 'opacity',
    from: 0,
    to: 1,
    easing: 'easeIn',
    duration: 1
  },
  
  fadeOut: {
    name: "fadeOut", 
    property: 'opacity',
    from: 1,
    to: 0,
    easing: 'easeOut',
    duration: 1
  },

  // 缩放效果
  scaleIn: {
    name: "scaleIn",
    property: 'scaleX',
    from: 0,
    to: 1,
    easing: 'easeOut',
    duration: 1
  },

  scaleOut: {
    name: "scaleOut",
    property: 'scaleX', 
    from: 1,
    to: 0,
    easing: 'easeIn',
    duration: 1
  },

  // 弹跳效果
  bounceIn: {
    name: "bounceIn",
    property: 'scaleX',
    from: 0,
    to: 1,
    easing: 'easeInBounce',
    duration: 1
  },

  bounceOut: {
    name: "bounceOut",
    property: 'scaleX',
    from: 1,
    to: 0,
    easing: 'easeOutBounce',
    duration: 1
  },

  // 滑动效果
  slideInLeft: {
    name: "slideInLeft",
    property: 'x',
    from: '-100%',
    to: '50%',
    easing: 'easeOut',
    duration: 1
  },

  slideInRight: {
    name: "slideInRight",
    property: 'x',
    from: '100%',
    to: '50%',
    easing: 'easeOut',
    duration: 1
  },

  slideInUp: {
    name: "slideInUp",
    property: 'y',
    from: '100%',
    to: '50%',
    easing: 'easeOut',
    duration: 1
  },

  slideInDown: {
    name: "slideInDown",
    property: 'y',
    from: '-100%',
    to: '50%',
    easing: 'easeOut',
    duration: 1
  },

  // 旋转效果
  rotateIn: {
    name: "rotateIn",
    property: 'rotation',
    from: -180,
    to: 0,
    easing: 'easeOut',
    duration: 1
  },

  rotateOut: {
    name: "rotateOut",
    property: 'rotation',
    from: 0,
    to: 180,
    easing: 'easeIn',
    duration: 1
  },

  // 特殊效果
  pulse: {
    name: "pulse",
    property: 'scaleX',
    from: 1,
    to: 1.2,
    easing: 'easeInOut',
    duration: 0.5
  },

  wobble: {
    name: "wobble",
    property: 'rotation',
    from: -5,
    to: 5,
    easing: 'easeInOut',
    duration: 0.5
  },

  // 弹性效果
  elasticIn: {
    name: "elasticIn",
    property: 'scaleX',
    from: 0,
    to: 1,
    easing: 'elastic',
    duration: 1
  },

  elasticOut: {
    name: "elasticOut",
    property: 'scaleX',
    from: 1,
    to: 0,
    easing: 'elastic',
    duration: 1
  }
};

export const TransitionPresets = {
  // 淡入淡出过渡
  fade: {
    name: 'fade',
    easing: 'easeInOut'
  },

  // 滑动过渡
  slideLeft: {
    name: 'directional-left',
    easing: 'easeInOut'
  },

  slideRight: {
    name: 'directional-right',
    easing: 'easeInOut'
  },

  slideUp: {
    name: 'directional-up',
    easing: 'easeInOut'
  },

  slideDown: {
    name: 'directional-down',
    easing: 'easeInOut'
  },

  // 缩放过渡
  zoomIn: {
    name: 'zoom-in',
    easing: 'easeInOut'
  },

  zoomOut: {
    name: 'zoom-out',
    easing: 'easeInOut'
  },

  // 旋转过渡
  rotate: {
    name: 'rotate',
    easing: 'easeInOut'
  },

  // 翻转过渡
  flip: {
    name: 'flip',
    easing: 'easeInOut'
  },

  // 溶解过渡
  dissolve: {
    name: 'dissolve',
    easing: 'easeInOut'
  },

  // 滑动门过渡
  slideDoor: {
    name: 'slide-door',
    easing: 'easeInOut'
  },

  // 百叶窗过渡
  blinds: {
    name: 'blinds',
    easing: 'easeInOut'
  },

  // 棋盘过渡
  checkerboard: {
    name: 'checkerboard',
    easing: 'easeInOut'
  },

  // 圆形过渡
  circle: {
    name: 'circle',
    easing: 'easeInOut'
  },

  // 星形过渡
  star: {
    name: 'star',
    easing: 'easeInOut'
  },

  // 心形过渡
  heart: {
    name: 'heart',
    easing: 'easeInOut'
  },

  // 钻石过渡
  diamond: {
    name: 'diamond',
    easing: 'easeInOut'
  },

  // 三角形过渡
  triangle: {
    name: 'triangle',
    easing: 'easeInOut'
  },

  // 六边形过渡
  hexagon: {
    name: 'hexagon',
    easing: 'easeInOut'
  },

  // 八边形过渡
  octagon: {
    name: 'octagon',
    easing: 'easeInOut'
  },

  // 十字过渡
  cross: {
    name: 'cross',
    easing: 'easeInOut'
  },

  // 箭头过渡
  arrow: {
    name: 'arrow',
    easing: 'easeInOut'
  },

  // 波浪过渡
  wave: {
    name: 'wave',
    easing: 'easeInOut'
  },

  // 螺旋过渡
  spiral: {
    name: 'spiral',
    easing: 'easeInOut'
  },

  // 爆炸过渡
  explode: {
    name: 'explode',
    easing: 'easeInOut'
  },

  // 收缩过渡
  implode: {
    name: 'implode',
    easing: 'easeInOut'
  },

  // 像素过渡
  pixelate: {
    name: 'pixelate',
    easing: 'easeInOut'
  },

  // 马赛克过渡
  mosaic: {
    name: 'mosaic',
    easing: 'easeInOut'
  },

  // 水波纹过渡
  ripple: {
    name: 'ripple',
    easing: 'easeInOut'
  },

  // 漩涡过渡
  whirl: {
    name: 'whirl',
    easing: 'easeInOut'
  },

  // 风车过渡
  windmill: {
    name: 'windmill',
    easing: 'easeInOut'
  },

  // 扇形过渡
  fan: {
    name: 'fan',
    easing: 'easeInOut'
  },

  // 窗帘过渡
  curtain: {
    name: 'curtain',
    easing: 'easeInOut'
  },

  // 卷帘过渡
  roller: {
    name: 'roller',
    easing: 'easeInOut'
  },

  // 百叶窗过渡
  venetian: {
    name: 'venetian',
    easing: 'easeInOut'
  },

  // 随机过渡
  random: {
    name: 'random',
    easing: 'easeInOut'
  },

  // 自定义过渡
  custom: {
    name: 'custom',
    easing: 'easeInOut'
  }
};

/**
 * 获取动画预设
 * @param {string} presetName 预设名称
 * @param {object} overrides 覆盖参数
 * @returns {object} 动画配置
 */
export function getAnimationPreset(presetName, overrides = {}) {
  // 首先尝试基础预设
  if (AnimationPresets[presetName]) {
    const preset = AnimationPresets[presetName];
    
    // 如果是数组（多属性动画），需要处理每个属性
    if (Array.isArray(preset)) {
      return preset.map(prop => ({ ...prop, ...overrides }));
    }
    
    // 单属性动画
    return { ...preset, ...overrides };
  }
  
  // 如果基础预设中没有，尝试 AnimationManager 预设
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
  
  return {
    ...preset,
    ...overrides
  };
}

/**
 * 获取所有动画预设名称
 * @returns {string[]} 预设名称列表
 */
export function getAnimationPresetNames() {
  return Object.keys(AnimationPresets);
}

/**
 * 获取所有过渡预设名称
 * @returns {string[]} 预设名称列表
 */
export function getTransitionPresetNames() {
  return Object.keys(TransitionPresets);
}

// ========== 合并 AnimationManager 预设 ==========

// 将 AnimationManager 预设合并到基础预设中
Object.assign(AnimationPresets, AnimationManagerPresets);

/**
 * 获取所有动画预设名称（包含基础预设和 AnimationManager 预设）
 * @returns {string[]} 预设名称列表
 */
export function getAllAnimationPresetNames() {
  const baseNames = Object.keys(AnimationPresets);
  const managerNames = getAnimationManagerPresetNames();
  
  // 合并并去重
  const allNames = [...new Set([...baseNames, ...managerNames])];
  return allNames.sort();
}

/**
 * 检查是否为多属性动画
 * @param {string} presetName 预设名称
 * @returns {boolean} 是否为多属性动画
 */
export function isMultiPropertyAnimation(presetName) {
  // 检查基础预设
  const basePreset = AnimationPresets[presetName];
  if (basePreset) {
    return Array.isArray(basePreset);
  }
  
  // 检查 AnimationManager 预设
  return isManagerMultiProperty(presetName);
}