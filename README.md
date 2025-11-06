# FKVideo - 基于 JSON 配置结构的视频制作库

[![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)](https://github.com/your-username/FKVideo)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

基于 JSON 结构化的视频制作库，采用技术架构 **Canvas + Fabric + FFmpeg + Node.js** 以实现方便快捷的视频制作。支持多轨道、多场景、丰富的动画效果和过渡效果。

## ✨ 主要特性

- 🎬 **JSON 配置** - 使用简洁的 JSON 配置创建复杂视频
- 🎨 **多种元素类型** - 支持视频、图像、文本、形状、音频等元素
- 📡 **音频示波器** - 支持波形、频谱、条形图等多种音频可视化效果
- ✨ **丰富动画系统** - 内置多种缓动函数和动画效果，支持预设动画
- 🚀 **高性能渲染** - 基于 Canvas 和 FFmpeg 的高效渲染
- 📱 **灵活布局** - 支持绝对定位和相对定位
- 🎭 **过渡效果** - 内置淡入淡出、滑动、缩放等过渡效果
- 🎯 **多轨道支持** - 支持多轨道多场景的复杂视频制作
- 🔧 **链式API** - 提供便捷的链式调用API
- 🌍 **中文字体支持** - 完善的中文字体和文本处理

## 🚀 快速开始

### 安装

```bash
npm install
```

### 基础使用

```javascript
import { VideoMaker } from "./index.js";

const videoMaker = new VideoMaker({
  outPath: "output.mp4",
  width: 1920,
  height: 1080,
  fps: 30,
  elements: [
    {
      type: "text",
      text: "Hello World!",
      font: "48px Arial",
      fillColor: "#ffffff",
      duration: 5,
      x: 960,
      y: 540,
      textAlign: "center",
      animations: [
        {
          property: "opacity",
          from: 0,
          to: 1,
          duration: 1,
          easing: "easeIn"
        }
      ]
    }
  ]
});

await videoMaker.start();
```

### 多轨道构建器使用

```javascript
import { createMultiTrackBuilder } from "./index.js";

const builder = createMultiTrackBuilder({
  width: 1920,
  height: 1080,
  fps: 30,
  outPath: "output/multi-track-video.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 创建场景
const scene1 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "场景1",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '50%',
    textAlign: 'center'
  })
  .addAnimation('fadeIn', { duration: 2 });

const scene2 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#4ecdc4" })
  .addText({
    text: "场景2",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '50%',
    textAlign: 'center'
  })
  .addAnimation('slideInLeft', { duration: 2 });

// 渲染视频
const outputPath = await builder.render();
```

## 📚 元素类型

### 视频元素 (VideoElement)

```javascript
{
  type: "video",
  source: "path/to/video.mp4",
  duration: 5,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  fit: "cover" // cover, contain, fill, scale-down, none
}
```

### 图像元素 (ImageElement)

```javascript
{
  type: "image",
  source: "path/to/image.jpg",
  duration: 5,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  fit: "cover"
}
```

### 文本元素 (TextElement)

```javascript
{
  type: "title",
  text: "Hello World!",
  font: "48px Arial",
  textColor: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 2,
  textAlign: "center",
  duration: 5,
  x: 960,
  y: 540,
  // 文本分割动画
  split: "word", // word, character, line
  splitDelay: 0.1,
  splitDuration: 0.5
}
```

### 字幕元素 (SubtitleElement)

```javascript
{
  type: "subtitle",
  text: "字幕内容",
  textColor: "#ffffff",
  fontSize: 24,
  x: "50%",
  y: "80%",
  textAlign: "center",
  backgroundColor: "rgba(0,0,0,0.7)",
  backgroundPadding: 10,
  backgroundRadius: 5,
  duration: 5
}
```

### 形状元素 (ShapeElement)

```javascript
{
  type: "shape",
  shape: "rectangle", // rectangle, circle, triangle
  fillColor: "#ff0000",
  strokeColor: "#000000",
  strokeWidth: 2,
  shapeWidth: 200,
  shapeHeight: 100,
  duration: 5,
  x: 100,
  y: 100
}
```

### 音频元素 (AudioElement)

```javascript
{
  type: "audio",
  source: "path/to/audio.mp3",
  volume: 1,
  duration: 5,
  startTime: 0,
  loop: false,
  fadeIn: 0.5,
  fadeOut: 0.5
}
```

### 音频可视化元素 (AudioVisualizerElement)

音频可视化元素可以实时显示音频波形、频谱等效果，支持多种可视化类型：

```javascript
{
  type: "audioVisualizer",
  audioFile: "path/to/audio.mp3",
  visualizerType: "waveform", // waveform, spectrum, bars, circle
  x: "50%",
  y: "50%",
  width: "1800px",
  height: "400px",
  color: "#00ff00",
  backgroundColor: "rgba(0, 255, 0, 0.05)",
  lineWidth: 3,
  sensitivity: 4.0,
  duration: 10,
  cutFrom: 0,
  cutTo: 10
}
```

**可视化类型：**
- `waveform` - 示波器波形显示（经典绿色波形，带网格线）
- `spectrum` - 频谱分析显示（线性频谱）
- `bars` - 频谱条形图（垂直条形显示）
- `circle` - 圆形频谱（径向显示）

**主要参数：**
- `audioFile` / `source` - 音频文件路径
- `visualizerType` - 可视化类型
- `color` - 波形/频谱颜色
- `backgroundColor` - 背景颜色（可选）
- `lineWidth` - 线条宽度
- `sensitivity` - 灵敏度倍数（控制波形/频谱的显示幅度）
- `cutFrom` / `cutTo` - 音频截取时间范围（秒）

### 组合元素 (CompositionElement)

```javascript
{
  type: "composition",
  duration: 5,
  elements: [
    {
      type: "text",
      text: "组合文本",
      duration: 5
    }
  ]
}
```

## 🎨 动画系统

### 支持的动画属性

- `x`, `y` - 位置
- `scaleX`, `scaleY` - 缩放
- `rotation` - 旋转
- `opacity` - 透明度
- `width`, `height` - 尺寸

### 支持的缓动函数

- `linear` - 线性
- `easeIn` - 缓入
- `easeOut` - 缓出
- `easeInOut` - 缓入缓出
- `bounce` - 弹跳
- `elastic` - 弹性
- `back` - 回弹

### 基础动画配置

```javascript
{
  animations: [
    {
      property: "opacity",
      from: 0,
      to: 1,
      duration: 1,
      startTime: 0,
      easing: "easeIn"
    }
  ]
}
```

### 预设动画

FKVideo 提供了丰富的预设动画，可以直接使用：

```javascript
// 使用预设动画
.addAnimation('fadeIn', { duration: 2 })
.addAnimation('slideInLeft', { duration: 1.5 })
.addAnimation('zoomIn', { duration: 1 })

// 覆盖预设参数
.addAnimation('fadeIn', { 
  duration: 3, 
  delay: 0.5, 
  easing: 'easeOut' 
})
```

#### 可用的预设动画

**淡入淡出类:**
- `fadeIn` - 淡入
- `fadeOut` - 淡出
- `fadeInUp` - 从下方淡入
- `fadeInDown` - 从上方淡入
- `fadeInLeft` - 从左侧淡入
- `fadeInRight` - 从右侧淡入

**滑动类:**
- `slideInLeft` - 从左侧滑入
- `slideInRight` - 从右侧滑入
- `slideInUp` - 从上方滑入
- `slideInDown` - 从下方滑入
- `slideOutLeft` - 向左侧滑出
- `slideOutRight` - 向右侧滑出

**缩放类:**
- `zoomIn` - 缩放进入
- `zoomOut` - 缩放退出
- `zoomInUp` - 缩放进入（向上）
- `zoomInDown` - 缩放进入（向下）

**旋转类:**
- `rotateIn` - 旋转进入
- `rotateOut` - 旋转退出
- `flipInX` - X轴翻转进入
- `flipInY` - Y轴翻转进入

**弹跳类:**
- `bounceIn` - 弹跳进入
- `bounceOut` - 弹跳退出
- `bounceInUp` - 弹跳进入（向上）
- `bounceInDown` - 弹跳进入（向下）

## 🎭 过渡效果

### 支持的过渡效果

- `fade` - 淡入淡出
- `slideLeft` - 向左滑动
- `slideRight` - 向右滑动
- `slideUp` - 向上滑动
- `slideDown` - 向下滑动
- `zoomIn` - 缩放进入
- `zoomOut` - 缩放退出
- `rotate` - 旋转
- `flip` - 翻转
- `dissolve` - 溶解
- `wipeLeft` - 向左擦除
- `wipeRight` - 向右擦除
- `wipeUp` - 向上擦除
- `wipeDown` - 向下擦除

### 使用过渡效果

```javascript
{
  transition: {
    duration: 1,
    name: "fade",
    easing: "easeInOut"
  }
}
```

## 🎯 多轨道构建器

### 创建多轨道视频

```javascript
import { createMultiTrackBuilder } from "./index.js";

const builder = createMultiTrackBuilder({
  width: 1920,
  height: 1080,
  fps: 30,
  outPath: "output/multi-track-video.mp4"
});

// 创建主轨道
const mainTrack = builder.createTrack({ 
  zIndex: 1,
  duration: 10 
});

// 创建场景
const scene1 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "场景1",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '50%',
    textAlign: 'center'
  })
  .addAnimation('fadeIn', { duration: 2 });

const scene2 = mainTrack.createScene({ duration: 5 })
  .addBackground({ color: "#4ecdc4" })
  .addText({
    text: "场景2",
    textColor: "#ffffff",
    fontSize: 48,
    x: '50%',
    y: '50%',
    textAlign: 'center'
  })
  .addAnimation('slideInLeft', { duration: 2 });

// 添加过渡效果
builder.addTransition('fade', { duration: 1 });

// 渲染视频
const outputPath = await builder.render();
```

### 轨道和场景方法

#### 轨道方法

```javascript
const track = builder.createTrack({ zIndex: 1 });

// 添加元素
track.addBackground({ color: "#ff6b6b" })
     .addImage({ source: "image.jpg" })
     .addText({ text: "Hello" })
     .addSubtitle({ text: "字幕" })
     .addShape({ shape: "circle" })
     .addAudio({ source: "audio.mp3" })
     .addAudioVisualizer({ audioFile: "audio.mp3", visualizerType: "waveform" });

// 创建场景
const scene = track.createScene({ duration: 5 });

// 设置属性
track.setDuration(10)
     .setPosition('50%', '50%')
     .setSize('100%', '100%')
     .setZIndex(2);
```

#### 场景方法

```javascript
const scene = track.createScene({ duration: 5 });

// 添加元素
scene.addBackground({ color: "#ff6b6b" })
     .addText({ text: "场景文本" })
     .addAudioVisualizer({ audioFile: "audio.mp3", visualizerType: "waveform" })
     .addAnimation('fadeIn', { duration: 2 });

// 设置属性
scene.setDuration(8)
     .setPosition('50%', '50%')
     .setSize('100%', '100%');
```

## 🎨 动画构建器

### 使用动画构建器

```javascript
import { createAnimationBuilder, quickAnimation } from "./index.js";

// 快速创建动画
const fadeIn = quickAnimation('opacity', 0, 1, 2, 'easeIn');

// 使用构建器
const builder = createAnimationBuilder()
  .property('opacity')
  .from(0)
  .to(1)
  .duration(2)
  .easing('easeIn')
  .delay(0.5)
  .build();

// 应用到元素
element.animations = [fadeIn];
```

### 预设构建器

```javascript
import { createPresetBuilder, quickPreset } from "./index.js";

// 快速创建预设
const fadeInPreset = quickPreset('fadeIn', { duration: 3 });

// 使用预设构建器
const presetBuilder = createPresetBuilder()
  .name('customFadeIn')
  .property('opacity')
  .from(0)
  .to(1)
  .duration(2)
  .easing('easeIn')
  .build();
```

## 📝 示例

### 运行示例

```bash
# 基础示例
npm run example:basic

# 高级示例
npm run example:advanced

# Creatomate 风格示例
npm run example:creatomate

# 多轨道示例
npm run demo:custom-animation

# 背景颜色演示
npm run demo:background-colors
```

### 示例文件

- `examples/basic-example.js` - 基础使用示例
- `examples/advanced-example.js` - 高级功能示例
- `examples/creatomate-style-example.js` - Creatomate 风格示例
- `examples/custom-animation-demo.js` - 自定义动画演示
- `examples/background-colors-demo.js` - 背景颜色演示
- `examples/music-oscilloscope-video.js` - 音频示波器视频制作示例
- `examples/test-audio-visualizer.js` - 音频可视化测试示例
- `examples/test-full-oscilloscope.js` - 完整示波器效果演示

## 🔧 API 参考

### VideoMaker

主要的视频制作类。

#### 构造函数

```javascript
new VideoMaker(config)
```

**参数：**
- `config.outPath` - 输出文件路径
- `config.width` - 视频宽度
- `config.height` - 视频高度
- `config.fps` - 帧率
- `config.duration` - 视频总时长
- `config.elements` - 元素数组
- `config.transitions` - 过渡效果数组

#### 方法

- `start()` - 开始渲染视频
- `close()` - 关闭资源

#### 事件

- `start` - 开始渲染
- `progress` - 渲染进度
- `complete` - 渲染完成
- `error` - 渲染错误

### MultiTrackBuilder

多轨道构建器。

#### 方法

- `createTrack(config)` - 创建轨道
- `createScene(config)` - 创建场景
- `addTransition(transition)` - 添加过渡效果
- `render()` - 渲染视频

### Track

轨道类。

#### 方法

- `addBackground(config)` - 添加背景
- `addImage(config)` - 添加图片
- `addText(config)` - 添加文本
- `addSubtitle(config)` - 添加字幕
- `addShape(config)` - 添加形状
- `addAudio(config)` - 添加音频
- `addAudioVisualizer(config)` - 添加音频可视化（示波器）
- `addAnimation(animations, overrides)` - 添加动画
- `createScene(config)` - 创建场景

### Scene

场景类。

#### 方法

- `addBackground(config)` - 添加背景
- `addImage(config)` - 添加图片
- `addText(config)` - 添加文本
- `addSubtitle(config)` - 添加字幕
- `addShape(config)` - 添加形状
- `addAudioVisualizer(config)` - 添加音频可视化（示波器）
- `addAnimation(animations, overrides)` - 添加动画

## 📡 音频示波器功能

FKVideo 支持强大的音频可视化功能，可以创建专业的音频示波器效果视频。

### 快速开始

```javascript
import { createMultiTrackBuilder } from "./index.js";

const builder = createMultiTrackBuilder({
  width: 1920,
  height: 1080,
  fps: 30,
  outPath: "output/oscilloscope-video.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

const scene = mainTrack.createScene({ duration: 10 })
  .addBackground({ color: "#000000" })
  
  // 主示波器波形
  .addAudioVisualizer({
    audioFile: "assets/music.mp3",
    visualizerType: 'waveform',
    x: "50%",
    y: "45%",
    width: "1800px",
    height: "400px",
    color: "#00ff00",  // 经典示波器绿色
    backgroundColor: "rgba(0, 255, 0, 0.05)",
    lineWidth: 3,
    sensitivity: 4.0,
    duration: 10
  })
  
  // 频谱分析
  .addAudioVisualizer({
    audioFile: "assets/music.mp3",
    visualizerType: 'spectrum',
    x: "50%",
    y: "70%",
    width: "1800px",
    height: "200px",
    color: "#00ffff",
    lineWidth: 2,
    sensitivity: 6.0,
    duration: 10
  })
  
  // 频谱条形图
  .addAudioVisualizer({
    audioFile: "assets/music.mp3",
    visualizerType: 'bars',
    x: "50%",
    y: "85%",
    width: "1600px",
    height: "150px",
    color: "#ff6b6b",
    barWidth: 10,
    barSpacing: 3,
    maxBars: 60,
    sensitivity: 8.0,
    duration: 10
  })
  
  // 添加音频
  .addAudio({
    source: "assets/music.mp3",
    volume: 0.9,
    duration: 10
  });

const outputPath = await builder.render();
```

### 示波器类型

#### 1. 波形示波器 (waveform)

经典示波器效果，显示音频波形，带网格线和中心基准线：

```javascript
.addAudioVisualizer({
  audioFile: "audio.mp3",
  visualizerType: 'waveform',
  width: "1800px",
  height: "400px",
  color: "#00ff00",  // 绿色
  lineWidth: 3,
  sensitivity: 4.0
})
```

#### 2. 频谱分析 (spectrum)

线性频谱显示，实时分析音频频率：

```javascript
.addAudioVisualizer({
  audioFile: "audio.mp3",
  visualizerType: 'spectrum',
  width: "1800px",
  height: "200px",
  color: "#00ffff",  // 青色
  lineWidth: 2,
  sensitivity: 6.0
})
```

#### 3. 频谱条形图 (bars)

垂直条形显示，支持自定义条形数量和间距：

```javascript
.addAudioVisualizer({
  audioFile: "audio.mp3",
  visualizerType: 'bars',
  width: "1600px",
  height: "150px",
  color: "#ff6b6b",  // 红色
  barWidth: 10,
  barSpacing: 3,
  maxBars: 60,
  sensitivity: 8.0
})
```

#### 4. 圆形频谱 (circle)

径向圆形频谱显示：

```javascript
.addAudioVisualizer({
  audioFile: "audio.mp3",
  visualizerType: 'circle',
  width: "300px",
  height: "300px",
  color: "#ffd93d",  // 黄色
  lineWidth: 3,
  maxBars: 64,
  sensitivity: 5.0
})
```

### 运行示波器示例

```bash
# 使用 music_11.mp3 制作完整示波器视频
node examples/music-oscilloscope-video.js

# 测试音频可视化功能
node examples/test-audio-visualizer.js

# 完整示波器效果演示
node examples/test-full-oscilloscope.js
```

### 性能优化

对于长音频文件（>30秒），系统会自动：
- 降低采样率到 24kHz 以提高性能
- 使用采样间隔减少内存占用
- 优化音频数据提取过程

### 注意事项

1. **音频格式支持**：支持 mp3, m4a, wav, flac, aac, ogg 等格式
2. **处理时间**：长音频文件（>60秒）可能需要较长时间处理
3. **内存使用**：长音频会自动优化以减少内存占用
4. **音频截取**：使用 `cutFrom` 和 `cutTo` 参数可以只处理音频的一部分

## 🛠️ 依赖

- Node.js >= 16.0.0
- FFmpeg
- Canvas
- Fabric.js

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果您在使用过程中遇到问题，请提交 Issue 或联系维护者。

---

**FKVideo** - 让视频制作变得简单而强大！ 🎬✨