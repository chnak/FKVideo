/**
 * 测试预设背景颜色功能
 */

import { createMultiTrackBuilder } from "../index.js";

async function testBackgroundColors() {
  console.log("🎨 测试预设背景颜色功能...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-background-colors.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试1: 不指定颜色，使用随机预设颜色
  console.log("📝 测试1: 随机预设背景颜色");
  const scene1 = mainTrack.createScene({ duration: 2 })
    .addBackground()  // 不指定颜色
    .addText({
      text: "随机预设颜色1",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  const scene2 = mainTrack.createScene({ duration: 2 })
    .addBackground()  // 不指定颜色
    .addText({
      text: "随机预设颜色2",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  const scene3 = mainTrack.createScene({ duration: 2 })
    .addBackground()  // 不指定颜色
    .addText({
      text: "随机预设颜色3",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  // 测试2: 指定颜色，使用自定义颜色
  console.log("📝 测试2: 自定义背景颜色");
  const scene4 = mainTrack.createScene({ duration: 2 })
    .addBackground({ color: "#ff0000" })  // 指定红色
    .addText({
      text: "自定义红色",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  const scene5 = mainTrack.createScene({ duration: 2 })
    .addBackground({ color: "#00ff00" })  // 指定绿色
    .addText({
      text: "自定义绿色",
      textColor: "#000000",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  // 测试3: 混合使用
  console.log("📝 测试3: 混合使用");
  const scene6 = mainTrack.createScene({ duration: 2 })
    .addBackground()  // 随机颜色
    .addText({
      text: "随机颜色",
      textColor: "#ffffff",
      fontSize: 24,
      x: '50%',
      y: '30%',
      textAlign: 'center'
    })
    .addText({
      text: "自定义颜色",
      textColor: "#000000",
      fontSize: 24,
      x: '50%',
      y: '60%',
      textAlign: 'center'
    });
  
  // 输出背景颜色信息
  console.log("\n📋 背景颜色信息:");
  console.log("场景1背景颜色:", scene1.elements[0].color);
  console.log("场景2背景颜色:", scene2.elements[0].color);
  console.log("场景3背景颜色:", scene3.elements[0].color);
  console.log("场景4背景颜色:", scene4.elements[0].color);
  console.log("场景5背景颜色:", scene5.elements[0].color);
  console.log("场景6背景颜色:", scene6.elements[0].color);
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 预设背景颜色测试完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 功能说明:");
  console.log("- 不指定颜色时，会从20种预设颜色中随机选择");
  console.log("- 指定颜色时，使用自定义颜色");
  console.log("- 预设颜色包括各种鲜艳和柔和的色彩");
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testBackgroundColors().catch(console.error);
}

export { testBackgroundColors };
