/**
 * 简单 fadeIn 动画测试
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎬 简单 fadeIn 动画测试...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/simple-fadein-test.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试场景级别的 fadeIn 动画
const scene = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "fadeIn 动画测试",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("fadeIn", { duration: 2 });

console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

if (scene.animations) {
  const anim = scene.animations[0];
  console.log("fadeIn 动画详情:");
  console.log(`  property: ${anim.property}`);
  console.log(`  from: ${anim.from}`);
  console.log(`  to: ${anim.to}`);
  console.log(`  duration: ${anim.duration}`);
  console.log(`  easing: ${anim.easing}`);
  console.log(`  delay: ${anim.delay}`);
}

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 测试完成: ${outputPath}`);
    console.log("🎉 fadeIn 动画现在应该正常工作了！");
    console.log("✨ 修复内容: easing 从 'easeOut' 改为 'easeIn'");
  })
  .catch(error => {
    console.error("❌ 测试失败:", error.message);
  });
