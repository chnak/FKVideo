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

  bigIn:[
    { property: 'scaleX', from: 2, to: 1, duration: 0.8, easing: 'easeIn' },
    { property: 'scaleY', from: 2, to: 1, duration: 0.8, easing: 'easeIn' },
    { property: 'opacity', from: 0, to: 1, duration: 0.8, easing: 'easeIn' }
  ],
  bigOut:[
    { property: 'scaleX', from: 1, to: 2, duration: 0.8, easing: 'easeOut', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 2, duration: 0.8, easing: 'easeOut', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeOut', delay: -0.8 }
  ],


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
  explodeIn: [
    { property: 'scaleX', from: 0, to: 1, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.3, easing: 'easeOut' },
    { property: 'scaleX', from: 1, to: 1.2, duration: 0.15, easing: 'easeOut', delay: 0.3 },
    { property: 'scaleY', from: 1, to: 1.2, duration: 0.15, easing: 'easeOut', delay: 0.3 },
    // 由于乘法组合，要让最终结果是 1，需要：1 * 1.2 * (1/1.2) = 1
    { property: 'scaleX', from: 1, to: 1/1.2, duration: 0.15, easing: 'easeIn', delay: 0.45 },
    { property: 'scaleY', from: 1, to: 1/1.2, duration: 0.15, easing: 'easeIn', delay: 0.45 },
    { property: 'rotation', from: 0, to: 360, duration: 0.5, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.3, easing: 'easeOut' }
  ],

  // 爆炸退出效果
  explodeOut: [
    { property: 'scaleX', from: 1, to: 1.5, duration: 0.4, easing: 'easeIn', delay: -0.6 },
    { property: 'scaleY', from: 1, to: 1.5, duration: 0.4, easing: 'easeIn', delay: -0.6 },
    { property: 'rotation', from: 0, to: 360, duration: 0.6, easing: 'easeIn', delay: -0.6 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 }
  ],

  // 溶解效果
  dissolveIn: [
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeInOut' },
    { property: 'scaleX', from: 0.6, to: 1, duration: 0.5, easing: 'easeOut' },
    { property: 'scaleY', from: 0.6, to: 1, duration: 0.5, easing: 'easeOut' }
  ],

  // 溶解退出效果
  dissolveOut: [
    { property: 'opacity', from: 1, to: 0, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleX', from: 1, to: 0.9, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0.9, duration: 0.8, easing: 'easeIn', delay: -0.8 }
  ],

  // 弹簧效果
  springIn: [
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

  // ========== 惊艳特效动画 ==========

  // 强力弹性进入 - 更有冲击力的弹性效果
  // 现在 scale 使用覆盖方式（最后一个动画的值生效），更直观易懂
  powerBounceIn: [
    { property: 'scaleX', from: 0, to: 1.3, duration: 0.4, easing: 'easeOutBack' },
    { property: 'scaleY', from: 0, to: 1.3, duration: 0.4, easing: 'easeOutBack' },
    { property: 'scaleX', from: 1.3, to: 0.5, duration: 0.4, easing: 'easeIn', delay: 0.4 },
    { property: 'scaleY', from: 1.3, to: 0.5, duration: 0.4, easing: 'easeIn', delay: 0.4 },
    { property: 'scaleX', from: 0.5, to: 1, duration: 0.4, easing: 'easeOut', delay: 0.8 },
    { property: 'scaleY', from: 0.5, to: 1, duration: 0.2, easing: 'easeOut', delay: 0.8 },
    { property: 'opacity', from: 0, to: 1, duration: 0.3, easing: 'easeOut' },
    { property: 'rotation', from: -10, to: 0, duration: 0.6, easing: 'easeOutBack' }
  ],

  // 3D 翻转进入 - 卡片翻转效果
  flip3DIn: [
    { property: 'rotationX', from: -90, to: 0, duration: 0.8, easing: 'easeOutBack' },
    { property: 'rotationY', from: 0, to: 0, duration: 0.8, easing: 'easeOutBack' },
    { property: 'scaleX', from: 0.8, to: 1, duration: 0.8, easing: 'easeOut' },
    { property: 'scaleY', from: 0.8, to: 1, duration: 0.8, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' },
    { property: 'translateZ', from: -200, to: 0, duration: 0.8, easing: 'easeOut' }
  ],

  // 3D 翻转退出
  flip3DOut: [
    { property: 'rotationX', from: 0, to: 90, duration: 0.8, easing: 'easeInBack', delay: -0.8 },
    { property: 'rotationY', from: 0, to: 0, duration: 0.8, easing: 'easeInBack', delay: -0.8 },
    { property: 'scaleX', from: 1, to: 0.8, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'scaleY', from: 1, to: 0.8, duration: 0.8, easing: 'easeIn', delay: -0.8 },
    { property: 'opacity', from: 1, to: 0, duration: 0.6, easing: 'easeIn', delay: -0.6 },
    { property: 'translateZ', from: 0, to: -200, duration: 0.8, easing: 'easeIn', delay: -0.8 }
  ],

  // 弹性飞入 - 从远处弹入
  elasticFlyIn: [
    { property: 'x', from: -500, to: 0, duration: 1.0, easing: 'easeOutElastic', isOffset: true },
    { property: 'y', from: -300, to: 0, duration: 1.0, easing: 'easeOutElastic', isOffset: true },
    { property: 'scaleX', from: 0.3, to: 1, duration: 1.0, easing: 'easeOutElastic' },
    { property: 'scaleY', from: 0.3, to: 1, duration: 1.0, easing: 'easeOutElastic' },
    { property: 'rotation', from: -180, to: 0, duration: 1.0, easing: 'easeOutElastic' },
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeOut' }
  ],

  // 旋转弹入 - 旋转+弹跳组合
  spinBounceIn: [
    { property: 'rotation', from: -720, to: 0, duration: 1.0, easing: 'easeOutBounce' },
    { property: 'scaleX', from: 0, to: 1.2, duration: 0.5, easing: 'easeOutBounce' },
    { property: 'scaleY', from: 0, to: 1.2, duration: 0.5, easing: 'easeOutBounce' },
    { property: 'scaleX', from: 1.2, to: 1, duration: 0.3, easing: 'easeIn', delay: 0.5 },
    { property: 'scaleY', from: 1.2, to: 1, duration: 0.3, easing: 'easeIn', delay: 0.5 },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
  ],

  // 缩放旋转组合 - 更有节奏感
  zoomSpinIn: [
    { property: 'scaleX', from: 0, to: 1.5, duration: 0.3, easing: 'easeOutExpo' },
    { property: 'scaleY', from: 0, to: 1.5, duration: 0.3, easing: 'easeOutExpo' },
    { property: 'rotation', from: 180, to: 0, duration: 0.4, easing: 'easeOutBack' },
    { property: 'scaleX', from: 1.5, to: 0.95, duration: 0.2, easing: 'easeIn', delay: 0.3 },
    { property: 'scaleY', from: 1.5, to: 0.95, duration: 0.2, easing: 'easeIn', delay: 0.3 },
    { property: 'scaleX', from: 0.95, to: 1, duration: 0.2, easing: 'easeOut', delay: 0.5 },
    { property: 'scaleY', from: 0.95, to: 1, duration: 0.2, easing: 'easeOut', delay: 0.5 },
    { property: 'opacity', from: 0, to: 1, duration: 0.3, easing: 'easeOutExpo' }
  ],

  // 脉冲放大进入 - 心跳效果
  pulseIn: [
    { property: 'scaleX', from: 0, to: 1.4, duration: 0.25, easing: 'easeOutExpo' },
    { property: 'scaleY', from: 0, to: 1.4, duration: 0.25, easing: 'easeOutExpo' },
    { property: 'opacity', from: 0, to: 1, duration: 0.2, easing: 'easeOutExpo' },
    { property: 'scaleX', from: 1.4, to: 0.85, duration: 0.15, easing: 'easeIn', delay: 0.25 },
    { property: 'scaleY', from: 1.4, to: 0.85, duration: 0.15, easing: 'easeIn', delay: 0.25 },
    { property: 'scaleX', from: 0.85, to: 1.1, duration: 0.15, easing: 'easeOut', delay: 0.4 },
    { property: 'scaleY', from: 0.85, to: 1.1, duration: 0.15, easing: 'easeOut', delay: 0.4 },
    { property: 'scaleX', from: 1.1, to: 1, duration: 0.15, easing: 'easeIn', delay: 0.55 },
    { property: 'scaleY', from: 1.1, to: 1, duration: 0.15, easing: 'easeIn', delay: 0.55 }
  ],

  // 滑入旋转 - 从侧面滑入并旋转
  slideSpinIn: [
    { property: 'x', from: 800, to: 0, duration: 0.8, easing: 'easeOutBack', isOffset: true },
    { property: 'rotation', from: 360, to: 0, duration: 0.8, easing: 'easeOutBack' },
    { property: 'scaleX', from: 0.5, to: 1, duration: 0.8, easing: 'easeOutBack' },
    { property: 'scaleY', from: 0.5, to: 1, duration: 0.8, easing: 'easeOutBack' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 滑入旋转（左侧）
  slideSpinInLeft: [
    { property: 'x', from: -800, to: 0, duration: 0.8, easing: 'easeOutBack', isOffset: true },
    { property: 'rotation', from: -360, to: 0, duration: 0.8, easing: 'easeOutBack' },
    { property: 'scaleX', from: 0.5, to: 1, duration: 0.8, easing: 'easeOutBack' },
    { property: 'scaleY', from: 0.5, to: 1, duration: 0.8, easing: 'easeOutBack' },
    { property: 'opacity', from: 0, to: 1, duration: 0.6, easing: 'easeOut' }
  ],

  // 垂直弹入 - 从下方弹入
  bounceUpIn: [
    { property: 'y', from: 600, to: -50, duration: 0.6, easing: 'easeOutBounce', isOffset: true },
    { property: 'y', from: -50, to: 0, duration: 0.3, easing: 'easeIn', delay: 0.6, isOffset: true },
    { property: 'scaleX', from: 0.8, to: 1.1, duration: 0.5, easing: 'easeOutBounce' },
    { property: 'scaleY', from: 0.8, to: 1.1, duration: 0.5, easing: 'easeOutBounce' },
    { property: 'scaleX', from: 1.1, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.5 },
    { property: 'scaleY', from: 1.1, to: 1, duration: 0.2, easing: 'easeIn', delay: 0.5 },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
  ],

  // 缩放淡入 - 快速缩放+淡入
  zoomFadeIn: [
    { property: 'scaleX', from: 1.5, to: 1, duration: 0.6, easing: 'easeOutExpo' },
    { property: 'scaleY', from: 1.5, to: 1, duration: 0.6, easing: 'easeOutExpo' },
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeOutExpo' }
  ],

  // 缩放淡出
  zoomFadeOut: [
    { property: 'scaleX', from: 1, to: 0.8, duration: 0.6, easing: 'easeInExpo', delay: -0.6 },
    { property: 'scaleY', from: 1, to: 0.8, duration: 0.6, easing: 'easeInExpo', delay: -0.6 },
    { property: 'opacity', from: 1, to: 0, duration: 0.5, easing: 'easeInExpo', delay: -0.5 }
  ],

  // 3D 旋转进入 - Y轴旋转
  rotate3DYIn: [
    { property: 'rotationY', from: -90, to: 0, duration: 0.9, easing: 'easeOutBack' },
    { property: 'scaleX', from: 0.7, to: 1, duration: 0.9, easing: 'easeOut' },
    { property: 'opacity', from: 0, to: 1, duration: 0.5, easing: 'easeOut' },
    { property: 'translateZ', from: -300, to: 0, duration: 0.9, easing: 'easeOut' }
  ],

  // 3D 旋转退出 - Y轴旋转
  rotate3DYOut: [
    { property: 'rotationY', from: 0, to: 90, duration: 0.9, easing: 'easeInBack', delay: -0.9 },
    { property: 'scaleX', from: 1, to: 0.7, duration: 0.9, easing: 'easeIn', delay: -0.9 },
    { property: 'opacity', from: 1, to: 0, duration: 0.5, easing: 'easeIn', delay: -0.5 },
    { property: 'translateZ', from: 0, to: -300, duration: 0.9, easing: 'easeIn', delay: -0.9 }
  ],

  // 弹性缩放进入 - 多次回弹
  elasticScaleIn: [
    { property: 'scaleX', from: 0, to: 1.25, duration: 0.5, easing: 'easeOutElastic' },
    { property: 'scaleY', from: 0, to: 1.25, duration: 0.5, easing: 'easeOutElastic' },
    { property: 'scaleX', from: 1.25, to: 0.9, duration: 0.3, easing: 'easeIn', delay: 0.5 },
    { property: 'scaleY', from: 1.25, to: 0.9, duration: 0.3, easing: 'easeIn', delay: 0.5 },
    { property: 'scaleX', from: 0.9, to: 1.05, duration: 0.25, easing: 'easeOut', delay: 0.8 },
    { property: 'scaleY', from: 0.9, to: 1.05, duration: 0.25, easing: 'easeOut', delay: 0.8 },
    { property: 'scaleX', from: 1.05, to: 1, duration: 0.2, easing: 'easeIn', delay: 1.05 },
    { property: 'scaleY', from: 1.05, to: 1, duration: 0.2, easing: 'easeIn', delay: 1.05 },
    { property: 'opacity', from: 0, to: 1, duration: 0.4, easing: 'easeOut' }
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
    { property: 'scaleX', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleY', from: 0, to: 1, duration: 0.4, easing: 'easeOut' },
    { property: 'scaleX', from: 1, to: 0.9, duration: 0.2, easing: 'easeIn', delay: 0.4 },
    { property: 'scaleY', from: 1, to: 0.9, duration: 0.2, easing: 'easeIn', delay: 0.4 },
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
