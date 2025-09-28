/**
 * 直接使用预设动画演示
 * 展示如何直接使用预设动画名称，无需任何导入
 */

import { createMultiTrackBuilder } from "../index.js";

async function directPresetUsageDemo() {
  console.log("🎬 直接使用预设动画演示");
  console.log("✅ 无需导入任何预设，直接使用动画名称即可！");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/direct-preset-usage-demo.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1 - 直接使用基础预设
  console.log("📝 场景1: 基础预设动画");
  const scene1 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "基础预设",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 1 })      // 直接使用
    .addAnimation("fadeOut", { duration: 1, delay: -1 }); // 直接使用
  
  // 场景2 - 直接使用 AnimationManager 预设
  console.log("📝 场景2: AnimationManager 预设动画");
  const scene2 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "AnimationManager 预设",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("bounceIn", { duration: 1.5 })  // 直接使用
    .addAnimation("pulse", { duration: 0.5, startTime: 1 }); // 直接使用
  
  // 场景3 - 直接使用多属性动画
  console.log("📝 场景3: 多属性动画");
  const scene3 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "多属性动画",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("superZoomIn", { duration: 2 }) // 直接使用
    .addAnimation("explodeOut", { duration: 1, delay: -1 }); // 直接使用
  
  // 场景4 - 直接使用复杂特效
  console.log("📝 场景4: 复杂特效");
  const scene4 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "复杂特效",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("spiral", { duration: 2 })      // 直接使用
    .addAnimation("wave", { duration: 1, startTime: 1 }) // 直接使用
    .addAnimation("glitch", { duration: 0.5, startTime: 2.5 }); // 直接使用
  
  // 装饰元素 - 直接使用各种预设
  console.log("📝 装饰元素: 各种预设动画");
  const decorationTrack = builder.createTrack({ zIndex: 2 })
    .addShape({
      shape: "circle",
      width: '50px',
      height: '50px',
      fillColor: "#feca57",
      x: '20%',
      y: '20%',
      duration: 13,
      startTime: 0
    })
    .addAnimation("bounceIn", { duration: 1 })    // 直接使用
    .addAnimation("pulse", { duration: 0.5, startTime: 2 }) // 直接使用
    .addShape({
      shape: "rect",
      width: '60px',
      height: '30px',
      fillColor: "#ff9ff3",
      x: '80%',
      y: '80%',
      duration: 13,
      startTime: 0
    })
    .addAnimation("slideInRight", { duration: 1.5, startTime: 1 }) // 直接使用
    .addAnimation("swing", { duration: 1, startTime: 3 }); // 直接使用
  
  // 过渡效果 - 直接使用预设
  console.log("📝 过渡效果: 预设过渡");
  builder.addTransition("fade", { duration: 1, startTime: 2.5 });
  builder.addTransition("slideLeft", { duration: 1, startTime: 5.5 });
  builder.addTransition("explode", { duration: 1, startTime: 8.5 });
  
  console.log("🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 演示完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 总结:");
  console.log("- 所有动画都是直接使用预设名称");
  console.log("- 无需导入任何预设模块");
  console.log("- 支持基础预设和 AnimationManager 预设");
  console.log("- 支持单属性和多属性动画");
  console.log("- 支持过渡效果预设");
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  directPresetUsageDemo().catch(console.error);
}

export { directPresetUsageDemo };
