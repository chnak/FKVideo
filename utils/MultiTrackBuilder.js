import { VideoMaker } from "../index.js";

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
      backgroundColor: config.backgroundColor || 'rgba(0,0,0,0.7)',
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
   */
  addAnimation(elementIndex, animations) {
    if (this.elements[elementIndex]) {
      this.elements[elementIndex].animations = animations;
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
    this.builder = builder;
    this.sceneIndex = builder.scenes.length;
    
    // 应用额外配置
    Object.assign(this, sceneConfig);
  }

  /**
   * 添加背景
   */
  addBackground(config = {}) {
    const background = this.builder.createBackground({
      color: config.color || "#000000",
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
      backgroundColor: config.backgroundColor || 'rgba(0,0,0,0.7)',
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
   */
  addAnimation(elementIndex, animations) {
    if (this.elements[elementIndex]) {
      this.elements[elementIndex].animations = animations;
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
   */
  addTransition(transitionConfig) {
    this.transitions.push(transitionConfig);
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
      backgroundColor: config.backgroundColor || 'rgba(0,0,0,0.7)',
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
      elements: scene.elements
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
          elements: scene.elements
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
      backgroundColor: config.backgroundColor || 'rgba(0,0,0,0.7)',
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

export default MultiTrackBuilder;
