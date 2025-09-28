/**
 * 测试修复后的 fadeIn 动画效果
 */

import { createMultiTrackBuilder } from "../index.js";

async function testFadeInFixed() {
  console.log("🎉 测试修复后的 fadeIn 动画效果...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-fadein-fixed.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试场景级别的 fadeIn 动画
  console.log("📝 场景1: 场景级别 fadeIn 动画");
  const scene1 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "场景级别 fadeIn",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  console.log("场景1动画:", scene1.animations ? scene1.animations[0] : null);
  
  // 测试元素级别的 fadeIn 动画
  console.log("📝 场景2: 元素级别 fadeIn 动画");
  const scene2 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "元素级别 fadeIn",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  const lastElement = scene2.elements[scene2.elements.length - 1];
  console.log("场景2元素动画:", lastElement.animations ? lastElement.animations[0] : null);
  
  // 测试对比：无动画 vs 有动画
  console.log("📝 场景3: 无动画对比");
  const scene3 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "无动画对比",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  console.log("📝 场景4: 有 fadeIn 动画");
  const scene4 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "有 fadeIn 动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  // 测试不同的 fadeIn 参数
  console.log("📝 场景5: 快速 fadeIn");
  const scene5 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#e74c3c" })
    .addText({
      text: "快速 fadeIn (0.5s)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 0.5 });
  
  console.log("📝 场景6: 慢速 fadeIn");
  const scene6 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#9b59b6" })
    .addText({
      text: "慢速 fadeIn (2.5s)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2.5 });
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 fadeIn 动画测试完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 修复说明:");
  console.log("- 修复了 fadeIn 动画的 easing 从 'easeOut' 改为 'easeIn'");
  console.log("- 现在 fadeIn 动画应该有正确的淡入效果");
  console.log("- 场景3应该没有淡入效果（对比）");
  console.log("- 其他场景都应该有明显的淡入效果");
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testFadeInFixed().catch(console.error);
}

export { testFadeInFixed };
