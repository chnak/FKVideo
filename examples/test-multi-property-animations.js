/**
 * 测试多属性动画
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎬 测试多属性动画...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/test-multi-property-animations.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试各种多属性动画
const scene1 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "bounceIn 多属性动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("bounceIn", { duration: 2 });

const scene2 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#4ecdc4" })
  .addText({
    text: "superZoomIn 多属性动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("superZoomIn", { duration: 2 });

const scene3 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#45b7d1" })
  .addText({
    text: "pulse 多属性动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("pulse", { duration: 1, startTime: 1 });

const scene4 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#f39c12" })
  .addText({
    text: "spiral 多属性动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("spiral", { duration: 3 });

const scene5 = mainTrack.createScene({ duration: 4 })
  .addBackground({ color: "#e74c3c" })
  .addText({
    text: "explode 多属性动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("explode", { duration: 2 });

console.log("✅ 多属性动画配置完成，开始渲染...");

builder.render()
  .then(outputPath => {
    console.log(`🎉 多属性动画测试完成！输出: ${outputPath}`);
    console.log("✨ 所有多属性动画都应该正常工作了！");
  })
  .catch(error => {
    console.error("❌ 多属性动画测试失败:", error.message);
    console.error("错误堆栈:", error.stack);
  });
