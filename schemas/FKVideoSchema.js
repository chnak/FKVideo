import { z } from 'zod';
import { easingMap } from '../utils/easings.js';
import { AllTransitions } from '../transitions/transition.js';

// ========== 基础类型定义 ==========

// 位置值类型 - 支持像素、百分比、rpx等单位
const PositionValueSchema = z.union([
  z.number(),
  z.string().regex(/^\d+(\.\d+)?(px|%|rpx)$/, '位置值格式不正确'),
  z.string().regex(/^\d+(\.\d+)?$/, '纯数字位置值')
]);

// 颜色值类型
const ColorValueSchema = z.union([
  z.string().regex(/^#[0-9a-fA-F]{6}$/, '十六进制颜色格式不正确'),
  z.string().regex(/^#[0-9a-fA-F]{3}$/, '短十六进制颜色格式不正确'),
  z.string().regex(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, 'RGB颜色格式不正确'),
  z.string().regex(/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/, 'RGBA颜色格式不正确'),
  z.string().min(1, '颜色值不能为空')
]);

// 缓动函数类型 - 直接从 utils/easings.js 导入
const EasingTypeSchema = z.enum(Object.keys(easingMap));

// 文本对齐类型
const TextAlignSchema = z.enum(['left', 'center', 'right', 'justify']);

// 文本基线类型
const TextBaselineSchema = z.enum(['top', 'middle', 'bottom', 'alphabetic', 'hanging']);

// 图片适配类型
const ImageFitSchema = z.enum(['cover', 'contain', 'fill', 'scale-down']);

// 形状类型
const ShapeTypeSchema = z.enum(['rect', 'circle', 'triangle', 'polygon', 'ellipse']);

// 位置类型
const PositionTypeSchema = z.enum(['top', 'center', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']);

// 渐变类型
const GradientTypeSchema = z.enum(['linear', 'radial']);

// 渐变方向
const GradientDirectionSchema = z.enum(['horizontal', 'vertical', 'diagonal', 'diagonal-reverse']);

// ========== 基础元素属性 ==========

const BaseElementSchema = z.object({
  // 基础属性
  type: z.string(),
  source: z.string().optional(),
  src: z.string().optional(), // 兼容性属性
  startTime: z.number().min(0).default(0),
  duration: z.number().min(0).default(4),
  endTime: z.number().min(0).optional(),
  
  // 画布属性
  canvasWidth: z.number().positive().default(1920),
  canvasHeight: z.number().positive().default(1080),
  fps: z.number().positive().default(30),
  
  // 变换属性
  x: PositionValueSchema.default(0),
  y: PositionValueSchema.default(0),
  width: PositionValueSchema.optional(),
  height: PositionValueSchema.optional(),
  scaleX: z.number().default(1),
  scaleY: z.number().default(1),
  rotation: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
  zIndex: z.number().default(0),
  
  // 位置属性
  position: PositionTypeSchema.default('center'),
  originX: z.enum(['left', 'center', 'right']).default('center'),
  originY: z.enum(['top', 'center', 'bottom']).default('center'),
  
  // 3D变换属性
  rotationX: z.number().default(0),
  rotationY: z.number().default(0),
  rotationZ: z.number().default(0),
  translateZ: z.number().default(0),
  
  // 动画属性
  animations: z.array(z.any()).default([]),
  
  // 临时目录
  tmpDir: z.string().optional()
});



// ========== 字幕元素 ==========

const SubtitleElementSchema = BaseElementSchema.extend({
  type: z.literal('subtitle'),
  text: z.string().default(''),
  fontPath: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.union([z.number(), z.string()]).optional(),
  fillColor: ColorValueSchema.default('#ffffff'),
  strokeColor: ColorValueSchema.optional(),
  strokeWidth: z.number().min(0).default(0),
  textAlign: TextAlignSchema.default('left'),
  textBaseline: TextBaselineSchema.default('top'),
  lineHeight: z.number().min(0).default(1.2),
  maxWidth: PositionValueSchema.optional(),
  backgroundColor: ColorValueSchema.optional(),
  position: PositionTypeSchema.default('bottom'),
  padding: z.number().min(0).default(10),
  audio: z.string().optional(),
  audioSegments: z.array(z.any()).optional(),
  audioElements: z.array(z.any()).optional(),
  volume: z.number().min(0).max(1).optional(),
  fadeIn: z.number().min(0).optional(),
  fadeOut: z.number().min(0).optional()
});

// ========== 标题元素 ==========

const TitleElementSchema = BaseElementSchema.extend({
  type: z.literal('title'),
  text: z.string().default(''),
  fontPath: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.union([z.number(), z.string()]).default(72),
  textColor: ColorValueSchema.default('#ffffff'),
  color: ColorValueSchema.optional(), // 兼容性属性
  position: PositionTypeSchema.default('center'),
  // zoomDirection: z.string().optional(),
  // zoomAmount: z.number().min(0).default(0.2),
  // animate: z.array(z.any()).default([]),
  split: z.any().optional(),
  splitDelay: z.number().min(0).default(0.1),
  splitDuration: z.number().min(0).default(0.3),
  
  // 阴影配置
  shadow: z.any().optional(),
  shadowColor: ColorValueSchema.default('#000000'),
  shadowBlur: z.number().min(0).default(0),
  shadowOffsetX: z.number().default(0),
  shadowOffsetY: z.number().default(0),
  
  // 文本边框配置
  stroke: z.any().optional(),
  strokeColor: ColorValueSchema.default('#000000'),
  strokeWidth: z.number().min(0).default(1),
  
  // 渐变填充配置
  gradient: z.any().optional(),
  gradientType: GradientTypeSchema.default('linear'),
  gradientColors: z.array(ColorValueSchema).default(['#ff0000', '#0000ff']),
  gradientDirection: GradientDirectionSchema.default('horizontal'),
  
  // 文字装饰配置
  underline: z.boolean().default(false),
  linethrough: z.boolean().default(false),
  overline: z.boolean().default(false),
  
  // 文字发光效果
  glow: z.any().optional(),
  glowColor: ColorValueSchema.default('#ffffff'),
  glowBlur: z.number().min(0).default(10),
  
  // 文字变形效果
  skewX: z.number().default(0),
  skewY: z.number().default(0),
  
  // 文字路径效果
  textPath: z.any().optional(),
  pathData: z.any().optional(),
  
  // 文字遮罩效果
  textMask: z.any().optional(),
  maskImage: z.any().optional(),
  
  // 打字机效果
  typewriter: z.any().optional(),
  typewriterSpeed: z.number().min(0).default(100),
  typewriterDelay: z.number().min(0).default(0)
});

// ========== 文本元素 ==========

const TextElementSchema = BaseElementSchema.extend({
  type: z.literal('text'),
  text: z.string().default(''),
  fontPath: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.union([z.number(), z.string()]).default(24),
  textColor: ColorValueSchema.default('#ffffff'),
  color: ColorValueSchema.optional(), // 兼容性属性
  position: PositionTypeSchema.default('center'),
  // zoomDirection: z.string().optional(),
  // zoomAmount: z.number().min(0).default(0.2),
  split: z.any().optional(),
  splitDelay: z.number().min(0).default(0.1),
  splitDuration: z.number().min(0).default(0.3),
  
  // 阴影配置
  shadow: z.any().optional(),
  shadowColor: ColorValueSchema.default('#000000'),
  shadowBlur: z.number().min(0).default(0),
  shadowOffsetX: z.number().default(0),
  shadowOffsetY: z.number().default(0),
  
  // 文本边框配置
  stroke: z.any().optional(),
  strokeColor: ColorValueSchema.default('#000000'),
  strokeWidth: z.number().min(0).default(1),
  
  // 渐变填充配置
  gradient: z.any().optional(),
  gradientType: GradientTypeSchema.default('linear'),
  gradientColors: z.array(ColorValueSchema).default(['#ff0000', '#0000ff']),
  gradientDirection: GradientDirectionSchema.default('horizontal'),
  
  // 文字装饰配置
  underline: z.boolean().default(false),
  linethrough: z.boolean().default(false),
  overline: z.boolean().default(false),
  
  // 文字发光效果
  glow: z.any().optional(),
  glowColor: ColorValueSchema.default('#ffffff'),
  glowBlur: z.number().min(0).default(10),
  
  // 文字变形效果
  skewX: z.number().default(0),
  skewY: z.number().default(0),
  
  // 文字路径效果
  textPath: z.any().optional(),
  pathData: z.any().optional(),
  
  // 文字遮罩效果
  textMask: z.any().optional(),
  maskImage: z.any().optional(),
  
  // 打字机效果
  typewriter: z.any().optional(),
  typewriterSpeed: z.number().min(0).default(100),
  typewriterDelay: z.number().min(0).default(0)
});

// ========== 图片元素 ==========

const ImageElementSchema = BaseElementSchema.extend({
  type: z.literal('image'),
  source: z.string(),
  src: z.string().optional(), // 兼容性属性
  width: PositionValueSchema.optional(),
  height: PositionValueSchema.optional(),
  fit: ImageFitSchema.default('cover')
});

// ========== 视频元素 ==========

const VideoElementSchema = BaseElementSchema.extend({
  type: z.literal('video'),
  source: z.string(),
  src: z.string().optional(), // 兼容性属性
  track: z.number().positive().default(1),
  transition: z.any().optional(),
  width: PositionValueSchema.optional(),
  height: PositionValueSchema.optional(),
  fit: ImageFitSchema.default('cover'),
  
  // 视频截取属性
  cutFrom: z.number().min(0).optional(),
  cutTo: z.number().min(0).optional(),
  speedFactor: z.number().positive().default(1),
  
  // 视频循环属性
  loop: z.boolean().default(false)
});

// ========== 音频元素 ==========

const AudioElementSchema = BaseElementSchema.extend({
  type: z.literal('audio'),
  source: z.string(),
  src: z.string().optional(), // 兼容性属性
  volume: z.number().min(0).max(1).default(1),
  mixVolume: z.number().min(0).max(1).optional(),
  loop: z.boolean().default(false),
  fadeIn: z.number().min(0).default(0),
  fadeOut: z.number().min(0).default(0),
  
  // 音频截取属性
  cutFrom: z.number().min(0).default(0),
  cutTo: z.number().min(0).optional(),
  speedFactor: z.number().positive().default(1),
  
  // 音频处理属性
  audioNorm: z.boolean().default(false),
  audioNormGaussSize: z.number().positive().default(5),
  audioNormMaxGain: z.number().positive().default(30)
});

// ========== 形状元素 ==========

const ShapeElementSchema = BaseElementSchema.extend({
  type: z.literal('shape'),
  shape: ShapeTypeSchema.default('rect'),
  fillColor: ColorValueSchema.default('#ffffff'),
  fill: ColorValueSchema.optional(), // 兼容性属性
  strokeColor: ColorValueSchema.optional(),
  strokeWidth: z.number().min(0).default(0),
  width: PositionValueSchema.default('100px'),
  height: PositionValueSchema.default('100px')
});

// ========== 组合元素 ==========

const CompositionElementSchema = BaseElementSchema.extend({
  type: z.literal('composition'),
  elements: z.array(z.lazy(() => ElementSchema)).default([]),
  width: PositionValueSchema.optional(),
  height: PositionValueSchema.optional()
});

// ========== 动画配置 ==========

// 关键帧配置
const KeyframeSchema = z.object({
  time: z.number().min(0).max(1),
  value: z.union([z.number(), z.string()]),
  easing: EasingTypeSchema.optional()
});

// 动画配置 - 支持多种格式
const AnimationSchema = z.union([
  // 1. 字符串格式 - 预设动画名称
  z.string(),
  
  // 2. 对象格式 - 各种动画配置
  z.object({
    // 基础属性
    property: z.string().optional(),
    from: z.union([z.number(), z.string()]).optional(),
    to: z.union([z.number(), z.string()]).optional(),
    duration: z.number().min(0).default(1),
    startTime: z.number().min(0).default(0),
    easing: EasingTypeSchema.default('easeInOut'),
    delay: z.number().default(0), // 允许负数（用于 Out 动画）
    repeat: z.number().min(0).default(1),
    direction: z.enum(['normal', 'reverse', 'alternate', 'alternate-reverse']).default('normal'),
    fillMode: z.enum(['none', 'forwards', 'backwards', 'both']).default('both'),
    
    // 预设动画相关
    type: z.string().optional(), // 预设动画类型
    preset: z.string().optional(), // 预设动画名称
    name: z.string().optional(), // 预设动画名称（兼容性）
    
    // 关键帧动画
    keyframes: z.array(KeyframeSchema).optional(),
    
    // 动画 ID（用于管理）
    id: z.string().optional(),
    
    // 是否为偏移量动画
    isOffset: z.boolean().default(false)
  })
]);

// 动画数组配置
const AnimationsArraySchema = z.array(AnimationSchema).default([]);

// ========== 过渡效果配置 ==========

const TransitionSchema = z.object({
  name: z.enum(AllTransitions),
  duration: z.number().min(0).default(0.5),
  easing: EasingTypeSchema.default('easeInOut'),
  startTime: z.number().min(0).optional(),
  endTime: z.number().min(0).optional(),
  params: z.record(z.any()).optional()
});

// ========== 场景配置 ==========

const SceneSchema = z.object({
  type: z.literal('composition'),
  duration: z.number().min(0).default(5),
  startTime: z.number().min(0).default(0),
  x: PositionValueSchema.default('50%'),
  y: PositionValueSchema.default('50%'),
  width: PositionValueSchema.default('100%'),
  height: PositionValueSchema.default('100%'),
  zIndex: z.number().default(1),
  elements: z.array(z.lazy(() => ElementSchema)).default([]),
  animations: z.array(AnimationSchema).default([])
});

// ========== 轨道配置 ==========

const TrackSchema = z.object({
  type: z.literal('composition'),
  duration: z.number().min(0).default(0),
  startTime: z.number().min(0).default(0),
  x: PositionValueSchema.default('50%'),
  y: PositionValueSchema.default('50%'),
  width: PositionValueSchema.default('100%'),
  height: PositionValueSchema.default('100%'),
  zIndex: z.number().default(1),
  elements: z.array(z.lazy(() => ElementSchema)).default([]),
  scenes: z.array(SceneSchema).default([])
});

// ========== 元素联合类型 ==========

const ElementSchema = z.discriminatedUnion('type', [
  TextElementSchema,
  SubtitleElementSchema,
  TitleElementSchema,
  ImageElementSchema,
  VideoElementSchema,
  AudioElementSchema,
  ShapeElementSchema,
  CompositionElementSchema
]);

// ========== 主配置 ==========

const FKVideoConfigSchema = z.object({
  // 输出配置
  outPath: z.string().min(1, '输出路径不能为空'),
  
  // 视频配置
  width: z.number().positive().default(1920),
  height: z.number().positive().default(1080),
  fps: z.number().positive().default(30),
  
  // 元素配置
  elements: z.array(ElementSchema).default([]),
  
  // 过渡效果配置
  transitions: z.array(TransitionSchema).default([]),
  
  // 轨道配置
  tracks: z.array(TrackSchema).default([]),
  
  // 场景配置
  scenes: z.array(SceneSchema).default([]),
  
  // 全局配置
  defaults: z.record(z.any()).optional(),
  
  // 临时目录
  tmpDir: z.string().optional()
});

// ========== MultiTrackBuilder 配置 ==========

const MultiTrackBuilderConfigSchema = z.object({
  width: z.number().positive().default(1920),
  height: z.number().positive().default(1080),
  fps: z.number().positive().default(30),
  outPath: z.string().min(1, '输出路径不能为空').default('output/multi-track-video.mp4')
});

// ========== 导出所有 Schema ==========

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
  MultiTrackBuilderConfigSchema
};

// ========== 验证函数 ==========

/**
 * 验证 FKVideo 配置
 * @param {any} config - 配置对象
 * @returns {object} 验证结果
 */
export function validateFKVideoConfig(config) {
  try {
    const validatedConfig = FKVideoConfigSchema.parse(config);
    return { success: true, data: validatedConfig, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证 MultiTrackBuilder 配置
 * @param {any} config - 配置对象
 * @returns {object} 验证结果
 */
export function validateMultiTrackBuilderConfig(config) {
  try {
    const validatedConfig = MultiTrackBuilderConfigSchema.parse(config);
    return { success: true, data: validatedConfig, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证元素配置
 * @param {any} element - 元素配置对象
 * @returns {object} 验证结果
 */
export function validateElement(element) {
  try {
    const validatedElement = ElementSchema.parse(element);
    return { success: true, data: validatedElement, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证动画配置
 * @param {any} animation - 动画配置对象
 * @returns {object} 验证结果
 */
export function validateAnimation(animation) {
  try {
    const validatedAnimation = AnimationSchema.parse(animation);
    return { success: true, data: validatedAnimation, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证动画数组配置
 * @param {any} animations - 动画数组配置
 * @returns {object} 验证结果
 */
export function validateAnimations(animations) {
  try {
    const validatedAnimations = AnimationsArraySchema.parse(animations);
    return { success: true, data: validatedAnimations, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证关键帧配置
 * @param {any} keyframe - 关键帧配置对象
 * @returns {object} 验证结果
 */
export function validateKeyframe(keyframe) {
  try {
    const validatedKeyframe = KeyframeSchema.parse(keyframe);
    return { success: true, data: validatedKeyframe, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

/**
 * 验证过渡效果配置
 * @param {any} transition - 过渡效果配置对象
 * @returns {object} 验证结果
 */
export function validateTransition(transition) {
  try {
    const validatedTransition = TransitionSchema.parse(transition);
    return { success: true, data: validatedTransition, errors: null };
  } catch (error) {
    return { 
      success: false, 
      data: null, 
      errors: error.errors || [{ message: error.message }] 
    };
  }
}

