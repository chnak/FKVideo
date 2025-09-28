/**
 * 调试场景动画问题
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🔍 调试场景动画问题...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/debug-scene-animations.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 创建场景并添加多个动画
const scene = mainTrack.createScene({ duration: 6 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "调试场景动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

console.log("添加第一个动画: pulse");
scene.addAnimation("pulse", { duration: 1 });
console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

console.log("添加第二个动画: bounceIn");
scene.addAnimation("bounceIn", { duration: 2, delay: 2 });
console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

console.log("添加第三个动画: fadeOut");
scene.addAnimation("fadeOut", { duration: 1, delay: -1 });
console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

// 输出所有动画详情
if (scene.animations) {
  console.log("\n所有场景动画详情:");
  scene.animations.forEach((anim, index) => {
    console.log(`动画 ${index + 1}:`, {
      name: anim.name || 'unnamed',
      property: anim.property,
      duration: anim.duration,
      delay: anim.delay,
      startTime: anim.startTime,
      from: anim.from,
      to: anim.to,
      easing: anim.easing
    });
  });
} else {
  console.log("❌ 场景没有动画！");
}

console.log("\n🎬 开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 调试完成: ${outputPath}`);
  })
  .catch(error => {
    console.error("❌ 调试失败:", error.message);
  });
