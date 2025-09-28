/**
 * 调试 fadeIn 动画
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🔍 调试 fadeIn 动画...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/debug-fadein.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 创建场景并添加 fadeIn 动画
const scene = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "fadeIn 动画测试",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

console.log("添加 fadeIn 动画前:");
console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

scene.addAnimation("fadeIn", { duration: 2 });

console.log("添加 fadeIn 动画后:");
console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);

if (scene.animations) {
  console.log("动画详情:");
  scene.animations.forEach((anim, index) => {
    console.log(`  动画 ${index + 1}:`, {
      name: anim.name,
      property: anim.property,
      from: anim.from,
      to: anim.to,
      duration: anim.duration,
      easing: anim.easing,
      delay: anim.delay,
      startTime: anim.startTime
    });
  });
} else {
  console.log("❌ 场景没有动画！");
}

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 调试完成: ${outputPath}`);
  })
  .catch(error => {
    console.error("❌ 调试失败:", error.message);
  });
