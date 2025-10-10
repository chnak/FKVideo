import EventEmitter from "events";
import { VideoRenderer } from "./renderer.js";
import { ConfigParser } from "./configParser.js";
import { Timeline } from "./timeline.js";
import { dirname, join } from "path";
import { nanoid } from "nanoid";
/**
 * 基于 Creatomate 配置结构的视频制作库
 * 结合 editly 的帧渲染机制
 */
export class VideoMaker extends EventEmitter {
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
    this.config.tmpDir=join(dirname(this.config.outPath), `video-maker-tmp-${nanoid()}`),
    this.timeline = null;
    this.renderer = null;
  }

  /**
   * 开始渲染视频
   */
  async start() {
    try {
      this.emit('start');
      
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

// 导出元素类
export { VideoElement } from "./elements/video.js";
export { ImageElement } from "./elements/image.js";
export { TitleElement as TextElement } from "./elements/title.js";
export { ShapeElement } from "./elements/shape.js";
export { CompositionElement } from "./elements/composition.js";
export { SubtitleElement } from "./elements/subtitle.js";
export { AudioElement } from "./elements/audio.js";

// 导出工具类
export { Transition } from "./transitions/transition.js";

// 导出动画系统
export { 
  AnimationManager, 
  KeyframeAnimation,
  animationManager 
} from "./animations/AnimationManager.js";
export { Animation } from "./animations/Animation.js";

export { 
  AnimationBuilder, 
  PresetBuilder,
  createAnimationBuilder, 
  createPresetBuilder,
  quickAnimation,
  quickPreset
} from "./animations/AnimationBuilder.js";

// 导出场景系统
export { SceneManager, Scene } from "./scenes/SceneManager.js";
export { SceneTemplateManager } from "./scenes/SceneTemplates.js";

// 导出多轨道构建器
export { 
  MultiTrackBuilder, 
  Track, 
  Scene as MultiTrackScene,
  createMultiTrackBuilder 
} from "./utils/MultiTrackBuilder.js";

// 导出动画预设
export { 
  AnimationPresets, 
  TransitionPresets,
  getAnimationPreset,
  getTransitionPreset,
  getAnimationPresetNames,
  getTransitionPresetNames,
  getAllAnimationPresetNames,
  isMultiPropertyAnimation
} from "./utils/AnimationPresets.js";

// 导出 AnimationManager 预设
export { 
  AnimationManagerPresets,
  getAnimationManagerPreset,
  getAnimationManagerPresetNames,
  isMultiPropertyAnimation as isAnimationManagerMultiProperty
} from "./utils/AnimationManagerPresets.js";

// 导出 Schema 验证系统
export {
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
} from "./schemas/FKVideoSchema.js";

export default VideoMaker;
