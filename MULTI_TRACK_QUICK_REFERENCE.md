# FKVideo 多轨道构建器快速参考

## 基本用法

```javascript
import { createMultiTrackBuilder } from "./utils/MultiTrackBuilder.js";

// 创建构建器
const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/video.mp4"
});

// 创建轨道
const track = builder.createTrack({ zIndex: 1 });

// 创建场景
const scene = track.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({ text: "标题", textColor: "#ffffff" })
  .addAnimation("fadeIn", { duration: 2 });

// 渲染
const outputPath = await builder.render();
```

## 元素类型

### 背景
```javascript
.addBackground({ color: "#ff6b6b" })
```

### 文本
```javascript
.addText({
  text: "内容",
  textColor: "#ffffff",
  fontSize: 24,
  x: '50%',
  y: '50%',
  textAlign: 'center'
})
```

### 字幕
```javascript
.addSubtitle({
  text: "字幕内容",
  textColor: "#ffffff",
  fontSize: 20,
  x: '50%',
  y: '80%',
  startTime: 1,
  duration: 3
})
```

### 图片
```javascript
.addImage({
  source: "./assets/image.jpg",
  width: '60%',
  height: 'auto',
  x: '50%',
  y: '50%',
  fit: 'contain'
})
```

### 形状
```javascript
.addShape({
  shape: "circle",  // rect, circle, triangle
  width: '100px',
  height: '100px',
  fillColor: "#ffffff",
  x: '50%',
  y: '50%'
})
```

## 动画预设

### 淡入淡出
```javascript
.addAnimation("fadeIn", { duration: 2 })
.addAnimation("fadeOut", { duration: 1, delay: -1 })
```

### 缩放
```javascript
.addAnimation("scaleIn", { duration: 1.5 })
.addAnimation("scaleOut", { duration: 1, delay: -1 })
```

### 弹跳
```javascript
.addAnimation("bounceIn", { duration: 2 })
.addAnimation("bounceOut", { duration: 1, delay: -1 })
```

### 滑动
```javascript
.addAnimation("slideInLeft", { duration: 1.5 })
.addAnimation("slideInRight", { duration: 1.5 })
.addAnimation("slideInUp", { duration: 1.5 })
.addAnimation("slideInDown", { duration: 1.5 })
```

### 旋转
```javascript
.addAnimation("rotateIn", { duration: 2 })
.addAnimation("rotateOut", { duration: 1, delay: -1 })
```

### 特殊效果
```javascript
.addAnimation("pulse", { duration: 0.5, startTime: 2 })
.addAnimation("wobble", { duration: 1, startTime: 3 })
```

## 时间控制

### 使用 startTime
```javascript
.addAnimation("fadeIn", { 
  duration: 2, 
  startTime: 1  // 第1秒开始
})
```

### 使用 delay
```javascript
.addAnimation("fadeIn", { 
  duration: 2, 
  delay: 1  // 延迟1秒开始
})
```

### 场景结束动画
```javascript
.addAnimation("fadeOut", { 
  duration: 1, 
  delay: -1  // 场景结束前1秒开始
})
```

## 过渡效果

```javascript
builder.addTransition("fade", { duration: 1, startTime: 3.5 });
builder.addTransition("slideLeft", { duration: 1, startTime: 7.5 });
builder.addTransition("zoomIn", { duration: 1, startTime: 11.5 });
```

## 定位系统

### 百分比定位
```javascript
x: '50%',  // 水平居中
y: '50%'   // 垂直居中
```

### 像素定位
```javascript
x: '100px',
y: '200px'
```

### 视口单位
```javascript
x: '50vw',  // 视口宽度的50%
y: '50vh'   // 视口高度的50%
```

## 链式调用

### 场景链式调用
```javascript
const scene = track.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({ text: "标题", textColor: "#ffffff" })
  .addAnimation("fadeIn", { duration: 2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });
```

### 轨道链式调用
```javascript
const track = builder.createTrack({ zIndex: 1 })
  .setDuration(10)
  .addText({ text: "轨道文本", duration: 10, startTime: 0 })
  .addShape({ shape: "circle", fillColor: "#ff0000" });
```

## 多轨道示例

```javascript
// 主轨道
const mainTrack = builder.createTrack({ zIndex: 1 });
const scene = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({ text: "主内容", textColor: "#ffffff" });

// 字幕轨道
const subtitleTrack = builder.createTrack({ zIndex: 2 })
  .addSubtitle({
    text: "字幕内容",
    duration: 3,
    startTime: 0.5,
    backgroundColor: "rgba(0,0,0,0.7)"
  });

// 装饰轨道
const decorationTrack = builder.createTrack({ zIndex: 3 })
  .addShape({
    shape: "circle",
    width: '40px',
    height: '40px',
    fillColor: "#feca57",
    duration: 4,
    startTime: 0
  })
  .addAnimation("bounceIn", { duration: 2 });
```

## 常用脚本

```bash
# 运行示例
npm run example:multi-track
npm run example:chainable-scene
npm run example:preset-effects

# 运行测试
npm run test:multi-track
npm run test:scene-animation

# 查看文档
npm run docs:multi-track
```
