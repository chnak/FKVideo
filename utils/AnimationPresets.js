/**
 * 动画预设效果
 * 提供常用的动画效果预设
 */

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
    easing: 'bounce',
    duration: 1.2
  },

  bounceOut: {
    name: "bounceOut",
    property: 'scaleX',
    from: 1,
    to: 0,
    easing: 'bounce',
    duration: 1.2
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
    from: '200%',
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

  slideOutLeft: {
    name: "slideOutLeft",
    property: 'x',
    from: '50%',
    to: '-100%',
    easing: 'easeIn',
    duration: 1
  },

  slideOutRight: {
    name: "slideOutRight",
    property: 'x',
    from: '50%', 
    to: '200%',
    easing: 'easeIn',
    duration: 1
  },

  slideOutUp: {
    name: "slideOutUp",
    property: 'y',
    from: '50%',
    to: '-100%',
    easing: 'easeIn',
    duration: 1
  },

  slideOutDown: {
    name: "slideOutDown",
    property: 'y',
    from: '50%',
    to: '100%',
    easing: 'easeIn',
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

  // 翻转效果
  flipInX: {
    name: "flipInX",
    property: 'rotationX',
    from: -90,
    to: 0,
    easing: 'easeOut',
    duration: 1
  },

  flipInY: {
    name: "flipInY",
    property: 'rotationY',
    from: -90,
    to: 0,
    easing: 'easeOut',
    duration: 1
  },

  // 缩放组合效果
  zoomIn: {
    name: "zoomIn",
    property: 'scaleX',
    from: 0.3,
    to: 1,
    easing: 'easeOut',
    duration: 1
  },

  zoomOut: {
    name: "zoomOut",
    property: 'scaleX',
    from: 1,
    to: 0.3,
    easing: 'easeIn',
    duration: 1
  },

  // 弹性效果
  elasticIn: {
    name: "elasticIn",
    property: 'scaleX',
    from: 0,
    to: 1,
    easing: 'elastic',
    duration: 1.5
  },

  elasticOut: {
    name: "elasticOut",
    property: 'scaleX',
    from: 1,
    to: 0,
    easing: 'elastic',
    duration: 1.5
  },

  // 脉冲效果
  pulse: {
    name: "pulse",
    property: 'scaleX',
    from: 1,
    to: 1.1,
    easing: 'easeInOut',
    duration: 0.5
  },

  // 摇摆效果
  wobble: {
    name: "wobble",
    property: 'rotation',
    from: 0,
    to: 15,
    easing: 'easeInOut',
    duration: 0.3
  },

  // 闪烁效果
  flash: {
    name: "flash",
    property: 'opacity',
    from: 1,
    to: 0,
    easing: 'linear',
    duration: 0.1
  },

  // 摇摆进入
  swingIn: {
    name: "swingIn",
    property: 'rotation',
    from: -15,
    to: 0,
    easing: 'easeOut',
    duration: 1
  },

  // 摇摆退出
  swingOut: {
    name: "swingOut",
    property: 'rotation',
    from: 0,
    to: 15,
    easing: 'easeIn',
    duration: 1
  }
};

/**
 * 过渡效果预设
 * 提供常用的场景过渡效果预设
 */
export const TransitionPresets = {
  // 淡入淡出
  fade: {
    name: "fade",
    duration: 1,
    easing: 'easeInOut'
  },

  // 滑动过渡
  slideLeft: {
    name: "directional-left",
    duration: 1,
    easing: 'easeInOut'
  },

  slideRight: {
    name: "directional-right", 
    duration: 1,
    easing: 'easeInOut'
  },

  slideUp: {
    name: "directional-up",
    duration: 1,
    easing: 'easeInOut'
  },

  slideDown: {
    name: "directional-down",
    duration: 1,
    easing: 'easeInOut'
  },

  // 缩放过渡
  zoomIn: {
    name: "zoom-in",
    duration: 1,
    easing: 'easeInOut'
  },

  zoomOut: {
    name: "zoom-out",
    duration: 1,
    easing: 'easeInOut'
  },

  // 旋转过渡
  rotateLeft: {
    name: "rotate-left",
    duration: 1,
    easing: 'easeInOut'
  },

  rotateRight: {
    name: "rotate-right",
    duration: 1,
    easing: 'easeInOut'
  },

  // 翻转过渡
  flipX: {
    name: "flip-x",
    duration: 1,
    easing: 'easeInOut'
  },

  flipY: {
    name: "flip-y",
    duration: 1,
    easing: 'easeInOut'
  },

  // 擦除过渡
  wipeLeft: {
    name: "wipe-left",
    duration: 1,
    easing: 'easeInOut'
  },

  wipeRight: {
    name: "wipe-right",
    duration: 1,
    easing: 'easeInOut'
  },

  wipeUp: {
    name: "wipe-up",
    duration: 1,
    easing: 'easeInOut'
  },

  wipeDown: {
    name: "wipe-down",
    duration: 1,
    easing: 'easeInOut'
  },

  // 圆形过渡
  circleOpen: {
    name: "circle-open",
    duration: 1,
    easing: 'easeInOut'
  },

  circleClose: {
    name: "circle-close",
    duration: 1,
    easing: 'easeInOut'
  },

  // 百叶窗过渡
  blinds: {
    name: "blinds",
    duration: 1,
    easing: 'easeInOut'
  },

  // 棋盘过渡
  checkerboard: {
    name: "checkerboard",
    duration: 1,
    easing: 'easeInOut'
  },

  // 随机过渡
  random: {
    name: "random",
    duration: 1,
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
  const preset = AnimationPresets[presetName];
  if (!preset) {
    throw new Error(`动画预设 "${presetName}" 不存在`);
  }
  
  return {
    ...preset,
    ...overrides
  };
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
