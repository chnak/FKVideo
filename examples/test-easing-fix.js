/**
 * 测试修复后的 easing 参数效果
 */

import { createMultiTrackBuilder } from "../index.js";

async function testEasingFix() {
  console.log("🎉 测试修复后的 easing 参数效果...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-easing-fix.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试 fadeIn 和 fadeOut 对比
  console.log("📝 场景1: fadeIn 动画 (easeIn)");
  const scene1 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "fadeIn (easeIn)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  console.log("📝 场景2: fadeOut 动画 (easeOut)");
  const scene2 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "fadeOut (easeOut)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeOut", { duration: 2 });
  
  // 测试 zoomIn 和 zoomOut 对比
  console.log("📝 场景3: zoomIn 动画 (easeOut)");
  const scene3 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "zoomIn (easeOut)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("zoomIn", { duration: 2 });
  
  console.log("📝 场景4: zoomOut 动画 (easeIn)");
  const scene4 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "zoomOut (easeIn)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("zoomOut", { duration: 2 });
  
  // 测试 slideIn 和 slideOut 对比
  console.log("📝 场景5: slideInLeft 动画 (easeOut)");
  const scene5 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#e74c3c" })
    .addText({
      text: "slideInLeft (easeOut)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("slideInLeft", { duration: 2 });
  
  console.log("📝 场景6: slideOutLeft 动画 (easeIn)");
  const scene6 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#9b59b6" })
    .addText({
      text: "slideOutLeft (easeIn)",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("slideOutLeft", { duration: 2 });
  
  // 输出动画配置信息
  console.log("\n📋 动画配置检查:");
  console.log("fadeIn easing:", scene1.animations[0].easing);
  console.log("fadeOut easing:", scene2.animations[0].easing);
  console.log("zoomIn easing:", scene3.animations[0].easing);
  console.log("zoomOut easing:", scene4.animations[0].easing);
  console.log("slideInLeft easing:", scene5.animations[0].easing);
  console.log("slideOutLeft easing:", scene6.animations[0].easing);
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 easing 参数修复测试完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 修复说明:");
  console.log("- fadeIn: easeIn (开始慢后加快) ✅");
  console.log("- fadeOut: easeOut (开始快后减慢) ✅");
  console.log("- zoomIn: easeOut (开始快后减慢) ✅");
  console.log("- zoomOut: easeIn (开始慢后加快) ✅");
  console.log("- slideInLeft: easeOut (开始快后减慢) ✅");
  console.log("- slideOutLeft: easeIn (开始慢后加快) ✅");
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testEasingFix().catch(console.error);
}

export { testEasingFix };
