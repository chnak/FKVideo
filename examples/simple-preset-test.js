/**
 * 简单预设动画测试
 * 测试多轨道构建器是否可以直接使用预设动画名称
 */

import { createMultiTrackBuilder } from "../index.js";

async function simplePresetTest() {
  console.log("开始简单预设动画测试...");
  
  try {
    // 创建构建器
    const builder = createMultiTrackBuilder({
      width: 1280,
      height: 720,
      fps: 30,
      outPath: "output/simple-preset-test.mp4"
    });
    
    // 创建主轨道
    const mainTrack = builder.createTrack({ zIndex: 1 });
    
    // 测试基础预设动画
    console.log("测试基础预设动画...");
    const scene1 = mainTrack.createScene({ duration: 3 })
      .addBackground({ color: "#ff6b6b" })
      .addText({
        text: "基础预设测试",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("fadeIn", { duration: 1 })
      .addAnimation("fadeOut", { duration: 1, delay: -1 });
    
    // 测试 AnimationManager 预设动画
    console.log("测试 AnimationManager 预设动画...");
    const scene2 = mainTrack.createScene({ duration: 3 })
      .addBackground({ color: "#4ecdc4" })
      .addText({
        text: "AnimationManager 预设测试",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("bounceIn", { duration: 1.5 })
      .addAnimation("pulse", { duration: 0.5, startTime: 1 });
    
    // 测试多属性动画
    console.log("测试多属性动画...");
    const scene3 = mainTrack.createScene({ duration: 3 })
      .addBackground({ color: "#45b7d1" })
      .addText({
        text: "多属性动画测试",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("superZoomIn", { duration: 2 });
    
    // 渲染视频
    console.log("开始渲染视频...");
    const outputPath = await builder.render();
    console.log(`✅ 简单预设动画测试完成: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ 简单预设动画测试失败:", error);
    console.error("错误详情:", error.message);
    console.error("错误堆栈:", error.stack);
  }
}

// 运行测试
simplePresetTest();
