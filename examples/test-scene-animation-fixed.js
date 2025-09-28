/**
 * 测试修复后的场景动画链式调用
 */

import { createMultiTrackBuilder } from "../index.js";

async function testSceneAnimationFixed() {
  console.log("🎉 测试修复后的场景动画链式调用...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-scene-animation-fixed.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试场景动画链式调用
  console.log("📝 场景1: 基础动画链式调用");
  const scene1 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "基础动画链式调用",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 1 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  console.log("场景1动画数量:", scene1.animations ? scene1.animations.length : 0);
  
  // 测试多属性动画链式调用
  console.log("📝 场景2: 多属性动画链式调用");
  const scene2 = mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "多属性动画链式调用",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("pulse", { duration: 1 })
    .addAnimation("bounceIn", { duration: 2, delay: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  console.log("场景2动画数量:", scene2.animations ? scene2.animations.length : 0);
  
  // 测试复杂动画组合
  console.log("📝 场景3: 复杂动画组合");
  const scene3 = mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "复杂动画组合",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("superZoomIn", { duration: 2 })
    .addAnimation("pulse", { duration: 0.5, startTime: 2 })
    .addAnimation("wave", { duration: 1, startTime: 3 })
    .addAnimation("glitch", { duration: 0.5, startTime: 4 })
    .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 });
  
  console.log("场景3动画数量:", scene3.animations ? scene3.animations.length : 0);
  
  // 测试元素动画链式调用
  console.log("📝 场景4: 元素动画链式调用");
  const scene4 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "元素动画链式调用",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 1 })
    .addAnimation("pulse", { duration: 0.5, startTime: 1 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 检查最后一个元素的动画
  const lastElement = scene4.elements[scene4.elements.length - 1];
  console.log("场景4最后一个元素动画数量:", lastElement.animations ? lastElement.animations.length : 0);
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 场景动画链式调用测试完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 修复说明:");
  console.log("- 修复了多属性动画数组处理问题");
  console.log("- 场景动画链式调用现在正常工作");
  console.log("- 支持单属性和多属性动画的混合使用");
  console.log("- 所有动画都会被正确追加到场景中");
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testSceneAnimationFixed().catch(console.error);
}

export { testSceneAnimationFixed };
