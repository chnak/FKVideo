/**
 * 测试场景动画链式调用问题
 */

import { createMultiTrackBuilder } from "../index.js";

async function testSceneAnimationChaining() {
  console.log("🔍 测试场景动画链式调用...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-scene-animation-chaining.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试场景动画链式调用
  console.log("📝 测试场景动画链式调用:");
  const scene = mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "场景动画链式调用测试",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("pulse", { duration: 1 })
    .addAnimation("bounceIn", { duration: 2, delay: 2 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 检查场景的动画配置
  console.log("场景动画数量:", scene.animations ? scene.animations.length : 0);
  if (scene.animations) {
    console.log("场景动画详情:");
    scene.animations.forEach((anim, index) => {
      console.log(`  动画 ${index + 1}:`, {
        name: anim.name || 'unnamed',
        property: anim.property,
        duration: anim.duration,
        delay: anim.delay,
        startTime: anim.startTime
      });
    });
  }
  
  // 测试元素动画链式调用
  console.log("\n📝 测试元素动画链式调用:");
  const scene2 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "元素动画链式调用测试",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 1 })
    .addAnimation("pulse", { duration: 0.5, startTime: 1 })
    .addAnimation("fadeOut", { duration: 1, delay: -1 });
  
  // 检查最后一个元素的动画配置
  const lastElement = scene2.elements[scene2.elements.length - 1];
  console.log("最后一个元素动画数量:", lastElement.animations ? lastElement.animations.length : 0);
  if (lastElement.animations) {
    console.log("最后一个元素动画详情:");
    lastElement.animations.forEach((anim, index) => {
      console.log(`  动画 ${index + 1}:`, {
        name: anim.name || 'unnamed',
        property: anim.property,
        duration: anim.duration,
        delay: anim.delay,
        startTime: anim.startTime
      });
    });
  }
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log(`✅ 场景动画链式调用测试完成: ${outputPath}`);
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testSceneAnimationChaining().catch(console.error);
}

export { testSceneAnimationChaining };
