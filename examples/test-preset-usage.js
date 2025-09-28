/**
 * 测试预设动画使用
 */

import { createMultiTrackBuilder } from "../index.js";

async function testPresetUsage() {
  console.log("测试预设动画使用...");
  
  try {
    const builder = createMultiTrackBuilder({
      width: 1280,
      height: 720,
      fps: 30,
      outPath: "output/test-preset-usage.mp4"
    });
    
    const mainTrack = builder.createTrack({ zIndex: 1 });
    
    // 测试基础预设
    const scene1 = mainTrack.createScene({ duration: 3 })
      .addBackground({ color: "#ff6b6b" })
      .addText({
        text: "测试基础预设",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("fadeIn", { duration: 1 });
    
    // 测试 AnimationManager 预设
    const scene2 = mainTrack.createScene({ duration: 3 })
      .addBackground({ color: "#4ecdc4" })
      .addText({
        text: "测试 AnimationManager 预设",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addAnimation("bounceIn", { duration: 1.5 });
    
    const outputPath = await builder.render();
    console.log(`✅ 测试完成: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ 测试失败:", error.message);
  }
}

testPresetUsage();
