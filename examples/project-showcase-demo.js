/**
 * FKVideo 项目展示视频 - 使用多轨道构建器
 * 展示项目的核心功能和特性
 */

import { createMultiTrackBuilder } from "../index.js";

async function projectShowcaseDemo() {
  console.log("🎬 开始创建 FKVideo 项目展示视频...");
  
  const builder = createMultiTrackBuilder({
    width: 1920,
    height: 1080,
    fps: 30,
    outPath: "output/fkvideo-showcase.mp4"
  });
  
  // 创建主轨道
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1: 项目介绍
  console.log("📝 创建场景1: 项目介绍");
  const introScene = mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#1a1a2e" }) // 深蓝背景
    .addText({
      text: "FKVideo",
      textColor: "#00d4ff",
      fontSize: 120,
      x: '50%',
      y: '35%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "基于 Creatomate 配置结构的视频制作库",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '50%',
      textAlign: 'center'
    })
    .addText({
      text: "Canvas + Fabric + FFmpeg + Node.js",
      textColor: "#888888",
      fontSize: 24,
      x: '50%',
      y: '60%',
      textAlign: 'center'
    })
    .addAnimation('zoomIn', { duration: 2 })
    .addAnimation('zoomOut', { duration: 1.5, delay: -1.5 });
  
  // 场景2: 核心特性展示
  console.log("📝 创建场景2: 核心特性展示");
  const featuresScene = mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#2c3e50" }) // 深灰蓝背景
    .addText({
      text: "核心特性",
      textColor: "#e74c3c",
      fontSize: 80,
      x: '50%',
      y: '20%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "🎬 JSON 配置驱动",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '35%',
      textAlign: 'center'
    })
    .addText({
      text: "🎯 多轨道多场景支持",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '45%',
      textAlign: 'center'
    })
    .addText({
      text: "✨ 50+ 预设动画效果",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '55%',
      textAlign: 'center'
    })
    .addText({
      text: "🔧 链式 API 设计",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "🌍 完善的中文字体支持",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '75%',
      textAlign: 'center'
    })
    .addAnimation('slideInLeft', { duration: 2 })
    .addAnimation('fadeOut', { duration: 1.5, delay: -1.5 });
  
  // 场景3: 动画效果演示
  console.log("📝 创建场景3: 动画效果演示");
  const animationScene = mainTrack.createScene({ duration: 10 })
    .addBackground({ color: "#8e44ad" }) // 紫色背景
    .addText({
      text: "动画效果演示",
      textColor: "#f39c12",
      fontSize: 80,
      x: '50%',
      y: '15%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "淡入效果",
      textColor: "#ffffff",
      fontSize: 48,
      x: '25%',
      y: '35%',
      textAlign: 'center'
    })
    .addText({
      text: "缩放效果",
      textColor: "#ffffff",
      fontSize: 48,
      x: '75%',
      y: '35%',
      textAlign: 'center'
    })
    .addText({
      text: "旋转效果",
      textColor: "#ffffff",
      fontSize: 48,
      x: '25%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "弹跳效果",
      textColor: "#ffffff",
      fontSize: 48,
      x: '75%',
      y: '65%',
      textAlign: 'center'
    })
    .addAnimation('zoomIn', { duration: 1})
    .addAnimation('zoomOut', { duration: 1,delay:-1})
  
  // 场景4: 多轨道功能展示
  console.log("📝 创建场景4: 多轨道功能展示");
  const multiTrackScene = mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#27ae60" }) // 绿色背景
    .addText({
      text: "多轨道构建器",
      textColor: "#f1c40f",
      fontSize: 80,
      x: '50%',
      y: '20%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "支持多轨道并行",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addText({
      text: "链式 API 调用",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '50%',
      textAlign: 'center'
    })
    .addText({
      text: "场景自动管理",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '60%',
      textAlign: 'center'
    })
    .addText({
      text: "丰富的元素类型",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '70%',
      textAlign: 'center'
    })
    .addAnimation('slideInLeft', { duration: 1 })
    .addAnimation('slideOutRight', { duration: 1, delay: -1 });
  
  // 场景5: 技术栈展示
  console.log("📝 创建场景5: 技术栈展示");
  const techStackScene = mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#e67e22" }) // 橙色背景
    .addText({
      text: "技术栈",
      textColor: "#2c3e50",
      fontSize: 80,
      x: '50%',
      y: '20%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "Canvas",
      textColor: "#ffffff",
      fontSize: 48,
      x: '20%',
      y: '40%',
      textAlign: 'center'
    })
    .addText({
      text: "Fabric.js",
      textColor: "#ffffff",
      fontSize: 48,
      x: '40%',
      y: '40%',
      textAlign: 'center'
    })
    .addText({
      text: "FFmpeg",
      textColor: "#ffffff",
      fontSize: 48,
      x: '60%',
      y: '40%',
      textAlign: 'center'
    })
    .addText({
      text: "Node.js",
      textColor: "#ffffff",
      fontSize: 48,
      x: '80%',
      y: '40%',
      textAlign: 'center'
    })
    .addText({
      text: "高性能渲染引擎",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "跨平台支持",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '75%',
      textAlign: 'center'
    })
    .addAnimation('zoomIn', { duration: 2 })
    .addAnimation('fadeOut', { duration: 1.5, delay: -1.5 });
  
  // 场景6: 使用示例代码展示
  console.log("📝 创建场景6: 使用示例代码展示");
  const codeExampleScene = mainTrack.createScene({ duration: 10 })
    .addBackground({ color: "#34495e" }) // 深灰背景
    .addText({
      text: "使用示例",
      textColor: "#e74c3c",
      fontSize: 80,
      x: '50%',
      y: '15%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "const builder = createMultiTrackBuilder({",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '30%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "  width: 1920, height: 1080, fps: 30",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '35%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "});",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '40%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "const track = builder.createTrack();",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '45%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "track.createScene().addText().addAnimation();",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '50%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "await builder.render();",
      textColor: "#2ecc71",
      fontSize: 24,
      x: '50%',
      y: '55%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "简洁的链式 API，强大的功能",
      textColor: "#ffffff",
      fontSize: 32,
      x: '50%',
      y: '75%',
      textAlign: 'center'
    })
    .addAnimation('slideInRight', { duration: 2 })
    .addAnimation('slideOutLeft', { duration: 1.5, delay: -1.5 });
  
  // 场景7: 项目总结
  console.log("📝 创建场景7: 项目总结");
  const conclusionScene = mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#2c3e50" }) // 深蓝灰背景
    .addText({
      text: "FKVideo",
      textColor: "#00d4ff",
      fontSize: 100,
      x: '50%',
      y: '30%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "让视频制作变得简单而强大",
      textColor: "#ffffff",
      fontSize: 48,
      x: '50%',
      y: '50%',
      textAlign: 'center'
    })
    .addText({
      text: "基于 JSON 配置",
      textColor: "#e74c3c",
      fontSize: 32,
      x: '30%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "多轨道支持",
      textColor: "#f39c12",
      fontSize: 32,
      x: '50%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "丰富动画",
      textColor: "#2ecc71",
      fontSize: 32,
      x: '70%',
      y: '65%',
      textAlign: 'center'
    })
    .addText({
      text: "MIT License",
      textColor: "#95a5a6",
      fontSize: 24,
      x: '50%',
      y: '80%',
      textAlign: 'center'
    })
    .addAnimation('zoomIn', { duration: 2 })
    .addAnimation('fadeOut', { duration: 1.5, delay: -1.5 });
  
  // 添加过渡效果
  console.log("🎭 添加过渡效果...");
  builder.addTransition('fade', { duration: 1 });
  builder.addTransition('slideLeft', { duration: 1 });
  builder.addTransition('zoomIn', { duration: 1 });
  builder.addTransition('slideUp', { duration: 1 });
  builder.addTransition('fade', { duration: 1 });
  builder.addTransition('slideRight', { duration: 1 });
  
  console.log("\n🎬 开始渲染项目展示视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 项目展示视频创建完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 视频内容包含:");
  console.log("- 项目介绍和核心特性");
  console.log("- 动画效果演示");
  console.log("- 多轨道功能展示");
  console.log("- 技术栈介绍");
  console.log("- 使用示例代码");
  console.log("- 项目总结");
  console.log("- 多种过渡效果");
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  projectShowcaseDemo().catch(console.error);
}

export { projectShowcaseDemo };
