/**
 * 简单场景动画测试
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎬 简单场景动画测试...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/simple-scene-animation-test.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试场景动画链式调用
const scene = mainTrack.createScene({ duration: 6 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "场景动画链式调用测试",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("pulse", { duration: 1 })
  .addAnimation("bounceIn", { duration: 2, delay: 2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });

console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

if (scene.animations) {
  console.log("动画详情:");
  scene.animations.forEach((anim, index) => {
    console.log(`  ${index + 1}. ${anim.property} (${anim.duration}s, delay: ${anim.delay || 0})`);
  });
}

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 测试完成: ${outputPath}`);
    console.log("🎉 场景动画链式调用现在正常工作了！");
  })
  .catch(error => {
    console.error("❌ 测试失败:", error.message);
  });
