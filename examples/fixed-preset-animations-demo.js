/**
 * 修复后的预设动画演示
 * 展示现在预设动画可以正常工作了
 */

import { createMultiTrackBuilder } from "../index.js";

async function fixedPresetAnimationsDemo() {
  console.log("🎉 修复后的预设动画演示");
  console.log("✅ 现在所有预设动画都可以正常工作了！");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/fixed-preset-animations-demo.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1 - 基础预设动画
  console.log("📝 场景1: 基础预设动画");
  const scene1 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "基础预设动画",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 1.5 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 场景2 - 多属性动画
  console.log("📝 场景2: 多属性动画");
  const scene2 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "多属性动画",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("bounceIn", { duration: 2 })
    .addAnimation("pulse", { duration: 0.5, startTime: 1 });
  
  // 场景3 - 复杂特效动画
  console.log("📝 场景3: 复杂特效动画");
  const scene3 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "复杂特效动画",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("superZoomIn", { duration: 2 })
    .addAnimation("spiral", { duration: 2, startTime: 1 })
    .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 });
  
  // 场景4 - 现代特效组合
  console.log("📝 场景4: 现代特效组合");
  const scene4 = mainTrack.createScene({ duration: 5 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "现代特效组合",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("slideInLeft", { duration: 1.5 })
    .addAnimation("wave", { duration: 1, startTime: 1 })
    .addAnimation("glitch", { duration: 0.5, startTime: 2 })
    .addAnimation("swing", { duration: 1, startTime: 3 })
    .addAnimation("dissolveOut", { duration: 1, delay: -1 });
  
  // 装饰轨道 - 各种预设动画
  console.log("📝 装饰轨道: 各种预设动画");
  const decorationTrack = builder.createTrack({ zIndex: 2 })
    .addShape({
      shape: "circle",
      width: '60px',
      height: '60px',
      fillColor: "#feca57",
      x: '20%',
      y: '20%',
      duration: 15,
      startTime: 0
    })
    .addAnimation("bounceIn", { duration: 2 })
    .addAnimation("pulse", { duration: 0.5, startTime: 3 })
    .addShape({
      shape: "rect",
      width: '80px',
      height: '40px',
      fillColor: "#ff9ff3",
      x: '80%',
      y: '80%',
      duration: 15,
      startTime: 0
    })
    .addAnimation("slideInRight", { duration: 2, startTime: 1 })
    .addAnimation("swing", { duration: 1, startTime: 4 })
    .addShape({
      shape: "circle",
      width: '40px',
      height: '40px',
      fillColor: "#a8e6cf",
      x: '50%',
      y: '10%',
      duration: 15,
      startTime: 0
    })
    .addAnimation("spiral", { duration: 3, startTime: 2 })
    .addAnimation("wave", { duration: 1, startTime: 5 });
  
  // 添加过渡效果
  console.log("📝 添加过渡效果");
  builder.addTransition("fade", { duration: 1, startTime: 2.5 });
  builder.addTransition("slideLeft", { duration: 1, startTime: 5.5 });
  builder.addTransition("explode", { duration: 1, startTime: 8.5 });
  builder.addTransition("spiral", { duration: 1, startTime: 12.5 });
  
  console.log("🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 修复后的预设动画演示完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 修复说明:");
  console.log("- 修复了多属性动画数组处理问题");
  console.log("- 现在所有预设动画都可以正常使用");
  console.log("- 支持基础预设和 AnimationManager 预设");
  console.log("- 支持单属性和多属性动画");
  console.log("- 支持动画参数覆盖");
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  fixedPresetAnimationsDemo().catch(console.error);
}

export { fixedPresetAnimationsDemo };
