# 预设动画使用指南

## 概述

FKVideo 现在支持直接使用预设动画名称，无需复杂导入。所有 AnimationManager 中的预设动画都已经集成到多轨道构建器中，可以直接使用。

## 基本用法

### 1. 直接使用预设动画名称

```javascript
import { createMultiTrackBuilder } from "FKVideo";

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/video.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 直接使用预设动画名称
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
  .addAnimation("fadeIn", { duration: 1.5 })
  .addAnimation("bounceIn", { duration: 2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });

await builder.render();
```

### 2. 支持的预设动画类型

#### 基础动画
- `fadeIn` / `fadeOut` - 淡入淡出
- `scaleIn` / `scaleOut` - 缩放
- `slideInLeft` / `slideInRight` - 左右滑动
- `slideInUp` / `slideInDown` - 上下滑动
- `rotateIn` / `rotateOut` - 旋转
- `bounceIn` / `bounceOut` - 弹跳

#### 现代特效动画
- `superZoomIn` / `superZoomOut` - 超级缩放
- `superSlideInLeft` / `superSlideInRight` - 超级滑动
- `superRotateIn` / `superRotateOut` - 超级旋转
- `superBounceIn` / `superBounceOut` - 超级弹跳

#### 多属性动画
- `bounceIn` - 弹跳进入（包含缩放和透明度）
- `pulse` - 脉冲效果（包含缩放和透明度）
- `swing` - 摇摆效果（包含旋转和位移）
- `shake` - 震动效果（包含位移）
- `wave` - 波浪效果（包含位移）
- `glitch` - 故障效果（包含位移和透明度）
- `spiral` - 螺旋效果（包含旋转、缩放和透明度）
- `explode` - 爆炸效果（包含缩放、旋转和透明度）
- `dissolve` - 溶解效果（包含透明度和缩放）
- `spring` - 弹簧效果（包含缩放和透明度）

#### 退出动画
- `fadeOut` - 淡出
- `zoomOut` - 缩放退出
- `slideOutLeft` / `slideOutRight` - 滑动退出
- `rotateOut` - 旋转退出
- `bounceOut` - 弹跳退出
- `explodeOut` - 爆炸退出
- `dissolveOut` - 溶解退出
- `springOut` - 弹簧退出

### 3. 动画参数

所有预设动画都支持参数覆盖：

```javascript
.addAnimation("fadeIn", { 
  duration: 2,      // 动画持续时间
  delay: 0.5,       // 延迟开始时间
  startTime: 1,     // 开始时间
  easing: "easeOut" // 缓动函数
})
```

#### 特殊参数
- `delay: -1` - 在元素结束前1秒开始动画
- `startTime: 2` - 在场景开始后2秒开始动画
- `duration: 0.5` - 动画持续0.5秒

### 4. 完整示例

```javascript
import { createMultiTrackBuilder } from "FKVideo";

async function createVideo() {
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/demo.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1 - 标题页
  const titleScene = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "欢迎使用 FKVideo",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("superZoomIn", { duration: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 场景2 - 内容页
  const contentScene = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "预设动画演示",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '30%',
      textAlign: 'center'
    })
    .addText({
      text: "支持多种动画效果",
      textColor: "#ffffff",
      fontSize: 24,
      x: '50%',
      y: '50%',
      textAlign: 'center'
    })
    .addAnimation("slideInLeft", { duration: 1.5 })
    .addAnimation("pulse", { duration: 0.5, startTime: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 场景3 - 特效展示
  const effectsScene = mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "特效展示",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("spiral", { duration: 3 })
    .addAnimation("wave", { duration: 1, startTime: 1 })
    .addAnimation("glitch", { duration: 0.5, startTime: 4 })
    .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 });
  
  // 创建装饰轨道
  const decorationTrack = builder.createTrack({ zIndex: 2 })
    .addShape({
      shape: "circle",
      width: '50px',
      height: '50px',
      fillColor: "#feca57",
      x: '20%',
      y: '20%',
      duration: 14,
      startTime: 0
    })
    .addAnimation("bounceIn", { duration: 2 })
    .addAnimation("pulse", { duration: 0.5, startTime: 3 })
    .addShape({
      shape: "rect",
      width: '60px',
      height: '30px',
      fillColor: "#ff9ff3",
      x: '80%',
      y: '80%',
      duration: 14,
      startTime: 0
    })
    .addAnimation("slideInRight", { duration: 2, startTime: 2 })
    .addAnimation("swing", { duration: 1, startTime: 5 });
  
  // 添加过渡效果
  builder.addTransition("fade", { duration: 1, startTime: 3.5 });
  builder.addTransition("slideLeft", { duration: 1, startTime: 7.5 });
  builder.addTransition("explode", { duration: 1, startTime: 11.5 });
  
  const outputPath = await builder.render();
  console.log(`视频已生成: ${outputPath}`);
}

createVideo().catch(console.error);
```

### 5. 运行示例

```bash
# 运行预设动画演示
npm run example:preset-animations

# 运行简单测试
npm run test:preset-usage
```

## 优势

1. **简单易用** - 直接使用预设名称，无需复杂导入
2. **功能丰富** - 包含 50+ 种预设动画效果
3. **参数灵活** - 支持所有动画参数的覆盖
4. **类型多样** - 支持单属性和多属性动画
5. **性能优化** - 预设动画经过优化，渲染效率高

## 注意事项

1. **动画名称** - 使用准确的预设名称，区分大小写
2. **参数覆盖** - 可以通过参数覆盖预设的默认值
3. **时间控制** - 合理设置 `duration`、`delay`、`startTime` 参数
4. **性能考虑** - 避免在单个元素上使用过多复杂动画

## 总结

现在您可以直接在多轨道构建器中使用预设动画名称，无需任何复杂导入。所有 AnimationManager 中的预设动画都已经集成，可以立即使用！
