/**
 * AnimationManager 预设动画配置
 * 从 AnimationManager.js 中提取的预设动画，供多轨道构建器使用
 */

export const AnimationManagerPresets = {
  // ========== 现代基础动画 ==========
  
  // 淡入淡出
  fadeIn: {
    property: 'opacity',
    from: 0,
    to: 1,
    duration: 0.8,
    easing: 'easeIn'
  },

  fadeOut: {
    property: 'opacity',
    from: 1,
    to: 0,
    duration: 0.8,
    easing: 'easeOut',
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  // 缩放动画
  zoomIn: {
    property: 'scaleX',
    from: 0,
    to: 1,
    duration: 0.8,
    easing: 'easeIn'
  },

  zoomOut: {
    property: 'scaleX',
    from: 1,
    to: 0,
    duration: 0.8,
    easing: 'easeIn',
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  // 旋转动画
  rotateIn: {
    property: 'rotation',
    from: -180,
    to: 0,
    duration: 0.8,
    easing: 'easeOut'
  },

  rotateOut: {
    property: 'rotation',
    from: 0,
    to: 180,
    duration: 0.8,
    easing: 'easeIn',
    delay: -0.8  // 在元素结束前0.8秒开始
  },

  // 滑动动画
  slideInLeft: {
    property: 'x',
    from: -300,
    to: 0,
    duration: 0.8,
    easing: 'easeIn',
    isOffset: true
  },

  slideInRight: {
    property: 'x',
    from: 300,
    to: 0,
    duration: 0.8,
    easing: 'easeIn',
    isOffset: true
  },

  slideInTop: {
    property: 'y',
    from: -200,
    to: 0,
    duration: 0.8,
    easing: 'easeIn',
    isOffset: true
  },

  slideInBottom: {
    property: 'y',
    from: 200,
    to: 0,
    duration: 0.8,
    easing: 'easeIn',
    isOffset: true
  },

  // 滑出动画
  slideOutLeft: {
    property: 'x',
    from: 0,
    to: -300,
    duration: 0.8,
    easing: 'easeOut',
    isOffset: true,
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  slideOutRight: {
    property: 'x',
    from: 0,
    to: 300,
    duration: 0.8,
    easing: 'easeOut',
    isOffset: true,
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  slideOutTop: {
    property: 'y',
    from: 0,
    to: -200,
    duration: 0.8,
    easing: 'easeOut',
    isOffset: true,
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  slideOutBottom: {
    property: 'y',
    from: 0,
    to: 200,
    duration: 0.8,
    easing: 'easeOut',
    isOffset: true,
    delay: -0.8  // 在元素结束前0.6秒开始
  },

  // ========== 现代特效动画 ==========

  // Material Design 风格
  materialRipple: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'opacity', from: 0.3, to: 0, duration: 0.4, easing: 'easeOut' }
  ],

  // iOS 风格弹性动画
  iosBounce: [
    { property: 'scaleX', from: 0, to: 1.1, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1.1, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleX', from: 1.1, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.3 },
    { property: 'scaleY', from: 1.1, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.3 }
  ],

  // 现代弹跳效果
  bounceIn: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.6, easing: 'easeInBounce' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.6, easing: 'easeInBounce' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' }
  ],
  // 现代弹跳效果
  bounceOut: [
    { property: 'scaleX', from: 1, to: 0, duration: 0.6, easing: 'easeOutBounce', delay: -0.6 },
    { property: 'scaleY', from: 1, to: 0, duration: 0.6, easing: 'easeOutBounce', delay: -0.6 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 }
  ],

  // 弹性效果
  elasticIn: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.8, easing: 'elastic' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.8, easing: 'elastic' },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
  ],
  elasticOut: [
    { property: 'scaleX', from: 1, to: 0, duration: 0.8, easing: 'elastic', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0, duration: 0.8, easing: 'elastic', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.4, easing: 'easeIn', delay: -0.4 }
  ],

  // 3D 翻转效果
  flip3D: [
    { property: 'rotation', from: -180, to: 0, duration: 0.8, easing: 'easeOut' },
    { property: 'scaleX', from: 0.8, to: 1, duration: 0.8, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
  ],

  // 脉冲效果
  pulse: [
    { property: 'scaleX', from: 1, to: 1.1, duration: 0.5, easing: 'easeInOut' },
    { property: 'scaleY', from: 1, to: 1.1, duration: 0.5, easing: 'easeInOut' },
    { property: 'opacity', from: 1, to: 0.7, duration: 0.5, easing: 'easeInOut' },
    { property: 'scaleX', from: 1.1, to: 1, duration: 0.5, easing: 'easeInOut', delay: 0.5 },
    { property: 'scaleY', from: 1.1, to: 1, duration: 0.5, easing: 'easeInOut', delay: 0.5 },
    { property: 'opacity', from: 0.7, to: 1, duration: 0.5, easing: 'easeInOut', delay: 0.5 }
  ],

  // 摇摆效果
  swing: [
    { property: 'rotation', from: -15, to: 15, duration: 0.6, easing: 'easeInOut' },
    { property: 'rotation', from: 15, to: -15, duration: 0.6, easing: 'easeInOut', delay: 0.6 },
    { property: 'x', from: -50, to: 50, duration: 0.6, easing: 'easeInOut', isOffset: true },
    { property: 'x', from: 50, to: -50, duration: 0.6, easing: 'easeInOut', isOffset: true, delay: 0.6 }
  ],

  // 震动效果
  shake: [
    { property: 'x', from: -10, to: 10, duration: 0.1, easing: 'linear' , isOffset: true},
    { property: 'x', from: 10, to: -10, duration: 0.1, easing: 'linear', delay: 0.1 , isOffset: true},
    { property: 'x', from: -10, to: 10, duration: 0.1, easing: 'linear', delay: 0.2 , isOffset: true},
    { property: 'x', from: 10, to: 0, duration: 0.1, easing: 'linear', delay: 0.3 , isOffset: true}
  ],

  // 波浪效果
  wave: [
    { property: 'y', from: 0, to: -10, duration: 0.5, easing: 'easeInOut' , isOffset: true},
    { property: 'y', from: -10, to: 0, duration: 0.5, easing: 'easeInOut', delay: 0.5 , isOffset: true}
  ],

  // 故障效果
  glitch: [
    { property: 'x', from: 0, to: -10, duration: 0.1, easing: 'linear' , isOffset: true},
    { property: 'x', from: -10, to: 10, duration: 0.1, easing: 'linear', delay: 0.1 , isOffset: true},
    { property: 'x', from: 10, to: 0, duration: 0.1, easing: 'linear', delay: 0.2 , isOffset: true},
    { property: 'opacity', from: 1, to: 0.8, duration: 0.1, easing: 'linear', delay: 0.1 },
    { property: 'opacity', from: 0.8, to: 1, duration: 0.1, easing: 'linear', delay: 0.2 }
  ],

  // 螺旋效果
  spiral: [
    { property: 'rotation', from: 0, to: 360, duration: 1.0, easing: 'easeInOut' },
    { property: 'scaleX', from: 0, to: 1, duration: 1.0, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1, duration: 1.0, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 爆炸效果
  explode: [
    { property: 'scaleX', from: 0, to: 1.2, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1.2, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleX', from: 1.2, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.3 },
    { property: 'scaleY', from: 1.2, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.3 },
    { property: 'rotation', from: 0, to: 360, duration: 0.5, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.3, easing: 'easeOut' }
  ],

  // 溶解效果
  dissolve: [
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeInOut' },
    { property: 'scaleX', from: 0.6, to: 1, duration: 0.5, easing: 'easeOut' },
    { property: 'scaleY', from: 0.6, to: 1, duration: 0.5, easing: 'easeOut' }
  ],

  // 弹簧效果
  spring: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.8, easing: 'spring' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.8, easing: 'spring' },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
  ],

  // 弹簧退出效果
  springOut: [
    { property: 'scaleX', from: 1, to: 0, duration: 0.8, easing: 'spring', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0, duration: 0.8, easing: 'spring', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.4, easing: 'easeIn', delay: -0.4 }
  ],

  // 爆炸退出效果
  explodeOut: [
    { property: 'scaleX', from: 1, to: 1.5, duration: 0.4, easing: 'easeIn', delay: -0.6 },
    { property: 'scaleY', from: 1, to: 1.5, duration: 0.4, easing: 'easeIn', delay: -0.6 },
    { property: 'rotation', from: 0, to: 360, duration: 0.6, easing: 'easeIn', delay: -0.6 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 }
  ],

  // 溶解退出效果
  dissolveOut: [
    { property: 'opacity', from: 1, to: 0, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleX', from: 1, to: 0.9, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0.9, duration: 0.8, easing: 'easeIn', delay: -0.8 }
  ],

  // ========== 现代多属性动画 ==========

  // 超级缩放进入
  superZoomIn: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.8, easing: 'easeIn' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.8, easing: 'easeIn' },
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeIn' }
  ],
  superZoomOut: [
    { property: 'scaleX', from: 1, to: 0, duration: 0.8, easing: 'easeOut', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0, duration: 0.8, easing: 'easeOut', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeOut', delay: -0.4 }
  ],

  // 超级滑入左侧
  superSlideInLeft: [
    { property: 'x', from: -300, to: 0, duration: 0.6, easing: 'easeOut', isOffset: true },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'rotation', from: -15, to: 0, duration: 0.6, easing: 'easeOut' }
  ],

  // 超级滑入右侧
  superSlideInRight: [
    { property: 'x', from: 300, to: 0, duration: 0.6, easing: 'easeOut', isOffset: true },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'rotation', from: 15, to: 0, duration: 0.6, easing: 'easeOut' }
  ],

  // 超级滑入顶部
  superSlideInTop: [
    { property: 'y', from: -200, to: 0, duration: 0.6, easing: 'easeOut', isOffset: true },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleX', from: 0.8, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 超级滑入底部
  superSlideInBottom: [
    { property: 'y', from: 200, to: 0, duration: 0.6, easing: 'easeOut', isOffset: true },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleX', from: 0.8, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 超级旋转进入
  superRotateIn: [
    { property: 'rotation', from: -180, to: 0, duration: 0.8, easing: 'easeOut' },
    { property: 'scaleX', from: 0.5, to: 1, duration: 0.8, easing: 'easeOut' },
    { property: 'scaleY', from: 0.5, to: 1, duration: 0.8, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 超级旋转退出
  superRotateOut: [
    { property: 'rotation', from: 0, to: 180, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleX', from: 1, to: 0.5, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0.5, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 }
  ],

  // 超级弹跳进入
  superBounceIn: [
    { property: 'scaleX', from: 0, to: 1.2, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1.2, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleX', from: 1.2, to: 0.9, duration: 0.2, easing: 'easeIn', delay: 0.4 },
    { property: 'scaleY', from: 1.2, to: 0.9, duration: 0.2, easing: 'easeIn', delay: 0.4 },
    { property: 'scaleX', from: 0.9, to: 1, duration: 0.2, easing: 'easeOut', delay: 0.6 },
    { property: 'scaleY', from: 0.9, to: 1, duration: 0.2, easing: 'easeOut', delay: 0.6 },
    { property: 'opacity', from: 0, to: 1, duration: 0.3, easing: 'easeOut' }
  ],

  // 超级弹跳退出
  superBounceOut: [
    { property: 'scaleX', from: 1, to: 1.2, duration: 0.2, easing: 'easeOut', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 1.2, duration: 0.2, easing: 'easeOut', delay: -0.8 },
    { property: 'scaleX', from: 1.2, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 },
    { property: 'scaleY', from: 1.2, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 },
    { property: 'opacity', from: 1, to: 0, duration: 0.4, easing: 'easeIn', delay: -0.4 }
  ]
};

/**
 * 获取 AnimationManager 预设动画
 * @param {string} presetName 预设名称
 * @param {object} overrides 覆盖参数
 * @returns {object|array} 动画配置
 */
export function getAnimationManagerPreset(presetName, overrides = {}) {
  const preset = AnimationManagerPresets[presetName];
  if (!preset) {
    throw new Error(`AnimationManager 预设动画 "${presetName}" 不存在`);
  }
  
  // 如果是数组（多属性动画），需要处理每个属性
  if (Array.isArray(preset)) {
    return preset.map(prop => ({ ...prop, ...overrides }));
  }
  
  // 单属性动画
  return { ...preset, ...overrides };
}

/**
 * 获取所有 AnimationManager 预设动画名称
 * @returns {string[]} 预设名称列表
 */
export function getAnimationManagerPresetNames() {
  return Object.keys(AnimationManagerPresets);
}

/**
 * 检查是否为多属性动画
 * @param {string} presetName 预设名称
 * @returns {boolean} 是否为多属性动画
 */
export function isMultiPropertyAnimation(presetName) {
  const preset = AnimationManagerPresets[presetName];
  return Array.isArray(preset);
}
