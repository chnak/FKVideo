/**
 * AnimationManager 预设动画演示
 * 展示如何使用 AnimationManager 中的预设动画
 */

import { 
  createMultiTrackBuilder, 
  getAllAnimationPresetNames,
  isMultiPropertyAnimation,
  AnimationManagerPresets 
} from "../index.js";

async function animationManagerPresetsDemo() {
  console.log("开始 AnimationManager 预设动画演示...");
  
  try {
    // 创建构建器
    const builder = createMultiTrackBuilder({
      width: 1280,
      height: 720,
      fps: 30,
      outPath: "output/animation-manager-presets-demo.mp4"
    });
    
    // 创建主轨道
    const mainTrack = builder.createTrack({ zIndex: 1 });
    
    // 获取所有可用的动画预设
    const allPresets = getAllAnimationPresetNames();
    console.log(`✅ 发现 ${allPresets.length} 个动画预设`);
    
    // 显示一些预设信息
    console.log("前10个预设:", allPresets.slice(0, 10));
    
    // 场景1 - 基础动画效果
    console.log("创建场景1 - 基础动画效果...");
    const scene1 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#ff6b6b" })
      .addText({
        text: "基础动画效果",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '30%',
        textAlign: 'center'
      })
      .addText({
        text: "fadeIn + fadeOut",
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '50%',
        textAlign: 'center'
      })
      .addAnimation("pulse", { duration: 1 })
  .addAnimation("bounceIn", { duration: 2, delay:2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });
    
    // 场景2 - 现代特效动画
    console.log("创建场景2 - 现代特效动画...");
    const scene2 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#4ecdc4" })
      .addText({
        text: "现代特效动画",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '30%',
        textAlign: 'center'
      })
      .addText({
        text: "bounceIn + pulse",
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '50%',
        textAlign: 'center'
      })
      .addAnimation("bounceIn", { duration: 1.5 })
      .addAnimation("pulse", { duration: 0.5, startTime: 2 });
    
    // 场景3 - 多属性动画
    console.log("创建场景3 - 多属性动画...");
    const scene3 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#45b7d1" })
      .addText({
        text: "多属性动画",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '30%',
        textAlign: 'center'
      })
      .addText({
        text: "superZoomIn + explode",
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '50%',
        textAlign: 'center'
      })
      .addAnimation("superZoomIn", { duration: 2 })
      .addAnimation("explode", { duration: 1, startTime: 2 });
    
    // 场景4 - 复杂动画组合
    console.log("创建场景4 - 复杂动画组合...");
    const scene4 = mainTrack.createScene({ duration: 6 })
      .addBackground({ color: "#f39c12" })
      .addText({
        text: "复杂动画组合",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '30%',
        textAlign: 'center'
      })
      .addText({
        text: "spiral + wave + glitch",
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '50%',
        textAlign: 'center'
      })
      .addAnimation("spiral", { duration: 3 })
      .addAnimation("wave", { duration: 1, startTime: 1 })
      .addAnimation("glitch", { duration: 0.5, startTime: 4 });
    
    // 场景5 - 退出动画
    console.log("创建场景5 - 退出动画...");
    const scene5 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#e74c3c" })
      .addText({
        text: "退出动画",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '30%',
        textAlign: 'center'
      })
      .addText({
        text: "explodeOut + dissolveOut",
        textColor: "#ffffff",
        fontSize: 24,
        x: '50%',
        y: '50%',
        textAlign: 'center'
      })
      .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 })
      .addAnimation("dissolveOut", { duration: 1, delay: -1 });
    
    // 创建装饰轨道
    console.log("创建装饰轨道...");
    const decorationTrack = builder.createTrack({ zIndex: 2 })
      .addShape({
        shape: "circle",
        width: '60px',
        height: '60px',
        fillColor: "#feca57",
        x: '20%',
        y: '20%',
        duration: 22,
        startTime: 0
      })
      .addAnimation("bounceIn", { duration: 2 })
      .addAnimation("pulse", { duration: 0.5, startTime: 3 })
      .addShape({
        shape: "rect",
        width: '80px',
        height: '40px',
        fillColor: "#ff9ff3",
        x: '80%',
        y: '80%',
        duration: 22,
        startTime: 0
      })
      .addAnimation("slideInRight", { duration: 2, startTime: 2 })
      .addAnimation("swing", { duration: 1, startTime: 5 });
    
    // 添加过渡效果
    console.log("添加过渡效果...");
    builder.addTransition("fade", { duration: 1, startTime: 3.5 });
    builder.addTransition("slideLeft", { duration: 1, startTime: 7.5 });
    builder.addTransition("zoomIn", { duration: 1, startTime: 11.5 });
    builder.addTransition("explode", { duration: 1, startTime: 15.5 });
    
    // 渲染视频
    console.log("开始渲染视频...");
    const outputPath = await builder.render();
    console.log(`✅ AnimationManager 预设动画演示完成: ${outputPath}`);
    
    // 显示一些统计信息
    console.log("\n📊 统计信息:");
    console.log(`- 总预设数量: ${allPresets.length}`);
    console.log(`- 多属性动画: ${allPresets.filter(name => isMultiPropertyAnimation(name)).length}`);
    console.log(`- 单属性动画: ${allPresets.filter(name => !isMultiPropertyAnimation(name)).length}`);
    
    // 显示一些多属性动画示例
    const multiPropertyAnimations = allPresets.filter(name => isMultiPropertyAnimation(name));
    console.log("\n🎭 多属性动画示例:");
    multiPropertyAnimations.slice(0, 5).forEach(name => {
      console.log(`- ${name}`);
    });
    
  } catch (error) {
    console.error("❌ AnimationManager 预设动画演示失败:", error);
  }
}

// 运行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  animationManagerPresetsDemo();
}
animationManagerPresetsDemo();
export { animationManagerPresetsDemo };
