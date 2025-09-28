/**
 * 预设动画简单使用演示
 * 展示如何直接使用预设动画名称，无需复杂导入
 */

import { createMultiTrackBuilder } from "../index.js";

async function presetAnimationsSimpleDemo() {
  console.log("开始预设动画简单使用演示...");
  
  try {
    // 创建构建器
    const builder = createMultiTrackBuilder({
      width: 1280,
      height: 720,
      fps: 30,
      outPath: "output/preset-animations-simple-demo.mp4"
    });
    
    // 创建主轨道
    const mainTrack = builder.createTrack({ zIndex: 1 });
    
    // 场景1 - 淡入淡出效果
    console.log("创建场景1 - 淡入淡出效果...");
    const scene1 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#ff6b6b" })
      .addText({
        text: "淡入淡出效果",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("fadeIn", { duration: 1.5 })
      .addAnimation("fadeOut", { duration: 1.5, delay: -1.5 });
    
    // 场景2 - 缩放效果
    console.log("创建场景2 - 缩放效果...");
    const scene2 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#4ecdc4" })
      .addText({
        text: "缩放效果",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("zoomIn", { duration: 1.5 })
      .addAnimation("zoomOut", { duration: 1.5, delay: -1.5 });
    
    // 场景3 - 滑动效果
    console.log("创建场景3 - 滑动效果...");
    const scene3 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#45b7d1" })
      .addText({
        text: "滑动效果",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("slideInLeft", { duration: 1.5 })
      .addAnimation("slideOutRight", { duration: 1.5, delay: -1.5 });
    
    // 场景4 - 弹跳效果
    console.log("创建场景4 - 弹跳效果...");
    const scene4 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#f39c12" })
      .addText({
        text: "弹跳效果",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("bounceIn", { duration: 2 })
      .addAnimation("bounceOut", { duration: 1.5, delay: -1.5 });
    
    // 场景5 - 现代特效
    console.log("创建场景5 - 现代特效...");
    const scene5 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#e74c3c" })
      .addText({
        text: "现代特效",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("superZoomIn", { duration: 2 })
      .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 });
    
    // 场景6 - 复杂动画组合
    console.log("创建场景6 - 复杂动画组合...");
    const scene6 = mainTrack.createScene({ duration: 6 })
      .addBackground({ color: "#9b59b6" })
      .addText({
        text: "复杂动画组合",
        textColor: "#ffffff",
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("spiral", { duration: 3 })
      .addAnimation("pulse", { duration: 0.5, startTime: 1 })
      .addAnimation("wave", { duration: 1, startTime: 2 })
      .addAnimation("glitch", { duration: 0.5, startTime: 4 });
    
    // 创建装饰轨道
    console.log("创建装饰轨道...");
    const decorationTrack = builder.createTrack({ zIndex: 2 })
      .addShape({
        shape: "circle",
        width: '50px',
        height: '50px',
        fillColor: "#feca57",
        x: '20%',
        y: '20%',
        duration: 26,
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
        duration: 26,
        startTime: 0
      })
      .addAnimation("slideInRight", { duration: 2, startTime: 2 })
      .addAnimation("swing", { duration: 1, startTime: 5 });
    
    // 添加过渡效果
    console.log("添加过渡效果...");
    builder.addTransition("fade", { duration: 1, startTime: 3.5 });
    builder.addTransition("slideLeft", { duration: 1, startTime: 7.5 });
    builder.addTransition("zoomIn", { duration: 1, startTime: 11.5 });
    builder.addTransition("explode", { duration: 1, startTime: 15.5 });
    builder.addTransition("spiral", { duration: 1, startTime: 19.5 });
    
    // 渲染视频
    console.log("开始渲染视频...");
    const outputPath = await builder.render();
    console.log(`✅ 预设动画简单使用演示完成: ${outputPath}`);
    
    console.log("\n🎉 演示说明:");
    console.log("- 所有动画都是直接使用预设名称，无需复杂导入");
    console.log("- 支持基础预设和 AnimationManager 预设");
    console.log("- 支持单属性和多属性动画");
    console.log("- 支持动画参数覆盖（duration, delay, startTime 等）");
    
  } catch (error) {
    console.error("❌ 预设动画简单使用演示失败:", error);
    console.error("错误详情:", error.message);
  }
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  presetAnimationsSimpleDemo();
}

export { presetAnimationsSimpleDemo };
