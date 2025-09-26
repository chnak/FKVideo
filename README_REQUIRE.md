# FKVideo CommonJS 支持

FKVideo现在支持CommonJS的`require`语法，同时保持对ES6模块的完全支持。

## 安装和使用

### 使用CommonJS (require)

```javascript
// 基本使用
const { VideoMaker } = require('FKvideo');

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
      y: 540
    }
  ]
});

// 开始渲染
videoMaker.start().then(outputPath => {
  console.log(`视频已保存到: ${outputPath}`);
}).catch(error => {
  console.error("渲染失败:", error);
});
```

### 使用ES6模块 (import)

```javascript
// 基本使用
import { VideoMaker } from 'FKvideo';

const videoMaker = new VideoMaker({
  // ... 配置
});

await videoMaker.start();
```

## 异步导入其他类

由于FKVideo内部使用ES6模块，其他类需要通过异步函数导入：

```javascript
const { 
  getVideoElement, 
  getImageElement, 
  getTextElement,
  getAnimationManager 
} = require('FKvideo');

// 异步获取元素类
async function createVideo() {
  const VideoElement = await getVideoElement();
  const TextElement = await getTextElement();
  const { AnimationManager } = await getAnimationManager();
  
  // 使用这些类...
}
```

## 测试CommonJS支持

运行测试脚本验证CommonJS支持：

```bash
npm run test:require
```

## 技术实现

FKVideo使用以下技术实现双模块支持：

1. **package.json配置**：
   - `"main": "index.cjs"` - CommonJS入口
   - `"module": "index.js"` - ES6模块入口
   - `"exports"` 字段支持条件导出

2. **动态导入**：
   - CommonJS版本使用`import()`动态导入ES6模块
   - 保持与现有ES6代码的兼容性

3. **向后兼容**：
   - 完全保持现有ES6模块功能
   - 新增CommonJS支持不影响现有代码

## 注意事项

1. **异步导入**：其他类需要通过异步函数导入
2. **性能**：动态导入会有轻微的性能开销
3. **Node.js版本**：需要Node.js >= 16.0.0（支持动态导入）

## 完整示例

```javascript
const { VideoMaker, getTextElement } = require('FKvideo');

async function createAdvancedVideo() {
  // 获取TextElement类
  const TextElement = await getTextElement();
  
  // 创建视频
  const videoMaker = new VideoMaker({
    outPath: "output/advanced.mp4",
    width: 1920,
    height: 1080,
    fps: 30,
    elements: [
      {
        type: "text",
        text: "高级视频示例",
        font: "48px Arial",
        fillColor: "#ffffff",
        duration: 5,
        x: 960,
        y: 540,
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

  // 监听事件
  videoMaker.on("start", () => {
    console.log("开始渲染...");
  });

  videoMaker.on("complete", (outputPath) => {
    console.log(`渲染完成: ${outputPath}`);
  });

  videoMaker.on("error", (error) => {
    console.error("渲染失败:", error);
  });

  try {
    const outputPath = await videoMaker.start();
    console.log(`视频已保存到: ${outputPath}`);
  } finally {
    await videoMaker.close();
  }
}

createAdvancedVideo().catch(console.error);
```
