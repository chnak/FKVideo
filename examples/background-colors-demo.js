/**
 * 背景颜色演示 - 展示所有预设颜色
 */

import { createMultiTrackBuilder } from "../index.js";

async function backgroundColorsDemo() {
  console.log("🎨 背景颜色演示 - 展示所有预设颜色...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/background-colors-demo.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 预设颜色列表
  const presetColors = [
    "#ff6b6b", // 红色
    "#4ecdc4", // 青色
    "#45b7d1", // 蓝色
    "#f39c12", // 橙色
    "#e74c3c", // 深红色
    "#9b59b6", // 紫色
    "#1abc9c", // 青绿色
    "#2ecc71", // 绿色
    "#f1c40f", // 黄色
    "#34495e", // 深灰色
    "#e67e22", // 深橙色
    "#8e44ad", // 深紫色
    "#16a085", // 深青绿色
    "#27ae60", // 深绿色
    "#f39c12", // 金色
    "#2c3e50", // 深蓝灰色
    "#e74c3c", // 珊瑚红
    "#3498db", // 天蓝色
    "#95a5a6", // 浅灰色
    "#ecf0f1"  // 浅白色
  ];
  
  const colorNames = [
    "红色", "青色", "蓝色", "橙色", "深红色",
    "紫色", "青绿色", "绿色", "黄色", "深灰色",
    "深橙色", "深紫色", "深青绿色", "深绿色", "金色",
    "深蓝灰色", "珊瑚红", "天蓝色", "浅灰色", "浅白色"
  ];
  
  // 创建多个场景，每个场景使用不同的预设颜色
  for (let i = 0; i < presetColors.length; i++) {
    const color = presetColors[i];
    const colorName = colorNames[i];
    
    console.log(`📝 创建场景 ${i + 1}: ${colorName} (${color})`);
    
    const scene = mainTrack.createScene({ duration: 1.5 })
      .addBackground({ color: color })
      .addText({
        text: `${colorName}`,
        textColor: i >= 9 ? "#ffffff" : "#000000", // 深色背景用白色文字，浅色背景用黑色文字
        fontSize: 48,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addText({
        text: color,
        textColor: i >= 9 ? "#ffffff" : "#000000",
        fontSize: 24,
        x: '50%',
        y: '60%',
        textAlign: 'center'
      });
  }
  
  // 添加一些随机背景颜色的场景
  console.log("📝 添加随机背景颜色场景...");
  for (let i = 0; i < 5; i++) {
    const scene = mainTrack.createScene({ duration: 1.5 })
      .addBackground()  // 不指定颜色，使用随机预设
      .addText({
        text: "随机背景颜色",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addText({
        text: `场景 ${i + 1}`,
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '60%',
        textAlign: 'center'
      });
  }
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 背景颜色演示完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 演示内容:");
  console.log("- 展示了所有20种预设背景颜色");
  console.log("- 每个颜色都有对应的中文名称和色值");
  console.log("- 添加了5个随机背景颜色的场景");
  console.log("- 自动调整文字颜色以确保可读性");
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  backgroundColorsDemo().catch(console.error);
}

export { backgroundColorsDemo };
