/**
 * 简单背景颜色测试
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎨 简单背景颜色测试...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/simple-background-test.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试随机背景颜色
const scene1 = mainTrack.createScene({ duration: 2 })
  .addBackground()  // 不指定颜色，使用随机预设
  .addText({
    text: "随机背景颜色",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

// 测试自定义背景颜色
const scene2 = mainTrack.createScene({ duration: 2 })
  .addBackground({ color: "#ff0000" })  // 指定红色
  .addText({
    text: "自定义红色背景",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

// 测试另一个随机背景颜色
const scene3 = mainTrack.createScene({ duration: 2 })
  .addBackground()  // 不指定颜色，使用随机预设
  .addText({
    text: "另一个随机背景",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  });

console.log("场景1背景颜色:", scene1.elements[0].color);
console.log("场景2背景颜色:", scene2.elements[0].color);
console.log("场景3背景颜色:", scene3.elements[0].color);

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 测试完成: ${outputPath}`);
    console.log("🎉 预设背景颜色功能正常工作！");
  })
  .catch(error => {
    console.error("❌ 测试失败:", error.message);
  });
