import { animationManager } from '../animations/AnimationManager.js';
import { getPositionProps, parsePositionValue } from '../utils/positionUtils.js';
import { registerFont } from "canvas";
import { basename, resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { downloadAndDetect } from '../utils/download.js';

// 缓存已加载的字体
const loadedFonts = [];

/**
 * 元素基类 - 所有视频元素的基类
 */
export class BaseElement {
  // 静态字体处理方法
  static loadedFonts = loadedFonts;
  constructor(config) {
    this.source = config.source||config.src;
    this.type = config.type;
    this.startTime = config.startTime || 0;
    this.delay = config.delay || 0; // 延迟时间，在 startTime 之后延迟 delay 秒再开始显示
    this.duration = config.duration || 4;
    this.endTime = config.endTime || this.startTime + this.delay + this.duration;
    this.canvasWidth = config.canvasWidth || 1920;
    this.canvasHeight = config.canvasHeight || 1080;
    this.fps = config.fps || 30;
    // 变换属性
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.scaleX = config.scaleX || 1;
    this.scaleY = config.scaleY || 1;
    this.rotation = config.rotation || 0;
    this.opacity = config.opacity || 1;
    this.zIndex = config.zIndex || 0;
    
    // 位置属性
    this.position = config.position || 'center';
    this.originX = config.originX || 'center';
    this.originY = config.originY || 'center';
    
    // 3D变换属性
    this.rotationX = config.rotationX || 0;
    this.rotationY = config.rotationY || 0;
    this.rotationZ = config.rotation || 0;
    this.translateZ = config.translateZ || 0;
    
    // 动画属性
    this.animations = [];
    this.animationManager = animationManager;
    

    this.tmpDir = config.tmpDir;
    // 处理动画配置
    this.processAnimations(config.animations || []);

    // 内部状态
    this.isInitialized = false;
  }

  /**
   * 初始化元素
   */
  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    try{
      if (this.source && (this.source.startsWith('http'))) {
        const res=await downloadAndDetect(this.source,this.tmpDir);
        this.source =res.filePath;
      }
      if(this.audio&&(this.audio.startsWith('http'))) {
        const res = await downloadAndDetect(this.audio,this.tmpDir);
        this.audio =res.filePath;
      }
      if(this.fontPath&&(this.fontPath.startsWith('http'))) {
        const res = await downloadAndDetect(this.fontPath,this.tmpDir);
        this.fontPath =res.filePath;
      }
    }catch(error){
      console.error(error);
    }

  }

  /**
   * 读取下一帧 - 子类必须实现
   */
  async readNextFrame(time, canvas) {
    throw new Error('readNextFrame 方法必须在子类中实现');
  }

  /**
   * 关闭元素 - 子类可以重写
   */
  async close() {
    // 默认实现为空
  }

  /**
   * 处理动画配置
   * @param {Array} animations 动画配置数组
   */
  processAnimations(animations) {
    animations.forEach(animConfig => {
      let animationResult;
      
      if (typeof animConfig === 'string') {
        // 如果是字符串，当作预设动画处理
        animationResult = this.animationManager.applyPreset(animConfig);
      } else if (animConfig.type) {
        // 如果是 { type: "rotateIn" } 格式，当作预设动画处理
        animationResult = this.animationManager.applyPreset(animConfig.type, animConfig);
      } else if (animConfig.preset) {
        // 如果是预设动画配置
        animationResult = this.animationManager.applyPreset(animConfig.preset, animConfig);
      } else if (animConfig.name) {
        // 如果是 { name: "slideInFromRight", duration: 1, delay: 1 } 格式，当作预设动画处理
        animationResult = this.animationManager.applyPreset(animConfig.name, animConfig);
      } else if (animConfig.keyframes) {
        // 如果是关键帧动画
        animationResult = this.animationManager.createKeyframeAnimation(animConfig);
      } else {
        // 普通动画配置
        animationResult = this.animationManager.createAnimation(animConfig);
      }
      
      // 处理动画结果（可能是单个动画或多个动画）
      const animationsToAdd = Array.isArray(animationResult) ? animationResult : [animationResult];
      
      animationsToAdd.forEach((animation, index) => {
        // 设置动画的开始时间（仅对非关键帧动画）
        if (animation.constructor.name !== 'KeyframeAnimation') {
          if (animation.startTime === undefined || animation.startTime === 0) {
            // 对于 Out 动画（delay < 0），应该在元素结束时间开始
            if (animation.delay < 0) {
              animation.startTime = this.startTime + this.duration;
            } else {
              animation.startTime = this.startTime;
            }
          }
        } else {
          // 关键帧动画：设置相对于元素开始时间的偏移
          if (animation.startTime === undefined || animation.startTime === 0) {
            animation.startTime = this.startTime;
          }
          // 重新计算关键帧动画的时间范围
          animation.actualStartTime = animation.startTime + (animation.delay || 0);
          animation.endTime = animation.actualStartTime + animation.duration;
        }
        this.animations.push(animation);
      });
      
      // 为缩放动画自动添加Y轴（仅对单属性动画）
      if (!Array.isArray(animationResult) && animationResult.property === 'scaleX' && 
          (animConfig === 'zoomIn' || animConfig === 'zoomOut' || 
           (animConfig.type && (animConfig.type === 'zoomIn' || animConfig.type === 'zoomOut')))) {
        const yAnimation = this.animationManager.createAnimation({
          property: 'scaleY',
          from: animationResult.from,
          to: animationResult.to,
          duration: animationResult.duration,
          easing: animationResult.easing,
          delay: animationResult.delay || 0,
          startTime: animationResult.startTime
        });
        this.animations.push(yAnimation);
      }
    });
  }

  /**
   * 添加动画
   * @param {Object|string} animation 动画配置或预设名称
   */
  addAnimation(animation) {
    if (typeof animation === 'string') {
      const anim = this.animationManager.applyPreset(animation);
      this.animations.push(anim);
    } else {
      const anim = this.animationManager.createAnimation(animation);
      this.animations.push(anim);
    }
  }

  /**
   * 移除动画
   * @param {string} animationId 动画ID
   */
  removeAnimation(animationId) {
    this.animations = this.animations.filter(anim => anim.id !== animationId);
  }

  /**
   * 计算当前时间的变换属性
   */
  getTransformAtTime(time) {
    // 如果时间在 delay 之前，返回初始状态（不显示）
    const elementStartTime = this.startTime + this.delay;
    if (time < elementStartTime) {
      // 解析 x 和 y 位置，支持百分比和数值
      let x = this.x;
      let y = this.y;
      
      if (typeof this.x === 'string') {
        x = parsePositionValue(this.x, this.canvasWidth, 'px');
      }
      if (typeof this.y === 'string') {
        y = parsePositionValue(this.y, this.canvasHeight, 'px');
      }
      
      return {
        x,
        y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        rotation: this.rotation,
        opacity: 0, // 在 delay 期间不显示
        rotationX: this.rotationX,
        rotationY: this.rotationY,
        rotationZ: this.rotationZ,
        translateZ: this.translateZ
      };
    }
    
    const progress = this.getProgressAtTime(time);
    
    // 解析 x 和 y 位置，支持百分比和数值
    let x = this.x;
    let y = this.y;
    
    if (typeof this.x === 'string') {
      x = parsePositionValue(this.x, this.canvasWidth, 'px');
    }
    if (typeof this.y === 'string') {
      y = parsePositionValue(this.y, this.canvasHeight, 'px');
    }
    let scaleX = this.scaleX;
    let scaleY = this.scaleY;
    let rotation = this.rotation;
    let opacity = this.opacity;
    let rotationX = this.rotationX;
    let rotationY = this.rotationY;
    let rotationZ = this.rotationZ;
    let translateZ = this.translateZ;
    
    // 用于累加偏移量的变量
    let translateX = 0;
    let translateY = 0;

    // 处理多个动画的组合
    let scaleXAnimations = [];
    let scaleYAnimations = [];
    let rotationAnimations = [];
    let opacityAnimations = [];
    let translateXAnimations = [];
    let translateYAnimations = [];
    
    // 用于记录 scale 动画的时间信息，以便找出当前时间最合适的动画
    let scaleXAnimationsWithTime = [];
    let scaleYAnimationsWithTime = [];
    
    // 收集所有动画值
    for (const animation of this.animations) {
      const animValue = animation.getValueAtTime(time);
      
      // 计算动画的实际开始和结束时间
      const actualStartTime = (animation.startTime || 0) + (animation.delay || 0);
      const actualEndTime = actualStartTime + animation.duration;
      
      if (animValue !== null) {
        switch (animation.property) {
          case 'x':
            if (animation.isOffset) {
              translateXAnimations.push(animValue);
            } else {
              x = animValue; // 直接设置位置
            }
            break;
          case 'y':
            if (animation.isOffset) {
              translateYAnimations.push(animValue);
            } else {
              y = animValue; // 直接设置位置
            }
            break;
          case 'scaleX':
            scaleXAnimations.push(animValue);
            // 记录动画的时间信息：开始时间、结束时间、当前值
            scaleXAnimationsWithTime.push({ 
              value: animValue, 
              startTime: actualStartTime,
              endTime: actualEndTime,
              animation: animation
            });
            break;
          case 'scaleY':
            scaleYAnimations.push(animValue);
            // 记录动画的时间信息
            scaleYAnimationsWithTime.push({ 
              value: animValue, 
              startTime: actualStartTime,
              endTime: actualEndTime,
              animation: animation
            });
            break;
          case 'rotation':
          case 'rotationZ':
            rotationAnimations.push(animValue);
            break;
          case 'rotationX':
            rotationAnimations.push(animValue);
            break;
          case 'rotationY':
            rotationAnimations.push(animValue);
            break;
          case 'opacity':
            opacityAnimations.push(animValue);
            break;
          case 'translateZ':
            translateZ = animValue;
            break;
        }
      }
    }
    
    // 应用动画组合
    if (scaleXAnimationsWithTime.length > 0) {
      // 对于缩放，优先使用正在运行的动画（已开始但未结束）
      // 如果没有正在运行的，使用已结束的动画中最晚结束的那个
      const runningAnimations = scaleXAnimationsWithTime.filter(anim => 
        anim.startTime <= time && time < anim.endTime
      );
      
      if (runningAnimations.length > 0) {
        // 有正在运行的动画，使用开始时间最晚的那个（最后开始的）
        runningAnimations.sort((a, b) => b.startTime - a.startTime);
        scaleX = runningAnimations[0].value;
      } else {
        // 没有正在运行的，找出已结束的动画
        const endedAnimations = scaleXAnimationsWithTime.filter(anim => time >= anim.endTime);
        if (endedAnimations.length > 0) {
          // 使用结束时间最晚的动画的最终值
          endedAnimations.sort((a, b) => b.endTime - a.endTime);
          scaleX = endedAnimations[0].animation.to;
        } else {
          // 所有动画都还没开始，使用第一个动画的初始值
          scaleX = scaleXAnimations[0];
        }
      }
    }
    if (scaleYAnimationsWithTime.length > 0) {
      // 对于缩放，优先使用正在运行的动画
      const runningAnimations = scaleYAnimationsWithTime.filter(anim => 
        anim.startTime <= time && time < anim.endTime
      );
      
      if (runningAnimations.length > 0) {
        runningAnimations.sort((a, b) => b.startTime - a.startTime);
        scaleY = runningAnimations[0].value;
      } else {
        const endedAnimations = scaleYAnimationsWithTime.filter(anim => time >= anim.endTime);
        if (endedAnimations.length > 0) {
          endedAnimations.sort((a, b) => b.endTime - a.endTime);
          scaleY = endedAnimations[0].animation.to;
        } else {
          scaleY = scaleYAnimations[0];
        }
      }
    }
    if (rotationAnimations.length > 0) {
      // 对于旋转，使用加法组合
      rotation = rotationAnimations.reduce((acc, val) => acc + val, 0);
      rotationZ = rotation;
    }
    if (opacityAnimations.length > 0) {
      // 对于透明度，使用乘法组合
      opacity = opacityAnimations.reduce((acc, val) => acc * val, 1);
    }
    if (translateXAnimations.length > 0) {
      translateX = translateXAnimations.reduce((acc, val) => acc + val, 0);
    }
    if (translateYAnimations.length > 0) {
      translateY = translateYAnimations.reduce((acc, val) => acc + val, 0);
    }

    // 应用偏移量到最终位置
    x += translateX;
    y += translateY;

    return { 
      x, y, scaleX, scaleY, rotation, opacity,
      rotationX, rotationY, rotationZ, translateZ
    };
  }

  /**
   * 获取元素在当前时间的进度 (0-1)
   */
  getProgressAtTime(time) {
    // 考虑 delay：元素在 startTime + delay 时才开始显示
    const elementStartTime = this.startTime + this.delay;
    const elementTime = time - elementStartTime;
    return Math.max(0, Math.min(elementTime / this.duration, 1));
  }

  /**
   * 获取动画在当前时间的进度
   */
  getAnimationProgress(time, animation) {
    const animStartTime = this.startTime + (animation.startTime || 0);
    const animDuration = animation.duration || 1; // 使用动画的默认时长1秒，而不是元素时长
    const animEndTime = animStartTime + animDuration;
    
    if (time < animStartTime || time > animEndTime) {
      return -1; // 动画未开始或已结束
    }
    
    return (time - animStartTime) / animDuration;
  }

  /**
   * 线性插值
   */
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * 缓动函数
   */
  ease(t, type) {
    switch (type) {
      case 'easeIn':
        return t * t;
      case 'easeOut':
        return 1 - (1 - t) * (1 - t);
      case 'easeInOut':
        return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
      case 'linear':
      default:
        return t;
    }
  }

  /**
   * 获取解析后的位置属性
   * @param {Object} options - 位置选项
   * @returns {Object} 位置属性 { left, top, originX, originY }
   */
  getPositionProps(options = {}) {
    const {
      position = this.position,
      x = this.x,
      y = this.y,
      originX = this.originX,
      originY = this.originY
    } = options;

    return getPositionProps({
      position,
      x,
      y,
      width: this.canvasWidth,
      height: this.canvasHeight,
      originX,
      originY
    });
  }

  /**
   * 解析位置值，支持多种单位
   * @param {string|number} value - 位置值
   * @param {string} dimension - 维度 ('width' 或 'height')
   * @returns {number} 解析后的像素值
   */
  parsePositionValue(value, dimension = 'width') {
    const containerSize = dimension === 'width' ? this.canvasWidth : this.canvasHeight;
    return parsePositionValue(value, containerSize);
  }

  /**
   * 将变换信息应用到 frameData
   * @param {Object} frameData - 原始帧数据
   * @param {Object} transform - 变换信息
   * @returns {Object} 应用变换后的帧数据
   */
  applyTransformToFrameData(frameData, transform) {
    if (!frameData) return null;

    // 使用动画计算后的位置，而不是静态位置
    // transform 已经包含了动画后的 x, y 位置
    return {
      ...frameData,
      x: transform.x,
      y: transform.y,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      rotation: transform.rotation,
      opacity: transform.opacity,
      rotationX: transform.rotationX,
      rotationY: transform.rotationY,
      translateZ: transform.translateZ,
      originX: this.originX || 'center',
      originY: this.originY || 'center',
    };
  }

  /**
   * 将变换信息应用到 Fabric 对象
   * @param {Object} fabricObject - Fabric 对象
   * @param {Object} transform - 变换信息
   * @returns {Object} 应用变换后的 Fabric 对象
   */
  applyTransformToFabricObject(fabricObject, transform) {
    if (!fabricObject || !fabricObject.set) return fabricObject;

    // 使用动画计算后的位置，而不是静态位置
    // transform 已经包含了动画后的 x, y 位置
    fabricObject.set({
      left: transform.x,
      top: transform.y,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      angle: transform.rotation,
      opacity: transform.opacity,
      rotationX: transform.rotationX,
      rotationY: transform.rotationY,
      translateZ: transform.translateZ,
      originX: this.originX || 'center',
      originY: this.originY || 'center'
    });

    return fabricObject;
  }

  /**
   * 将变换信息应用到 contain-blur 效果的背景图像
   * @param {Object} backgroundData - 背景数据
   * @param {Object} transform - 变换信息
   * @returns {Object} 应用变换后的背景数据
   */
  applyTransformToContainBlurBackground(backgroundData, transform) {
    if (!backgroundData) return null;

    // 获取位置属性
    const positionProps = this.getPositionProps();
    
    return {
      ...backgroundData,
      x: positionProps.left,
      y: positionProps.top,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      rotation: transform.rotation,
      opacity: transform.opacity,
      originX: positionProps.originX,
      originY: positionProps.originY
    };
  }

  /**
   * 将变换信息应用到 contain-blur 效果的前景图像
   * @param {Object} foregroundData - 前景数据
   * @param {Object} transform - 变换信息
   * @returns {Object} 应用变换后的前景数据
   */
  applyTransformToContainBlurForeground(foregroundData, transform) {
    if (!foregroundData) return null;

    // 获取位置属性
    const positionProps = this.getPositionProps();
    
    return {
      ...foregroundData,
      x: positionProps.left,
      y: positionProps.top,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      rotation: transform.rotation,
      opacity: transform.opacity,
      originX: positionProps.originX,
      originY: positionProps.originY
    };
  }

  /**
   * 创建完整的 frameData，包含所有必要的变换信息
   * @param {Object} rawFrameData - 原始帧数据
   * @param {Object} transform - 变换信息
   * @param {number} time - 当前时间
   * @returns {Object} 完整的帧数据
   */
  createCompleteFrameData(rawFrameData, transform, time) {
    if (!rawFrameData) return null;
    
    // 如果是 contain-blur 效果
    if (rawFrameData.isContainBlur && rawFrameData.background && rawFrameData.foreground) {
      return {
        ...rawFrameData,
        background: this.applyTransformToContainBlurBackground(rawFrameData.background, transform),
        foreground: this.applyTransformToContainBlurForeground(rawFrameData.foreground, transform)
      };
    }

    // 如果是对象数组（新的架构）
    if (rawFrameData.objects && Array.isArray(rawFrameData.objects)) {
      return this.processObjectArray(rawFrameData, transform, time);
    }

    // 如果是分割文本，使用特殊的位置处理
    if (rawFrameData.isSplitText) {
      // 分割文本已经计算好了正确的位置，直接使用
      // 不需要再次调用 this.getPositionProps()，因为那会覆盖分割文本的计算结果
      
      // 应用变换信息
      const result = {
        ...rawFrameData,
        // 保持分割文本计算的位置，不覆盖
        x: rawFrameData.textLeft || rawFrameData.x,
        y: rawFrameData.textTop || rawFrameData.y,
        scaleX: transform.scaleX,
        scaleY: transform.scaleY,
        rotation: transform.rotation,
        opacity: transform.opacity,
        rotationX: transform.rotationX,
        rotationY: transform.rotationY,
        translateZ: transform.translateZ,
        originX: rawFrameData.splitOriginX, // 使用分割文本的原点
        originY: rawFrameData.splitOriginY  // 使用分割文本的原点
      };
      
      return result;
    }

    // 普通帧数据
    return this.applyTransformToFrameData(rawFrameData, transform);
  }

  /**
   * 处理对象数组 - 统一处理位置动画和渲染
   * @param {Object} rawFrameData - 包含对象数组的原始帧数据
   * @param {Object} transform - 变换信息
   * @param {number} time - 当前时间
   * @returns {Object} 处理后的帧数据
   */
  processObjectArray(rawFrameData, transform, time) {
    const { objects, width, height, isSplitText, textLeft, textTop, textWidth, textHeight } = rawFrameData;
    
    // 获取位置属性
    const positionProps = this.getPositionProps();
    
    // 处理每个对象
    const processedObjects = objects.map(obj => {
      const { type, fabricObject, originalLeft, originalTop, originalOriginX, originalOriginY, segmentDelay } = obj;
      
      // 如果是音频对象，直接返回，不需要 Fabric 处理
      if (type === 'audio') {
        return obj; // 返回原始音频对象
      }
      
      // 检查 fabricObject 是否存在
      if (!fabricObject) {
        console.warn(`[BaseElement] 对象缺少 fabricObject 属性:`, obj);
        return null;
      }
      
      // 计算对象相对于整体元素的位置
      let objectLeft = originalLeft;
      let objectTop = originalTop;
      let objectTransform = transform;
      
      if (isSplitText && segmentDelay !== undefined) {
        // 分割文本：需要根据分割段的延迟时间重新计算动画
        // 计算分割段的相对时间
        const segmentTime = time - (this.startTime + segmentDelay);
        
        // 为分割段重新计算变换，考虑 segmentDelay
        // 对于分割文本，我们需要调整时间来计算正确的动画效果
        const adjustedTime = time - segmentDelay;
        objectTransform = this.getTransformAtTime(adjustedTime);
        
        // 处理 isOffset 动画的偏移效果
        // 对于分割文本，isOffset 动画需要应用到每个分割段上
        let offsetX = 0;
        let offsetY = 0;
        
        for (const animation of this.animations) {
          const animValue = animation.getValueAtTime(adjustedTime);
          
          if (animValue !== null && animation.isOffset) {
            switch (animation.property) {
              case 'x':
                offsetX += animValue;
                break;
              case 'y':
                offsetY += animValue;
                break;
            }
          }
        }
        
        // 使用原始位置加上偏移，因为分割文本的位置已经计算好了
        objectLeft = originalLeft + offsetX;
        objectTop = originalTop + offsetY;
      } else {
        // 普通文本：使用动画计算后的位置，而不是静态位置
        // 因为 originalLeft/originalTop 是相对于文本起始位置的偏移，而普通文本只有一个对象
        objectLeft = transform.x;
        objectTop = transform.y;
      }
      
      // 应用变换到 Fabric 对象
      // 对于 split 文本，需要将 segmentProgress（fabricObject.opacity）与动画效果（objectTransform.opacity）相乘
      let finalOpacity = objectTransform.opacity;
      if (isSplitText && fabricObject.opacity !== undefined) {
        // 将 segmentProgress（fabricObject.opacity）与动画效果（objectTransform.opacity）相乘
        // 这样既保留了分割进度，又应用了动画效果
        finalOpacity = fabricObject.opacity * objectTransform.opacity;
      }
      
      fabricObject.set({
        left: objectLeft,
        top: objectTop,
        scaleX: objectTransform.scaleX,
        scaleY: objectTransform.scaleY,
        angle: objectTransform.rotation,
        opacity: finalOpacity,
        rotationX: objectTransform.rotationX,
        rotationY: objectTransform.rotationY,
        translateZ: objectTransform.translateZ,
        originX: originalOriginX,
        originY: originalOriginY
      });
      
      return {
        type,
        fabricObject,
        left: objectLeft,
        top: objectTop
      };
    }).filter(obj => obj !== null); // 过滤掉 null 对象
    
    return {
      objects: processedObjects,
      width,
      height,
      x: positionProps.left,
      y: positionProps.top,
      scaleX: transform.scaleX,
      scaleY: transform.scaleY,
      rotation: transform.rotation,
      opacity: transform.opacity,
      rotationX: transform.rotationX,
      rotationY: transform.rotationY,
      translateZ: transform.translateZ,
      originX: positionProps.originX,
      originY: positionProps.originY,
      isObjectArray: true // 标记为对象数组
    };
  }

  /**
   * 解析字体大小，支持多种单位
   * @param {string|number} value - 字体大小值
   * @param {number} width - 容器宽度
   * @param {number} height - 容器高度
   * @returns {number} 解析后的像素值
   */
  static parseFontSize(value, width, height) {
    if (typeof value === 'number') {
      return value;
    }
    
    if (typeof value === 'string') {
      // 提取数值和单位
      const match = value.match(/^([+-]?\d*\.?\d+)([a-zA-Z%]*)$/);
      if (!match) {
        return 72; // 默认字体大小
      }
      
      const numValue = parseFloat(match[1]);
      const valueUnit = match[2] || 'px';
      
      switch (valueUnit) {
        case 'px':
          return numValue;
        case 'rpx':
          // rpx单位：基于屏幕宽度的响应式像素单位
          // 通常以750rpx为基准宽度，转换为实际像素
          const baseWidth = 750; // 基准宽度（通常是设计稿宽度）
          return (numValue / baseWidth) * width;
        case '%':
          // 百分比基于最小尺寸
          return (numValue / 100) * Math.min(width, height);
        case 'vw':
          // 视口宽度单位
          return (numValue / 100) * width;
        case 'vh':
          // 视口高度单位
          return (numValue / 100) * height;
        case 'vmin':
          // 视口最小单位
          return (numValue / 100) * Math.min(width, height);
        case 'vmax':
          // 视口最大单位
          return (numValue / 100) * Math.max(width, height);
        default:
          return numValue;
      }
    }
    
    return 72; // 默认字体大小
  }

  /**
   * 处理字体注册
   * @param {Object} config - 字体配置
   * @param {number} width - 容器宽度
   * @param {number} height - 容器高度
   * @returns {Promise<Object>} 字体处理结果
   */
  static async processFont(config, width, height) {
    const { fontPath, fontFamily, fontSize = 72 } = config;
    
    // 处理字体注册
    let finalFontFamily = fontFamily || 'Arial';
    
    // 如果指定了字体路径，使用自定义字体文件
    if (fontPath) {
      // 使用文件名（不含扩展名）作为字体族名
      const fontName = basename(fontPath, extname(fontPath));
      if (!loadedFonts.includes(fontName)) {
        try {
          registerFont(fontPath, { 
            family: fontName, 
            weight: "regular", 
            style: "normal" 
          });
          loadedFonts.push(fontName);
          console.log(`✓ 字体已注册: ${fontPath} -> ${fontName}`);
          finalFontFamily = fontName;
        } catch (error) {
          console.warn(`字体注册失败: ${fontPath}，使用默认字体`, error.message);
          // 尝试使用默认中文字体作为回退
          try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const fallbackFont = resolve(__dirname, '../fonts/PatuaOne-Regular.ttf');
            const fallbackFontName = basename(fallbackFont, extname(fallbackFont));
            if (!loadedFonts.includes(fallbackFontName)) {
              registerFont(fallbackFont, { 
                family: fallbackFontName, 
                weight: "normal", 
                style: "normal" 
              });
              loadedFonts.push(fallbackFontName);
            }
            finalFontFamily = fallbackFontName;
          } catch (fallbackError) {
            console.warn(`默认字体也注册失败，使用系统默认字体`, fallbackError.message);
            finalFontFamily = 'Arial';
          }
        }
      } else {
        finalFontFamily = fontName;
      }
    } else if (fontFamily) {
      // 如果指定了 fontFamily，直接使用（不再查找系统字体）
      finalFontFamily = fontFamily;
    } else {
      // 如果没有指定字体路径和字体族名，使用默认中文字体
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const defaultChineseFont = resolve(__dirname, '../fonts/PatuaOne-Regular.ttf');
      try {
        const fontName = basename(defaultChineseFont, extname(defaultChineseFont));
        if (!loadedFonts.includes(fontName)) {
          registerFont(defaultChineseFont, { 
            family: fontName, 
            weight: "normal", 
            style: "normal" 
          });
          loadedFonts.push(fontName);
          console.log(`✓ 默认中文字体已注册: ${defaultChineseFont} -> ${fontName}`);
          finalFontFamily = fontName;
        } else {
          finalFontFamily = fontName;
        }
      } catch (error) {
        console.warn(`默认中文字体注册失败: ${defaultChineseFont}，使用系统默认字体`, error.message);
        finalFontFamily = 'Arial'; // 最后回退到系统默认字体
      }
    }
    
    // 处理字体大小，支持多种单位
    const finalFontSize = Math.round(this.parseFontSize(fontSize, width, height));
    
    return {
      fontFamily: finalFontFamily,
      fontSize: finalFontSize
    };
  }
}
