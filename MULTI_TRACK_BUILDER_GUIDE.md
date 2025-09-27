# FKVideo 多轨道构建器使用指南

## 概述

FKVideo 多轨道构建器（MultiTrackBuilder）是一个强大的视频制作工具，支持创建复杂的多轨道、多场景视频。它提供了直观的链式调用API，让视频制作变得更加简单和高效。

## 核心概念

### 层次结构
```
MultiTrackBuilder
├── Track (轨道)
│   ├── Scene (场景)
│   │   ├── Element (元素)
│   │   └── Animation (动画)
│   └── Element (轨道级元素)
└── Transition (过渡效果)
```

### 基本概念
- **轨道 (Track)**: 视频的垂直层，可以包含场景和元素
- **场景 (Scene)**: 时间轴上的片段，包含多个元素
- **元素 (Element)**: 具体的媒体内容（文本、图片、形状等）
- **动画 (Animation)**: 元素或场景的动画效果
- **过渡 (Transition)**: 场景之间的切换效果

## 快速开始

### 1. 基本设置

```javascript
import { createMultiTrackBuilder } from "./utils/MultiTrackBuilder.js";

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/my-video.mp4"
});
```

### 2. 创建简单视频

```javascript
// 创建主轨道
const mainTrack = builder.createTrack({ zIndex: 1 });

// 创建场景
const scene = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "Hello World",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

// 渲染视频
const outputPath = await builder.render();
console.log(`视频已生成: ${outputPath}`);
```

## 详细用法

### 轨道管理

#### 创建轨道
```javascript
// 创建主轨道
const mainTrack = builder.createTrack({ 
  zIndex: 1,
  duration: 10
});

// 创建字幕轨道
const subtitleTrack = builder.createTrack({ 
  zIndex: 2,
  duration: 10
});

// 创建装饰轨道
const decorationTrack = builder.createTrack({ 
  zIndex: 3,
  duration: 10
});
```

#### 轨道方法
```javascript
// 设置轨道属性
track.setDuration(15);
track.setPosition('50%', '50%');
track.setSize('100%', '100%');
track.setZIndex(2);

// 添加元素到轨道
track.addText({ text: "轨道级文本" });
track.addShape({ shape: "circle", fillColor: "#ff0000" });
```

### 场景管理

#### 创建场景
```javascript
// 在轨道中创建场景
const scene = track.createScene({ 
  duration: 4,
  bgcolor: "#ff6b6b"
});

// 直接创建场景（会自动添加到主轨道）
const scene = builder.createScene({ 
  duration: 4,
  bgcolor: "#4ecdc4"
});
```

#### 场景元素
```javascript
const scene = track.createScene({ duration: 5 })
  // 添加背景
  .addBackground({ color: "#ff6b6b" })
  
  // 添加文本
  .addText({
    text: "主标题",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '30%',
    textAlign: 'center'
  })
  
  // 添加副标题
  .addSubtitle({
    text: "副标题内容",
    textColor: "#ffffff",
    fontSize: 24,
    x: '50%',
    y: '60%',
    startTime: 1,
    duration: 3
  })
  
  // 添加图片
  .addImage({
    source: "./assets/image.jpg",
    width: '60%',
    height: 'auto',
    x: '50%',
    y: '50%',
    fit: 'contain'
  })
  
  // 添加形状
  .addShape({
    shape: "circle",
    width: '100px',
    height: '100px',
    fillColor: "#ffffff",
    x: '20%',
    y: '20%'
  });
```

### 动画系统

#### 场景级动画
```javascript
const scene = track.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({ text: "标题", textColor: "#ffffff" })
  
  // 场景淡入
  .addAnimation("fadeIn", { duration: 2 })
  
  // 场景缩放
  .addAnimation("scaleIn", { duration: 1.5, startTime: 1 })
  
  // 场景结束动画
  .addAnimation("fadeOut", { duration: 1, delay: -1 });
```

#### 元素级动画
```javascript
const scene = track.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({ text: "标题", textColor: "#ffffff" })
  .addText({ text: "副标题", textColor: "#ffffff" });

// 为第一个文本元素添加动画
scene.addAnimation(0, "bounceIn", { duration: 2 });

// 为第二个文本元素添加动画
scene.addAnimation(1, "slideInUp", { duration: 1.5, startTime: 1 });
```

#### 动画预设
```javascript
// 淡入淡出
scene.addAnimation("fadeIn", { duration: 2 });
scene.addAnimation("fadeOut", { duration: 1, delay: -1 });

// 缩放效果
scene.addAnimation("scaleIn", { duration: 1.5 });
scene.addAnimation("scaleOut", { duration: 1, delay: -1 });

// 弹跳效果
scene.addAnimation("bounceIn", { duration: 2 });
scene.addAnimation("bounceOut", { duration: 1, delay: -1 });

// 滑动效果
scene.addAnimation("slideInLeft", { duration: 1.5 });
scene.addAnimation("slideInRight", { duration: 1.5 });
scene.addAnimation("slideInUp", { duration: 1.5 });
scene.addAnimation("slideInDown", { duration: 1.5 });

// 旋转效果
scene.addAnimation("rotateIn", { duration: 2 });
scene.addAnimation("rotateOut", { duration: 1, delay: -1 });

// 特殊效果
scene.addAnimation("pulse", { duration: 0.5, startTime: 2 });
scene.addAnimation("wobble", { duration: 1, startTime: 3 });
```

### 过渡效果

```javascript
// 添加场景间过渡
builder.addTransition("fade", { 
  duration: 1, 
  startTime: 3.5 
});

builder.addTransition("slideLeft", { 
  duration: 1.5, 
  startTime: 7.5 
});

// 使用预设过渡
builder.addTransition("fade", { duration: 1, startTime: 4 });
builder.addTransition("slideLeft", { duration: 1, startTime: 8 });
builder.addTransition("zoomIn", { duration: 1, startTime: 12 });
```

## 完整示例

### 示例1：简单多场景视频

```javascript
import { createMultiTrackBuilder } from "./utils/MultiTrackBuilder.js";

async function createSimpleVideo() {
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/simple-video.mp4"
  });

  // 创建主轨道
  const mainTrack = builder.createTrack({ zIndex: 1 });

  // 场景1：标题页
  const titleScene = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "欢迎观看",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });

  // 场景2：内容页
  const contentScene = mainTrack.createScene({ duration: 5 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "主要内容",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addSubtitle({
      text: "这是副标题内容",
      textColor: "#ffffff",
      fontSize: 24,
      x: '50%',
      y: '60%',
      startTime: 1,
      duration: 3
    })
    .addAnimation("scaleIn", { duration: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });

  // 添加过渡效果
  builder.addTransition("fade", { duration: 1, startTime: 2.5 });

  // 渲染视频
  const outputPath = await builder.render();
  console.log(`视频已生成: ${outputPath}`);
}

createSimpleVideo().catch(console.error);
```

### 示例2：复杂多轨道视频

```javascript
import { createMultiTrackBuilder } from "./utils/MultiTrackBuilder.js";

async function createComplexVideo() {
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/complex-video.mp4"
  });

  // 主轨道 - 内容
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
    .addAnimation("bounceIn", { duration: 2 })
    .addShape({
      shape: "rect",
      width: '60px',
      height: '30px',
      fillColor: "#ff9ff3",
      x: '80%',
      y: '80%',
      duration: 8,
      startTime: 0
    })
    .addAnimation("slideInRight", { duration: 2, startTime: 2 });

  // 添加过渡效果
  builder.addTransition("fade", { duration: 1, startTime: 3.5 });

  // 渲染视频
  const outputPath = await builder.render();
  console.log(`复杂视频已生成: ${outputPath}`);
}

createComplexVideo().catch(console.error);
```

## 高级用法

### 自定义动画

```javascript
// 自定义动画配置
scene.addAnimation({
  property: 'opacity',
  from: 0,
  to: 1,
  duration: 2,
  startTime: 0,
  easing: 'easeInOut'
});

// 组合动画
scene.addAnimation([
  {
    property: 'opacity',
    from: 0,
    to: 1,
    duration: 1,
    startTime: 0
  },
  {
    property: 'scaleX',
    from: 0,
    to: 1,
    duration: 1,
    startTime: 0
  }
]);
```

### 时间控制

```javascript
// 使用 startTime 控制动画开始时间
scene.addAnimation("fadeIn", { 
  duration: 2, 
  startTime: 1  // 第1秒开始
});

// 使用 delay 控制延迟
scene.addAnimation("fadeIn", { 
  duration: 2, 
  delay: 1  // 延迟1秒开始
});

// 场景结束动画
scene.addAnimation("fadeOut", { 
  duration: 1, 
  delay: -1  // 场景结束前1秒开始
});
```

### 元素定位

```javascript
// 使用百分比定位
.addText({
  text: "居中文本",
  x: '50%',  // 水平居中
  y: '50%'   // 垂直居中
})

// 使用像素定位
.addText({
  text: "固定位置文本",
  x: '100px',
  y: '200px'
})

// 使用视口单位
.addText({
  text: "响应式文本",
  x: '50vw',  // 视口宽度的50%
  y: '50vh'   // 视口高度的50%
})
```

## 最佳实践

### 1. 场景规划
- 合理规划场景时长
- 使用过渡效果连接场景
- 保持场景内容的一致性

### 2. 动画使用
- 适度使用动画，避免过度
- 使用场景级动画实现整体效果
- 使用元素级动画实现细节效果

### 3. 性能优化
- 避免过多的同时动画
- 合理设置动画时长
- 使用预设动画提高效率

### 4. 代码组织
- 使用链式调用提高可读性
- 合理分组相关元素
- 添加注释说明复杂逻辑

## 常见问题

### Q: 如何实现场景循环？
A: 可以通过重复创建相同配置的场景来实现。

### Q: 如何控制动画的执行顺序？
A: 使用 `startTime` 或 `delay` 参数来控制动画的执行时间。

### Q: 如何实现复杂的布局？
A: 使用多个轨道和元素，通过 `x`、`y`、`width`、`height` 参数精确控制位置。

### Q: 如何调试动画效果？
A: 使用 `console.log` 输出动画配置，或创建简化的测试场景。

## 总结

FKVideo 多轨道构建器提供了强大而灵活的视频制作能力。通过合理的轨道规划、场景设计和动画应用，可以创建出专业级的视频内容。掌握这些基本概念和用法，您就能轻松制作出各种复杂的视频效果。
