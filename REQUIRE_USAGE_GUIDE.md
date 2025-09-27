# FKVideo CommonJS 使用指南

## 概述

FKVideo 支持 CommonJS 模块系统，可以通过 `require()` 函数来使用多轨道构建器功能。

## 基本用法

### 1. 导入模块

```javascript
const { getMultiTrackBuilder, getAnimationPresets } = require("FKVideo");
```

### 2. 异步获取功能

由于 FKVideo 使用 ES6 模块，在 CommonJS 中需要通过异步函数获取具体功能：

```javascript
async function createVideo() {
  // 获取多轨道构建器相关类
  const { 
    createMultiTrackBuilder, 
    MultiTrackBuilder, 
    Track, 
    MultiTrackScene 
  } = await getMultiTrackBuilder();
  
  // 获取动画预设相关函数
  const { 
    getAnimationPreset, 
    AnimationPresets,
    getAnimationPresetNames 
  } = await getAnimationPresets();
  
  // 现在可以使用这些功能了
}
```

## 完整示例

### 简单示例

```javascript
const { getMultiTrackBuilder, getAnimationPresets } = require("FKVideo");

async function createSimpleVideo() {
  // 获取功能
  const { createMultiTrackBuilder } = await getMultiTrackBuilder();
  const { getAnimationPreset } = await getAnimationPresets();
  
  // 创建构建器
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/simple-video.mp4"
  });
  
  // 创建轨道和场景
  const mainTrack = builder.createTrack({ zIndex: 1 });
  const scene = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "Hello World",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  // 渲染视频
  const outputPath = await builder.render();
  console.log(`视频已生成: ${outputPath}`);
}

createSimpleVideo().catch(console.error);
```

### 复杂示例

```javascript
const { getMultiTrackBuilder, getAnimationPresets } = require("FKVideo");

async function createComplexVideo() {
  // 获取所有功能
  const { 
    createMultiTrackBuilder, 
    Track, 
    MultiTrackScene 
  } = await getMultiTrackBuilder();
  
  const { 
    getAnimationPreset, 
    AnimationPresets 
  } = await getAnimationPresets();
  
  // 创建构建器
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/complex-video.mp4"
  });
  
  // 主轨道
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1
  const scene1 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "场景1",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 场景2
  const scene2 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "场景2",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("scaleIn", { duration: 2 })
    .addAnimation("scaleOut", { duration: 1, delay: -1 });
  
  // 字幕轨道
  const subtitleTrack = builder.createTrack({ zIndex: 2 })
    .addSubtitle({
      text: "场景1的字幕",
      duration: 3,
      startTime: 0.5,
      backgroundColor: "rgba(0,0,0,0.7)",
      y: '80%'
    })
    .addSubtitle({
      text: "场景2的字幕",
      duration: 3,
      startTime: 4.5,
      backgroundColor: "rgba(0,0,0,0.7)",
      y: '80%'
    });
  
  // 装饰轨道
  const decorationTrack = builder.createTrack({ zIndex: 3 })
    .addShape({
      shape: "circle",
      width: '40px',
      height: '40px',
      fillColor: "#feca57",
      x: '20%',
      y: '20%',
      duration: 8,
      startTime: 0
    })
    .addAnimation("bounceIn", { duration: 2 });
  
  // 添加过渡效果
  builder.addTransition("fade", { duration: 1, startTime: 3.5 });
  
  // 渲染视频
  const outputPath = await builder.render();
  console.log(`复杂视频已生成: ${outputPath}`);
}

createComplexVideo().catch(console.error);
```

## 可用的异步获取函数

### getMultiTrackBuilder()
返回多轨道构建器相关类：
- `createMultiTrackBuilder` - 创建构建器函数
- `MultiTrackBuilder` - 构建器类
- `Track` - 轨道类
- `MultiTrackScene` - 场景类

### getAnimationPresets()
返回动画预设相关函数：
- `getAnimationPreset` - 获取动画预设
- `getTransitionPreset` - 获取过渡预设
- `AnimationPresets` - 动画预设对象
- `TransitionPresets` - 过渡预设对象
- `getAnimationPresetNames` - 获取动画预设名称列表
- `getTransitionPresetNames` - 获取过渡预设名称列表

## 文件扩展名

使用 CommonJS 时，文件必须使用 `.cjs` 扩展名：

```javascript
// 正确：my-video.cjs
const { getMultiTrackBuilder } = require("FKVideo");

// 错误：my-video.js (会被当作 ES6 模块)
const { getMultiTrackBuilder } = require("FKVideo");
```

## 运行示例

```bash
# 运行 CommonJS 使用示例
npm run example:require-usage

# 运行 CommonJS 测试
npm run test:require
```

## 注意事项

1. **异步加载**：所有功能都需要通过异步函数获取
2. **文件扩展名**：必须使用 `.cjs` 扩展名
3. **错误处理**：记得使用 `.catch()` 处理异步错误
4. **性能**：异步加载会有轻微的性能开销

## 与 ES6 模块的对比

| 特性 | ES6 模块 | CommonJS |
|------|----------|----------|
| 导入方式 | `import { ... } from "FKVideo"` | `const { ... } = require("FKVideo")` |
| 文件扩展名 | `.js` | `.cjs` |
| 功能获取 | 直接使用 | 异步获取 |
| 性能 | 更快 | 稍慢 |
| 兼容性 | 现代环境 | 所有 Node.js 版本 |

## 总结

CommonJS 使用方式虽然需要异步获取功能，但提供了更好的向后兼容性。对于需要支持旧版本 Node.js 或使用传统 CommonJS 工作流的项目，这是一个很好的选择。
