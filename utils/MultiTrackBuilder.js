import { VideoMaker } from "../index.js";
import { getAnimationPreset, getTransitionPreset, AnimationPresets, TransitionPresets } from "./AnimationPresets.js";

/**
 * 轨道类 - 支持链式调用的轨道对象
 * 轨道可以包含场景和元素
 */
class Track {
  constructor(trackConfig, builder) {
    this.type = "composition";
    this.duration = trackConfig.duration || 0;
    this.startTime = trackConfig.startTime || 0;
    this.x = trackConfig.x || '50%';
    this.y = trackConfig.y || '50%';
    this.width = trackConfig.width || '100%';
    this.height = trackConfig.height || '100%';
    this.zIndex = trackConfig.zIndex || 1;
    this.elements = []; // 轨道直接包含的元素
    this.scenes = [];   // 轨道包含的场景
    this.builder = builder;
    this.trackIndex = builder.trackIndex;
    
    // 应用额外配置
    Object.assign(this, trackConfig);
  }

  /**
   * 添加背景
   */
  addBackground(config = {}) {
    const background = this.builder.createBackground({
      color: config.color || "#000000",
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 0,
      ...config
    });
    
    this.elements.push(background);
    return this;
  }

  /**
   * 添加图片
   */
  addImage(config = {}) {
    const image = this.builder.createImage({
      source: config.source,
      x: config.x || '50%',
      y: config.y || '50%',
      width: config.width || '100%',
      height: config.height || '100%',
      fit: config.fit || 'cover',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    });
    
    this.elements.push(image);
    return this;
  }

  /**
   * 添加文本
   */
  addText(config = {}) {
    const text = this.builder.createText({
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 24,
      x: config.x || '50%',
      y: config.y || '50%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 2,
      ...config
    });
    
    this.elements.push(text);
    return this;
  }

  /**
   * 添加字幕
   */
  addSubtitle(config = {}) {
    const subtitle = this.builder.createSubtitle({
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 16,
      x: config.x || '50%',
      y: config.y || '80%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 3,
      backgroundColor: config.backgroundColor,
      backgroundPadding: config.backgroundPadding || 10,
      backgroundRadius: config.backgroundRadius || 5,
      ...config
    });
    
    this.elements.push(subtitle);
    return this;
  }

  /**
   * 添加形状
   */
  addShape(config = {}) {
    const shape = this.builder.createShape({
      shape: config.shape || 'rect',
      width: config.width || '100px',
      height: config.height || '100px',
      x: config.x || '50%',
      y: config.y || '50%',
      fillColor: config.fillColor || '#ffffff',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    });
    
    this.elements.push(shape);
    return this;
  }

  /**
   * 添加音频
   */
  addAudio(config = {}) {
    const audio = this.builder.createAudio({
      source: config.source,
      volume: config.volume || 1,
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 0,
      loop: config.loop || false,
      fadeIn: config.fadeIn || 0,
      fadeOut: config.fadeOut || 0,
      ...config
    });
    
    this.elements.push(audio);
    return this;
  }

  /**
   * 添加动画到指定元素
   * @param {number} elementIndex 元素索引
   * @param {string|object|array} animations 动画预设名称、动画配置或动画配置数组
   * @param {object} overrides 覆盖参数
   */
  addAnimation(elementIndexOrAnimation, animations = null, overrides = {}) {
    let animationConfigs = [];
    
    // 判断第一个参数是元素索引还是动画配置
    if (typeof elementIndexOrAnimation === 'number') {
      // 传统用法：addAnimation(elementIndex, animations, overrides)
      const elementIndex = elementIndexOrAnimation;
      const animationConfig = animations;
      
      if (this.elements[elementIndex]) {
        if (typeof animationConfig === 'string') {
          const preset = getAnimationPreset(animationConfig, overrides);
          animationConfigs = Array.isArray(preset) ? preset : [preset];
        } else if (Array.isArray(animationConfig)) {
          animationConfigs = animationConfig.map(anim => {
            if (typeof anim === 'string') {
              return getAnimationPreset(anim, overrides);
            }
            return anim;
          });
        } else if (typeof animationConfig === 'object') {
          animationConfigs = [animationConfig];
        }
        
        this.elements[elementIndex].animations = animationConfigs;
      }
    } else {
      // 链式用法：addAnimation(animations, overrides) - 应用到整个场景
      const animationConfig = elementIndexOrAnimation;
      overrides = animations || {};
      
      if (typeof animationConfig === 'string') {
        const preset = getAnimationPreset(animationConfig, overrides);
        animationConfigs = Array.isArray(preset) ? preset : [preset];
      } else if (Array.isArray(animationConfig)) {
        animationConfigs = animationConfig.map(anim => {
          if (typeof anim === 'string') {
            return getAnimationPreset(anim, overrides);
          }
          return anim;
        });
      } else if (typeof animationConfig === 'object') {
        animationConfigs = [animationConfig];
      }
      
      // 如果场景已有动画，追加到现有动画数组
      if (this.animations) {
        this.animations.push(...animationConfigs);
      } else {
        this.animations = animationConfigs;
      }
    }
    
    return this;
  }

  /**
   * 添加自定义元素
   */
  addElement(element) {
    this.elements.push(element);
    return this;
  }

  /**
   * 为最后一个元素添加动画（链式调用）
   * @param {string|object|array} animations 动画预设名称、动画配置或动画配置数组
   * @param {object} overrides 覆盖参数
   */
  addAnimationToLast(animations, overrides = {}) {
    if (this.elements.length > 0) {
      const elementIndex = this.elements.length - 1;
      this.addAnimation(elementIndex, animations, overrides);
    }
    return this;
  }

  /**
   * 创建场景
   */
  createScene(sceneConfig = {}) {
    // 计算场景的开始时间
    const sceneStartTime = this.scenes.length > 0 
      ? this.scenes[this.scenes.length - 1].startTime + this.scenes[this.scenes.length - 1].duration
      : this.startTime;
    
    const scene = new Scene({
      ...sceneConfig,
      startTime: sceneStartTime
    }, this.builder);
    
    this.scenes.push(scene);
    return scene;
  }

  /**
   * 添加场景
   */
  addScene(scene) {
    // 计算场景的开始时间
    const sceneStartTime = this.scenes.length > 0 
      ? this.scenes[this.scenes.length - 1].startTime + this.scenes[this.scenes.length - 1].duration
      : this.startTime;
    
    // 更新场景的开始时间
    scene.startTime = sceneStartTime;
    
    this.scenes.push(scene);
    return this;
  }

  /**
   * 设置轨道属性
   */
  setProperty(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * 设置持续时间
   */
  setDuration(duration) {
    this.duration = duration;
    return this;
  }

  /**
   * 设置位置
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * 设置尺寸
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * 设置层级
   */
  setZIndex(zIndex) {
    this.zIndex = zIndex;
    return this;
  }
}

/**
 * 场景类 - 支持链式调用的场景对象
 */
class Scene {
  constructor(sceneConfig, builder) {
    this.type = "composition";
    this.duration = sceneConfig.duration || 5;
    this.startTime = builder.currentTime;
    this.x = sceneConfig.x || '50%';
    this.y = sceneConfig.y || '50%';
    this.width = sceneConfig.width || '100%';
    this.height = sceneConfig.height || '100%';
    this.zIndex = sceneConfig.zIndex || 1;
    this.elements = [];
    this.animations = []; // 场景级别的动画
    this.builder = builder;
    this.sceneIndex = builder.scenes.length;
    
    // 应用额外配置
    Object.assign(this, sceneConfig);
  }

  /**
   * 添加背景
   */
  addBackground(config = {}) {
    // 预设背景颜色
    const presetColors = [
      //"#ff6b6b", // 红色
      "#4ecdc4", // 青色
      "#45b7d1", // 蓝色
      "#f39c12", // 橙色
      "#e74c3c", // 深红色
      "#9b59b6", // 紫色
      "#1abc9c", // 青绿色
      "#2ecc71", // 绿色
      "#f1c40f", // 黄色
      "#34495e", // 深灰色
      "#e67e22", // 深橙色
      "#8e44ad", // 深紫色
      "#16a085", // 深青绿色
      "#27ae60", // 深绿色
      "#f39c12", // 金色
      "#2c3e50", // 深蓝灰色
      "#e74c3c", // 珊瑚红
      "#3498db", // 天蓝色
      "#95a5a6", // 浅灰色
      //"#ecf0f1"  // 浅白色
    ];
    
    // 如果没有指定颜色，随机选择一个预设颜色
    let backgroundColor = config.color;
    if (!backgroundColor) {
      const randomIndex = Math.floor(Math.random() * presetColors.length);
      backgroundColor = presetColors[randomIndex];
    }
    
    const background = this.builder.createBackground({
      color: backgroundColor,
      duration: this.duration,
      startTime: 0,
      zIndex: 0,
      ...config
    });
    
    this.elements.push(background);
    return this;
  }

  /**
   * 添加图片
   */
  addImage(config = {}) {
    const image = this.builder.createImage({
      source: config.source,
      x: config.x || '50%',
      y: config.y || '50%',
      width: config.width || '100%',
      height: config.height || '100%',
      fit: config.fit || 'cover',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    });
    
    this.elements.push(image);
    return this;
  }

  /**
   * 添加文本
   */
  addText(config = {}) {
    const text = this.builder.createText({
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 24,
      x: config.x || '50%',
      y: config.y || '50%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 2,
      ...config
    });
    
    this.elements.push(text);
    return this;
  }

  /**
   * 添加字幕
   */
  addSubtitle(config = {}) {
    const subtitle = this.builder.createSubtitle({
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 16,
      x: config.x || '50%',
      y: config.y || '80%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 3,
      backgroundColor: config.backgroundColor,
      backgroundPadding: config.backgroundPadding || 10,
      backgroundRadius: config.backgroundRadius || 5,
      ...config
    });
    
    this.elements.push(subtitle);
    return this;
  }

  /**
   * 添加形状
   */
  addShape(config = {}) {
    const shape = this.builder.createShape({
      shape: config.shape || 'rect',
      width: config.width || '100px',
      height: config.height || '100px',
      x: config.x || '50%',
      y: config.y || '50%',
      fillColor: config.fillColor || '#ffffff',
      duration: config.duration || this.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    });
    
    this.elements.push(shape);
    return this;
  }

  /**
   * 添加动画到指定元素
   * @param {number} elementIndex 元素索引
   * @param {string|object|array} animations 动画预设名称、动画配置或动画配置数组
   * @param {object} overrides 覆盖参数
   */
  addAnimation(elementIndexOrAnimation, animations = null, overrides = {}) {
    let animationConfigs = [];
    
    // 判断第一个参数是元素索引还是动画配置
    if (typeof elementIndexOrAnimation === 'number') {
      // 传统用法：addAnimation(elementIndex, animations, overrides)
      const elementIndex = elementIndexOrAnimation;
      const animationConfig = animations;
      
      if (this.elements[elementIndex]) {
        if (typeof animationConfig === 'string') {
          const preset = getAnimationPreset(animationConfig, overrides);
          animationConfigs = Array.isArray(preset) ? preset : [preset];
        } else if (Array.isArray(animationConfig)) {
          animationConfigs = animationConfig.map(anim => {
            if (typeof anim === 'string') {
              return getAnimationPreset(anim, overrides);
            }
            return anim;
          });
        } else if (typeof animationConfig === 'object') {
          animationConfigs = [animationConfig];
        }
        
        this.elements[elementIndex].animations = animationConfigs;
      }
    } else {
      // 链式用法：addAnimation(animations, overrides) - 应用到整个场景
      const animationConfig = elementIndexOrAnimation;
      overrides = animations || {};
      
      if (typeof animationConfig === 'string') {
        const preset = getAnimationPreset(animationConfig, overrides);
        animationConfigs = Array.isArray(preset) ? preset : [preset];
      } else if (Array.isArray(animationConfig)) {
        animationConfigs = animationConfig.map(anim => {
          if (typeof anim === 'string') {
            return getAnimationPreset(anim, overrides);
          }
          return anim;
        });
      } else if (typeof animationConfig === 'object') {
        animationConfigs = [animationConfig];
      }
      
      // 如果场景已有动画，追加到现有动画数组
      if (this.animations) {
        this.animations.push(...animationConfigs);
      } else {
        this.animations = animationConfigs;
      }
    }
    
    return this;
  }

  /**
   * 添加自定义元素
   */
  addElement(element) {
    this.elements.push(element);
    return this;
  }

  /**
   * 为最后一个元素添加动画（链式调用）
   * @param {string|object|array} animations 动画预设名称、动画配置或动画配置数组
   * @param {object} overrides 覆盖参数
   */
  addAnimationToLast(animations, overrides = {}) {
    if (this.elements.length > 0) {
      const elementIndex = this.elements.length - 1;
      this.addAnimation(elementIndex, animations, overrides);
    }
    return this;
  }

  /**
   * 设置场景属性
   */
  setProperty(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * 设置持续时间
   */
  setDuration(duration) {
    this.duration = duration;
    return this;
  }

  /**
   * 设置位置
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * 设置尺寸
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * 设置层级
   */
  setZIndex(zIndex) {
    this.zIndex = zIndex;
    return this;
  }
}

/**
 * 多轨道多场景构建器
 * 提供便捷的API来创建复杂的多轨道多场景视频
 */
export class MultiTrackBuilder {
  constructor(config = {}) {
    this.config = {
      width: config.width || 1920,
      height: config.height || 1080,
      fps: config.fps || 30,
      outPath: config.outPath || "output/multi-track-video.mp4",
      ...config
    };
    
    this.tracks = [];
    this.scenes = [];
    this.transitions = [];
    this.currentTime = 0;
    this.trackIndex = 0;
  }

  /**
   * 创建新轨道
   */
  createTrack(trackConfig = {}) {
    const track = new Track(trackConfig, this);
    
    this.tracks.push(track);
    this.trackIndex++;
    return track;
  }

  /**
   * 创建场景
   */
  createScene(sceneConfig = {}) {
    const scene = new Scene(sceneConfig, this);
    
    this.scenes.push(scene);
    this.currentTime += scene.duration;
    return scene;
  }

  /**
   * 添加元素到指定轨道
   */
  addElementToTrack(trackIndex, element) {
    if (this.tracks[trackIndex]) {
      this.tracks[trackIndex].elements.push(element);
    }
    return this;
  }

  /**
   * 添加元素到指定场景
   */
  addElementToScene(sceneIndex, element) {
    if (this.scenes[sceneIndex]) {
      this.scenes[sceneIndex].elements.push(element);
    }
    return this;
  }

  /**
   * 添加过渡效果
   * @param {string|object} transitionConfig 过渡预设名称或过渡配置
   * @param {object} overrides 覆盖参数
   */
  addTransition(transitionConfig, overrides = {}) {
    let transition;
    
    if (typeof transitionConfig === 'string') {
      // 预设过渡名称
      transition = getTransitionPreset(transitionConfig, overrides);
    } else if (typeof transitionConfig === 'object') {
      // 过渡配置对象
      transition = transitionConfig;
    } else {
      throw new Error('过渡配置必须是字符串或对象');
    }
    
    this.transitions.push(transition);
    return this;
  }

  /**
   * 创建背景元素
   */
  createBackground(config = {}) {
    return {
      type: "shape",
      shape: "rect",
      width: '100%',
      height: '100%',
      x: '50%',
      y: '50%',
      fillColor: config.color || "#000000",
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 0,
      ...config
    };
  }

  /**
   * 创建图片元素
   */
  createImage(config = {}) {
    return {
      type: "image",
      source: config.source,
      x: config.x || '50%',
      y: config.y || '50%',
      width: config.width || '100%',
      height: config.height || '100%',
      fit: config.fit || 'cover',
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    };
  }

  /**
   * 创建文本元素
   */
  createText(config = {}) {
    return {
      type: "title",
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 24,
      x: config.x || '50%',
      y: config.y || '50%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 2,
      ...config
    };
  }

  /**
   * 创建字幕元素
   */
  createSubtitle(config = {}) {
    return {
      type: "subtitle",
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 16,
      x: config.x || '50%',
      y: config.y || '80%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 3,
      backgroundColor: config.backgroundColor,
      backgroundPadding: config.backgroundPadding || 10,
      backgroundRadius: config.backgroundRadius || 5,
      ...config
    };
  }

  /**
   * 创建形状元素
   */
  createShape(config = {}) {
    return {
      type: "shape",
      shape: config.shape || 'rect',
      width: config.width || '100px',
      height: config.height || '100px',
      x: config.x || '50%',
      y: config.y || '50%',
      fillColor: config.fillColor || '#ffffff',
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    };
  }

  /**
   * 创建音频元素
   */
  createAudio(config = {}) {
    return {
      type: "audio",
      source: config.source,
      volume: config.volume || 1,
      duration: config.duration || 5,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 0,
      loop: config.loop || false,
      fadeIn: config.fadeIn || 0,
      fadeOut: config.fadeOut || 0,
      ...config
    };
  }

  /**
   * 创建动画
   */
  createAnimation(config = {}) {
    return {
      property: config.property,
      from: config.from,
      to: config.to,
      duration: config.duration || 1,
      startTime: config.startTime || 0,
      easing: config.easing || 'easeInOut',
      ...config
    };
  }

  /**
   * 创建淡入动画
   */
  createFadeIn(duration = 1, startTime = 0) {
    return this.createAnimation({
      property: 'opacity',
      from: 0,
      to: 1,
      duration,
      startTime,
      easing: 'easeIn'
    });
  }

  /**
   * 创建淡出动画
   */
  createFadeOut(duration = 1, startTime = 0) {
    return this.createAnimation({
      property: 'opacity',
      from: 1,
      to: 0,
      duration,
      startTime,
      easing: 'easeOut'
    });
  }

  /**
   * 创建缩放动画
   */
  createScale(from = 0, to = 1, duration = 1, startTime = 0) {
    return this.createAnimation({
      property: 'scaleX',
      from,
      to,
      duration,
      startTime,
      easing: 'easeOut'
    });
  }

  /**
   * 创建移动动画
   */
  createMove(fromX, toX, fromY, toY, duration = 1, startTime = 0) {
    return [
      this.createAnimation({
        property: 'x',
        from: fromX,
        to: toX,
        duration,
        startTime,
        easing: 'easeOut'
      }),
      this.createAnimation({
        property: 'y',
        from: fromY,
        to: toY,
        duration,
        startTime,
        easing: 'easeOut'
      })
    ];
  }

  /**
   * 创建旋转动画
   */
  createRotation(from = 0, to = 360, duration = 1, startTime = 0) {
    return this.createAnimation({
      property: 'rotation',
      from,
      to,
      duration,
      startTime,
      easing: 'linear'
    });
  }

  /**
   * 构建视频配置
   */
  build() {
    // 计算所有轨道的最大持续时间
    let maxDuration = this.currentTime;
    
    // 计算每个轨道的持续时间
    this.tracks.forEach(track => {
      if (track.scenes.length > 0) {
        const lastScene = track.scenes[track.scenes.length - 1];
        const trackDuration = lastScene.startTime + lastScene.duration;
        track.duration = Math.max(track.duration, trackDuration);
        maxDuration = Math.max(maxDuration, trackDuration);
      }
    });
    
    // 将所有场景添加到主轨道
    const mainTrack = this.createTrack({
      zIndex: 1,
      duration: maxDuration
    });
    
    // 将场景对象序列化为普通对象
    mainTrack.elements = this.scenes.map(scene => ({
      type: scene.type,
      duration: scene.duration,
      startTime: scene.startTime,
      x: scene.x,
      y: scene.y,
      width: scene.width,
      height: scene.height,
      zIndex: scene.zIndex,
      elements: scene.elements,
      animations: scene.animations || []
    }));
    
    // 添加其他轨道
    this.tracks.push(mainTrack);
    
    // 将所有轨道对象序列化为普通对象
    const serializedTracks = this.tracks.map(track => ({
      type: track.type,
      duration: track.duration,
      startTime: track.startTime,
      x: track.x,
      y: track.y,
      width: track.width,
      height: track.height,
      zIndex: track.zIndex,
      elements: [
        // 轨道包含的场景
        ...track.scenes.map(scene => ({
          type: scene.type,
          duration: scene.duration,
          startTime: scene.startTime,
          x: scene.x,
          y: scene.y,
          width: scene.width,
          height: scene.height,
          zIndex: scene.zIndex,
          elements: scene.elements,
          animations: scene.animations || []
        })),
        // 轨道直接包含的元素
        ...track.elements,
      ]
    }));
    
    return {
      outPath: this.config.outPath,
      width: this.config.width,
      height: this.config.height,
      fps: this.config.fps,
      elements: serializedTracks,
      transitions: this.transitions
    };
  }

  /**
   * 获取所有动画预设名称
   */
  getAnimationPresetNames() {
    return Object.keys(AnimationPresets);
  }

  /**
   * 获取所有过渡预设名称
   */
  getTransitionPresetNames() {
    return Object.keys(TransitionPresets);
  }

  /**
   * 获取动画预设
   */
  getAnimationPreset(presetName, overrides = {}) {
    return getAnimationPreset(presetName, overrides);
  }

  /**
   * 获取过渡预设
   */
  getTransitionPreset(presetName, overrides = {}) {
    return getTransitionPreset(presetName, overrides);
  }

  /**
   * 创建并渲染视频
   */
  async render() {
    const config = this.build();
    const videoMaker = new VideoMaker(config);
    
    // 监听事件
    videoMaker.on("start", () => {
      console.log("开始渲染多轨道多场景视频...");
    });

    videoMaker.on("progress", (progress) => {
      console.log(`渲染进度: ${progress}%`);
    });

    videoMaker.on("complete", (outputPath) => {
      console.log(`视频渲染完成: ${outputPath}`);
    });

    videoMaker.on("error", (error) => {
      console.error("渲染失败:", error);
    });

    try {
      const outputPath = await videoMaker.start();
      await videoMaker.close();
      return outputPath;
    } catch (error) {
      await videoMaker.close();
      throw error;
    }
  }
}

/**
 * 场景构建器 - 用于构建单个场景
 */
export class SceneBuilder {
  constructor(sceneConfig = {}) {
    this.scene = {
      type: "composition",
      duration: sceneConfig.duration || 5,
      startTime: sceneConfig.startTime || 0,
      x: sceneConfig.x || '50%',
      y: sceneConfig.y || '50%',
      width: sceneConfig.width || '100%',
      height: sceneConfig.height || '100%',
      zIndex: sceneConfig.zIndex || 1,
      elements: [],
      ...sceneConfig
    };
  }

  /**
   * 添加背景
   */
  addBackground(config = {}) {
    const background = {
      type: "shape",
      shape: "rect",
      width: '100%',
      height: '100%',
      x: '50%',
      y: '50%',
      fillColor: config.color || "#000000",
      duration: this.scene.duration,
      startTime: 0,
      zIndex: 0,
      ...config
    };
    
    this.scene.elements.push(background);
    return this;
  }

  /**
   * 添加图片
   */
  addImage(config = {}) {
    const image = {
      type: "image",
      source: config.source,
      x: config.x || '50%',
      y: config.y || '50%',
      width: config.width || '100%',
      height: config.height || '100%',
      fit: config.fit || 'cover',
      duration: config.duration || this.scene.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    };
    
    this.scene.elements.push(image);
    return this;
  }

  /**
   * 添加文本
   */
  addText(config = {}) {
    const text = {
      type: "title",
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 24,
      x: config.x || '50%',
      y: config.y || '50%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.scene.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 2,
      ...config
    };
    
    this.scene.elements.push(text);
    return this;
  }

  /**
   * 添加字幕
   */
  addSubtitle(config = {}) {
    const subtitle = {
      type: "subtitle",
      text: config.text || '',
      textColor: config.textColor || '#ffffff',
      fontSize: config.fontSize || 16,
      x: config.x || '50%',
      y: config.y || '80%',
      textAlign: config.textAlign || 'center',
      duration: config.duration || this.scene.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 3,
      backgroundColor: config.backgroundColor,
      backgroundPadding: config.backgroundPadding || 10,
      backgroundRadius: config.backgroundRadius || 5,
      ...config
    };
    
    this.scene.elements.push(subtitle);
    return this;
  }

  /**
   * 添加形状
   */
  addShape(config = {}) {
    const shape = {
      type: "shape",
      shape: config.shape || 'rect',
      width: config.width || '100px',
      height: config.height || '100px',
      x: config.x || '50%',
      y: config.y || '50%',
      fillColor: config.fillColor || '#ffffff',
      duration: config.duration || this.scene.duration,
      startTime: config.startTime || 0,
      zIndex: config.zIndex || 1,
      ...config
    };
    
    this.scene.elements.push(shape);
    return this;
  }

  /**
   * 添加动画
   */
  addAnimation(elementIndex, animations) {
    if (this.scene.elements[elementIndex]) {
      this.scene.elements[elementIndex].animations = animations;
    }
    return this;
  }

  /**
   * 构建场景
   */
  build() {
    return this.scene;
  }
}

/**
 * 便捷的创建函数
 */
export function createMultiTrackBuilder(config = {}) {
  return new MultiTrackBuilder(config);
}

export function createSceneBuilder(sceneConfig = {}) {
  return new SceneBuilder(sceneConfig);
}

// 导出类
export { Track };
export { Scene };

export default MultiTrackBuilder;
