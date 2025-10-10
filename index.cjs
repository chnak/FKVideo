const EventEmitter = require("events");
const { dirname, join } = require("path");

/**
 * 基于 Creatomate 配置结构的视频制作库
 * 结合 editly 的帧渲染机制
 */
class VideoMaker extends EventEmitter {
  constructor(config = {}) {
    super();
    
    this.config = {
      // 输出设置
      outputFormat: config.outputFormat || 'mp4',
      width: config.width || 1920,
      height: config.height || 1080,
      fps: config.fps || 30,
      duration: config.duration || 4,
      
      // 渲染设置
      verbose: config.verbose || false,
      fast: config.fast || false,
      outPath: config.outPath || 'output.mp4',
      playbackSpeed: config.playbackSpeed || 1.0, // 倍速播放，默认1.0倍速
      tmpDir: null,
      // Creatomate 风格的元素配置
      elements: config.elements || [],
      
      // 过渡效果配置
      transitions: config.transitions || [],
      
      // 全局默认值
      defaults: {
        duration: 4,
        transition: {
          duration: 0.5,
          name: "fade",
          easing: "linear"
        },
        ...config.defaults
      }
    };
    // 临时目录将在start方法中设置
    this.config.tmpDir = null,
    this.timeline = null;
    this.renderer = null;
  }

  /**
   * 开始渲染视频
   */
  async start() {
    try {
      this.emit('start');
      
      // 动态导入ES模块
      const { VideoRenderer } = await import("./renderer.js");
      const { ConfigParser } = await import("./configParser.js");
      const { Timeline } = await import("./timeline.js");
      const { nanoid } = await import("nanoid");
      
      // 设置临时目录
      if (!this.config.tmpDir) {
        this.config.tmpDir = join(dirname(this.config.outPath), `video-maker-tmp-${nanoid()}`);
      }
      
      // 解析配置
      const configParser = new ConfigParser(this.config);
      const parsedConfig = await configParser.parse();
      
      // 创建时间线
      this.timeline = new Timeline(parsedConfig, this.config);
      
      // 创建渲染器
      this.renderer = new VideoRenderer(this.config);
      
      // 开始渲染
      const outputPath = await this.renderer.render(this.timeline);
      
      this.emit('complete', outputPath);
      return outputPath;
      
    } catch (error) {
      this.emit('error', error);
      // 确保在错误时也清理资源
      try {
        await this.close();
      } catch (closeError) {
        console.warn('清理资源时出错:', closeError.message);
      }
      throw error;
    }
  }

  /**
   * 关闭资源
   */
  async close() {
    if (this.timeline) {
      await this.timeline.close();
    }
    if (this.renderer) {
      await this.renderer.close();
    }
  }
}

// 导出元素类 - 使用动态导入
async function getVideoElement() {
  const { VideoElement } = await import("./elements/video.js");
  return VideoElement;
}

async function getImageElement() {
  const { ImageElement } = await import("./elements/image.js");
  return ImageElement;
}

async function getTextElement() {
  const { TextElement } = await import("./elements/text.js");
  return TextElement;
}

async function getShapeElement() {
  const { ShapeElement } = await import("./elements/shape.js");
  return ShapeElement;
}

async function getCompositionElement() {
  const { CompositionElement } = await import("./elements/composition.js");
  return CompositionElement;
}

// 导出工具类
async function getTransition() {
  const { Transition } = await import("./transitions/transition.js");
  return Transition;
}

// 导出动画系统
async function getAnimationManager() {
  const { 
    AnimationManager, 
    KeyframeAnimation,
    animationManager 
  } = await import("./animations/AnimationManager.js");
  return { AnimationManager, KeyframeAnimation, animationManager };
}

async function getAnimation() {
  const { Animation } = await import("./animations/Animation.js");
  return Animation;
}

async function getAnimationBuilder() {
  const { 
    AnimationBuilder, 
    PresetBuilder,
    createAnimationBuilder, 
    createPresetBuilder,
    quickAnimation,
    quickPreset
  } = await import("./animations/AnimationBuilder.js");
  return { 
    AnimationBuilder, 
    PresetBuilder,
    createAnimationBuilder, 
    createPresetBuilder,
    quickAnimation,
    quickPreset
  };
}

// 导出场景系统
async function getSceneManager() {
  const { SceneManager, Scene } = await import("./scenes/SceneManager.js");
  return { SceneManager, Scene };
}

async function getSceneTemplateManager() {
  const { SceneTemplateManager } = await import("./scenes/SceneTemplates.js");
  return { SceneTemplateManager };
}

// 导出多轨道构建器
async function getMultiTrackBuilder() {
  const { 
    MultiTrackBuilder, 
    Track, 
    Scene,
    createMultiTrackBuilder 
  } = await import("./utils/MultiTrackBuilder.js");
  return { MultiTrackBuilder, Track, MultiTrackScene: Scene, createMultiTrackBuilder };
}

// 导出动画预设
async function getAnimationPresets() {
  const { 
    AnimationPresets, 
    TransitionPresets,
    getAnimationPreset,
    getTransitionPreset,
    getAnimationPresetNames,
    getTransitionPresetNames,
    getAllAnimationPresetNames,
    isMultiPropertyAnimation
  } = await import("./utils/AnimationPresets.js");
  return { 
    AnimationPresets, 
    TransitionPresets,
    getAnimationPreset,
    getTransitionPreset,
    getAnimationPresetNames,
    getTransitionPresetNames,
    getAllAnimationPresetNames,
    isMultiPropertyAnimation
  };
}

// 导出 AnimationManager 预设
async function getAnimationManagerPresets() {
  const { 
    AnimationManagerPresets,
    getAnimationManagerPreset,
    getAnimationManagerPresetNames,
    isMultiPropertyAnimation
  } = await import("./utils/AnimationManagerPresets.js");
  return { 
    AnimationManagerPresets,
    getAnimationManagerPreset,
    getAnimationManagerPresetNames,
    isAnimationManagerMultiProperty: isMultiPropertyAnimation
  };
}

// 导出 Schema 验证系统
async function getSchemaValidation() {
  const {
    // 基础类型
    PositionValueSchema,
    ColorValueSchema,
    EasingTypeSchema,
    TextAlignSchema,
    TextBaselineSchema,
    ImageFitSchema,
    ShapeTypeSchema,
    PositionTypeSchema,
    GradientTypeSchema,
    GradientDirectionSchema,
    
    // 元素 Schema
    BaseElementSchema,
    TextElementSchema,
    SubtitleElementSchema,
    TitleElementSchema,
    ImageElementSchema,
    VideoElementSchema,
    AudioElementSchema,
    ShapeElementSchema,
    CompositionElementSchema,
    ElementSchema,
    
    // 动画和过渡
    KeyframeSchema,
    AnimationSchema,
    AnimationsArraySchema,
    TransitionSchema,
    
    // 场景和轨道
    SceneSchema,
    TrackSchema,
    
    // 主配置
    FKVideoConfigSchema,
    MultiTrackBuilderConfigSchema,
    
    // 验证函数
    validateFKVideoConfig,
    validateMultiTrackBuilderConfig,
    validateElement,
    validateAnimation,
    validateAnimations,
    validateKeyframe,
    validateTransition
  } = await import("./schemas/FKVideoSchema.js");
  
  return {
    // 基础类型
    PositionValueSchema,
    ColorValueSchema,
    EasingTypeSchema,
    TextAlignSchema,
    TextBaselineSchema,
    ImageFitSchema,
    ShapeTypeSchema,
    PositionTypeSchema,
    GradientTypeSchema,
    GradientDirectionSchema,
    
    // 元素 Schema
    BaseElementSchema,
    TextElementSchema,
    SubtitleElementSchema,
    TitleElementSchema,
    ImageElementSchema,
    VideoElementSchema,
    AudioElementSchema,
    ShapeElementSchema,
    CompositionElementSchema,
    ElementSchema,
    
    // 动画和过渡
    KeyframeSchema,
    AnimationSchema,
    AnimationsArraySchema,
    TransitionSchema,
    
    // 场景和轨道
    SceneSchema,
    TrackSchema,
    
    // 主配置
    FKVideoConfigSchema,
    MultiTrackBuilderConfigSchema,
    
    // 验证函数
    validateFKVideoConfig,
    validateMultiTrackBuilderConfig,
    validateElement,
    validateAnimation,
    validateAnimations,
    validateKeyframe,
    validateTransition
  };
}

module.exports = {
  VideoMaker,
  // 导出异步获取函数
  getVideoElement,
  getImageElement,
  getTextElement,
  getShapeElement,
  getCompositionElement,
  getTransition,
  getAnimationManager,
  getAnimation,
  getAnimationBuilder,
  getSceneManager,
  getSceneTemplateManager,
  getMultiTrackBuilder,
  getAnimationPresets,
  getAnimationManagerPresets,
  getSchemaValidation
};

// 默认导出
module.exports.default = VideoMaker;
