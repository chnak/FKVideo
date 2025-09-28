/**
 * 测试 fadeIn 动画效果
 */

import { createMultiTrackBuilder } from "../index.js";

async function testFadeInAnimation() {
  console.log("🔍 测试 fadeIn 动画效果...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/test-fadein-animation.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 测试场景级别的 fadeIn 动画
  console.log("📝 测试场景级别 fadeIn 动画");
  const scene1 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#ff6b6b" })
    .addText({
      text: "场景级别 fadeIn 动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  console.log("场景1动画数量:", scene1.animations ? scene1.animations.length : 0);
  if (scene1.animations) {
    console.log("场景1动画详情:");
    scene1.animations.forEach((anim, index) => {
      console.log(`  动画 ${index + 1}:`, {
        name: anim.name,
        property: anim.property,
        from: anim.from,
        to: anim.to,
        duration: anim.duration,
        easing: anim.easing,
        delay: anim.delay,
        startTime: anim.startTime
      });
    });
  }
  
  // 测试元素级别的 fadeIn 动画
  console.log("\n📝 测试元素级别 fadeIn 动画");
  const scene2 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#4ecdc4" })
    .addText({
      text: "元素级别 fadeIn 动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  // 检查最后一个元素的动画
  const lastElement = scene2.elements[scene2.elements.length - 1];
  console.log("场景2最后一个元素动画数量:", lastElement.animations ? lastElement.animations.length : 0);
  if (lastElement.animations) {
    console.log("场景2最后一个元素动画详情:");
    lastElement.animations.forEach((anim, index) => {
      console.log(`  动画 ${index + 1}:`, {
        name: anim.name,
        property: anim.property,
        from: anim.from,
        to: anim.to,
        duration: anim.duration,
        easing: anim.easing,
        delay: anim.delay,
        startTime: anim.startTime
      });
    });
  }
  
  // 测试对比：有动画 vs 无动画
  console.log("\n📝 测试对比：有动画 vs 无动画");
  const scene3 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#45b7d1" })
    .addText({
      text: "无动画对比",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    });
  
  const scene4 = mainTrack.createScene({ duration: 3 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "有 fadeIn 动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation("fadeIn", { duration: 2 });
  
  console.log("场景3动画数量:", scene3.animations ? scene3.animations.length : 0);
  console.log("场景4动画数量:", scene4.animations ? scene4.animations.length : 0);
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log(`✅ fadeIn 动画测试完成: ${outputPath}`);
  console.log("\n📋 检查要点:");
  console.log("1. 场景1应该有淡入效果");
  console.log("2. 场景2的文本应该有淡入效果");
  console.log("3. 场景3应该没有淡入效果（对比）");
  console.log("4. 场景4应该有淡入效果");
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testFadeInAnimation().catch(console.error);
}

export { testFadeInAnimation };
