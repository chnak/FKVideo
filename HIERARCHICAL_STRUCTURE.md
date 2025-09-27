# 层次结构说明

## 概述

FKVideo采用清晰的层次结构：**轨道 -> 场景 -> 元素**

这种结构让视频制作更加直观和灵活，符合专业视频编辑软件的设计理念。

## 层次结构详解

### 🎵 轨道 (Track)
**轨道是最高级别的容器，可以包含场景和元素**

#### 特点：
- 轨道可以包含**场景**和**元素**
- 用于组织不同层级的内容
- 每个轨道有独立的zIndex（层级）
- 支持链式调用

#### 轨道可以包含：
- ✅ 场景 (Scene)
- ✅ 元素 (Element) - 背景、文本、图片、形状、音频等

#### 示例：
```javascript
const track = builder.createTrack({ zIndex: 2 })
  .setDuration(15)
  .addShape({  // 直接添加元素
    shape: "rect",
    width: '100%',
    height: '4px',
    fillColor: "#00d4ff"
  })
  .createScene({ duration: 5 })  // 创建场景
    .addBackground({ color: "#1a1a2e" })
    .addText({ text: "场景标题" });
```

### 🎬 场景 (Scene)
**场景是时间轴上的时间段，只能包含元素**

#### 特点：
- 场景只能包含**元素**
- 用于时间轴上的不同时间段
- 每个场景有独立的持续时间
- 支持链式调用

#### 场景可以包含：
- ✅ 元素 (Element) - 背景、文本、图片、形状等
- ❌ 不能包含其他场景

#### 示例：
```javascript
const scene = builder.createScene({ duration: 5 })
  .addBackground({ color: "#1a1a2e" })
  .addText({
    text: "标题",
    textColor: "#ffffff",
    fontSize: 48
  })
  .addSubtitle({
    text: "副标题",
    textColor: "#00d4ff",
    fontSize: 20
  })
  .addShape({
    shape: "circle",
    width: '50px',
    height: '50px',
    fillColor: "#ff5722"
  });
```

### 🎨 元素 (Element)
**元素是具体的媒体内容，不能包含其他元素**

#### 特点：
- 不能包含其他元素
- 是具体的媒体内容
- 有独立的属性和动画

#### 元素类型：
- `background` - 背景
- `image` - 图片
- `text` - 文本
- `subtitle` - 字幕
- `shape` - 形状
- `audio` - 音频（仅轨道可包含）
- `video` - 视频

## 使用示例

### 基础层次结构
```javascript
import { createMultiTrackBuilder } from "./utils/MultiTrackBuilder.js";

const builder = createMultiTrackBuilder({
  width: 1920,
  height: 1080,
  fps: 30,
  outPath: "output/video.mp4"
});

// 创建主轨道 - 包含场景
const mainTrack = builder.createTrack({ zIndex: 1 })
  .setDuration(10);

// 在轨道中创建场景1
const scene1 = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#1a1a2e" })
  .addText({
    text: "场景1",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

// 在轨道中创建场景2
const scene2 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#2196f3" })
  .addText({
    text: "场景2",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

// 创建装饰轨道 - 包含元素
const decorationTrack = builder.createTrack({ zIndex: 2 })
  .setDuration(10)
  .addShape({
    shape: "rect",
    width: '100%',
    height: '4px',
    x: '50%',
    y: '8%',
    fillColor: "#00d4ff"
  })
  .addShape({
    shape: "circle",
    width: '40px',
    height: '40px',
    x: '10%',
    y: '20%',
    fillColor: "#ff5722"
  });

// 渲染视频
await builder.render();
```

### 复杂层次结构
```javascript
// 创建多个轨道
const mainTrack = builder.createTrack({ zIndex: 1 })
  .setDuration(15);

const decorationTrack = builder.createTrack({ zIndex: 2 })
  .setDuration(15);

const subtitleTrack = builder.createTrack({ zIndex: 3 })
  .setDuration(15);

const audioTrack = builder.createTrack({ zIndex: 0 })
  .setDuration(15);

// 主轨道包含多个场景
const scene1 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#1a1a2e" })
  .addText({ text: "场景1" })
  .addImage({ source: "image1.jpg" });

const scene2 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#2196f3" })
  .addText({ text: "场景2" })
  .addShape({ shape: "circle" });

const scene3 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#4caf50" })
  .addText({ text: "场景3" })
  .addSubtitle({ text: "字幕" });

// 装饰轨道包含元素
decorationTrack
  .addShape({ shape: "rect", width: '100%', height: '4px' })
  .addShape({ shape: "circle", width: '40px', height: '40px' });

// 字幕轨道包含元素
subtitleTrack
  .addSubtitle({ text: "欢迎观看", startTime: 1, duration: 3 })
  .addSubtitle({ text: "感谢支持", startTime: 8, duration: 3 });

// 音频轨道包含元素
audioTrack
  .addAudio({ source: "background.mp3", volume: 0.5, loop: true });
```

## 链式调用支持

### 轨道链式调用
```javascript
const track = builder.createTrack({ zIndex: 2 })
  .setDuration(15)
  .addShape({ shape: "rect" })
  .addAudio({ source: "bg.mp3" })
  .createScene({ duration: 5 })
    .addBackground({ color: "#000" })
    .addText({ text: "标题" });
```

### 场景链式调用
```javascript
const scene = builder.createScene({ duration: 5 })
  .addBackground({ color: "#1a1a2e" })
  .addText({ text: "标题" })
  .addSubtitle({ text: "副标题" })
  .addShape({ shape: "circle" })
  .setDuration(6)
  .setZIndex(2);
```

## 最佳实践

### 1. 合理规划轨道层级
- **背景轨道**: zIndex = 0
- **主内容轨道**: zIndex = 1
- **装饰轨道**: zIndex = 2
- **字幕轨道**: zIndex = 3
- **特效轨道**: zIndex = 4

### 2. 场景时间规划
- 确保场景时间不重叠
- 合理设置过渡效果
- 考虑场景切换的流畅性

### 3. 元素组织
- 相关元素放在同一场景中
- 全局元素放在轨道中
- 音频元素通常放在独立轨道中

### 4. 性能优化
- 避免过多嵌套
- 合理使用动画
- 优化图片和音频资源

## 运行示例

```bash
# 层次结构演示
npm run example:hierarchical

# 简化层次结构演示
npm run example:simple-hierarchical

# 链式调用演示
npm run example:chainable-scene
npm run example:chainable-track
```

## 总结

FKVideo的层次结构设计清晰直观：

- **轨道** 是最高级别的容器，可以包含场景和元素
- **场景** 是时间轴上的时间段，只能包含元素
- **元素** 是具体的媒体内容，不能包含其他元素

这种设计让视频制作更加灵活和直观，支持复杂的多轨道多场景视频制作。
