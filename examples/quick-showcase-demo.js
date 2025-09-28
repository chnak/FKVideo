/**
 * FKVideo 快速展示示例 - 简洁版
 * 展示多轨道构建器的核心功能
 */

import { createMultiTrackBuilder } from "../index.js";

async function quickShowcaseDemo() {
  console.log("🚀 创建 FKVideo 快速展示视频...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/fkvideo-quick-showcase.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 场景1: 标题
  mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#1a1a2e" })
    .addText({
      text: "FKVideo",
      textColor: "#00d4ff",
      fontSize: 80,
      x: '50%',
      y: '40%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "视频制作库",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '60%',
      textAlign: 'center'
    })
    .addAnimation('zoomIn', { duration: 2 });
  
  // 场景2: 特性展示
  mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#2c3e50" })
    .addText({
      text: "核心特性",
      textColor: "#e74c3c",
      fontSize: 60,
      x: '50%',
      y: '25%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "🎬 JSON 配置",
      textColor: "#ffffff",
      fontSize: 28,
      x: '50%',
      y: '45%',
      textAlign: 'center'
    })
    .addText({
      text: "🎯 多轨道支持",
      textColor: "#ffffff",
      fontSize: 28,
      x: '50%',
      y: '55%',
      textAlign: 'center'
    })
    .addText({
      text: "✨ 丰富动画",
      textColor: "#ffffff",
      fontSize: 28,
      x: '50%',
      y: '65%',
      textAlign: 'center'
    })
    .addAnimation('slideInLeft', { duration: 2 });
  
  // 场景3: 动画演示
  mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#8e44ad" })
    .addText({
      text: "动画演示",
      textColor: "#f39c12",
      fontSize: 60,
      x: '50%',
      y: '25%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "淡入效果",
      textColor: "#ffffff",
      fontSize: 40,
      x: '30%',
      y: '50%',
      textAlign: 'center'
    })
    .addText({
      text: "缩放效果",
      textColor: "#ffffff",
      fontSize: 40,
      x: '70%',
      y: '50%',
      textAlign: 'center'
    })
    .addAnimation('fadeIn', { duration: 2 })
    .addAnimation('zoomIn', { duration: 2, delay: 2 });
  
  // 场景4: 代码示例
  mainTrack.createScene({ duration: 8 })
    .addBackground({ color: "#34495e" })
    .addText({
      text: "使用示例",
      textColor: "#e74c3c",
      fontSize: 60,
      x: '50%',
      y: '20%',
      textAlign: 'center',
      fontWeight: 'bold'
    })
    .addText({
      text: "const builder = createMultiTrackBuilder();",
      textColor: "#2ecc71",
      fontSize: 20,
      x: '50%',
      y: '40%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "track.createScene().addText().addAnimation();",
      textColor: "#2ecc71",
      fontSize: 20,
      x: '50%',
      y: '50%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "await builder.render();",
      textColor: "#2ecc71",
      fontSize: 20,
      x: '50%',
      y: '60%',
      textAlign: 'left',
      fontFamily: 'monospace'
    })
    .addText({
      text: "简洁的链式 API",
      textColor: "#ffffff",
      fontSize: 28,
      x: '50%',
      y: '75%',
      textAlign: 'center'
    })
    .addAnimation('slideInRight', { duration: 2 });
  
  // 添加过渡效果
  builder.addTransition('fade', { duration: 0.8 });
  builder.addTransition('slideLeft', { duration: 0.8 });
  builder.addTransition('zoomIn', { duration: 0.8 });
  
  console.log("🎬 开始渲染...");
  const outputPath = await builder.render();
  
  console.log("✅ 快速展示视频完成！");
  console.log(`📁 输出: ${outputPath}`);
}

// 运行
if (import.meta.url === `file://${process.argv[1]}`) {
  quickShowcaseDemo().catch(console.error);
}

export { quickShowcaseDemo };
