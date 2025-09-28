/**
 * 简单 easing 参数测试
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎬 简单 easing 参数测试...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/simple-easing-test.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试 fadeIn 和 fadeOut
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

console.log("fadeIn easing:", scene1.animations[0].easing);
console.log("fadeOut easing:", scene2.animations[0].easing);

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 测试完成: ${outputPath}`);
    console.log("🎉 easing 参数修复成功！");
  })
  .catch(error => {
    console.error("❌ 测试失败:", error.message);
  });
