/**
 * 简单自定义动画测试
 */

import { createMultiTrackBuilder } from "../index.js";

console.log("🎨 简单自定义动画测试...");

const builder = createMultiTrackBuilder({
  width: 1280,
  height: 720,
  fps: 30,
  outPath: "output/simple-custom-animation.mp4"
});

const mainTrack = builder.createTrack({ zIndex: 1 });

// 测试单属性自定义动画
const scene1 = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "单属性自定义动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation({
    property: 'opacity',
    from: 0,
    to: 1,
    duration: 2,
    easing: 'easeInOut',
    delay: 0.5
  });

// 测试多属性自定义动画
const scene2 = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#4ecdc4" })
  .addText({
    text: "多属性自定义动画",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation([
    {
      property: 'opacity',
      from: 0,
      to: 1,
      duration: 2,
      easing: 'easeInOut'
    },
    {
      property: 'scaleX',
      from: 0.5,
      to: 1,
      duration: 2,
      easing: 'easeOut'
    },
    {
      property: 'rotation',
      from: -45,
      to: 0,
      duration: 1.5,
      easing: 'easeInOut',
      delay: 0.5
    }
  ]);

// 测试基于预设覆盖参数
const scene3 = mainTrack.createScene({ duration: 3 })
  .addBackground({ color: "#45b7d1" })
  .addText({
    text: "基于预设覆盖参数",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation('fadeIn', { 
    duration: 2.5,
    delay: 0.5,
    easing: 'easeOut'
  });

console.log("场景1动画数量:", scene1.animations ? scene1.animations.length : 0);
console.log("场景2动画数量:", scene2.animations ? scene2.animations.length : 0);
console.log("场景3动画数量:", scene3.animations ? scene3.animations.length : 0);

if (scene1.animations) {
  console.log("场景1动画详情:", scene1.animations[0]);
}

if (scene2.animations) {
  console.log("场景2动画数量:", scene2.animations.length);
  console.log("场景2第一个动画:", scene2.animations[0]);
}

if (scene3.animations) {
  console.log("场景3动画详情:", scene3.animations[0]);
}

console.log("开始渲染...");
builder.render()
  .then(outputPath => {
    console.log(`✅ 测试完成: ${outputPath}`);
    console.log("🎉 自定义动画测试成功！");
  })
  .catch(error => {
    console.error("❌ 测试失败:", error.message);
  });
