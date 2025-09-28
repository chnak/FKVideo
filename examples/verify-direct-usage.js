/**
 * 验证直接使用预设动画
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🔍 验证直接使用预设动画...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/verify-direct-usage.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试各种预设动画
const scene = mainTrack.createScene({ duration: 2 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "直接使用预设动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("fadeIn", { duration: 1 })        // 基础预设
  .addAnimation("bounceIn", { duration: 1.5 })    // AnimationManager 预设
  .addAnimation("superZoomIn", { duration: 2 })   // 多属性动画
  .addAnimation("explodeOut", { duration: 1, delay: -1 }); // 退出动画

console.log("✅ 预设动画配置成功，开始渲染...");

builder.render()
  .then(outputPath => {
    console.log(`🎉 验证成功！输出: ${outputPath}`);
    console.log("✨ 所有预设动画都可以直接使用，无需导入！");
  })
  .catch(error => {
    console.error("❌ 验证失败:", error.message);
  });
