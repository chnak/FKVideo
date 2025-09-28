/**
 * 自定义动画使用示例
 */

import { createMultiTrackBuilder } from "../index.js";

async function customAnimationDemo() {
  console.log("🎨 自定义动画使用示例...");
  
  const builder = createMultiTrackBuilder({
    width: 1280,
    height: 720,
    fps: 30,
    outPath: "output/custom-animation-demo.mp4"
  });
  
  const mainTrack = builder.createTrack({ zIndex: 1 });
  
  // 示例1: 单属性自定义动画
  console.log("📝 示例1: 单属性自定义动画");
  const scene1 = mainTrack.createScene({ duration: 4 })
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
  
  // 示例2: 多属性自定义动画
  console.log("📝 示例2: 多属性自定义动画");
  const scene2 = mainTrack.createScene({ duration: 4 })
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
        property: 'scaleY',
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
  
  // 示例3: 基于预设动画覆盖参数
  console.log("📝 示例3: 基于预设动画覆盖参数");
  const scene3 = mainTrack.createScene({ duration: 4 })
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
      duration: 3,        // 覆盖持续时间
      delay: 0.5,         // 添加延迟
      easing: 'easeOut'   // 覆盖缓动函数
    });
  
  // 示例4: 复杂自定义动画组合
  console.log("📝 示例4: 复杂自定义动画组合");
  const scene4 = mainTrack.createScene({ duration: 6 })
    .addBackground({ color: "#f39c12" })
    .addText({
      text: "复杂自定义动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation([
      // 淡入
      {
        property: 'opacity',
        from: 0,
        to: 1,
        duration: 1,
        easing: 'easeIn'
      },
      // 缩放进入
      {
        property: 'scaleX',
        from: 0,
        to: 1.2,
        duration: 1,
        easing: 'easeOut'
      },
      {
        property: 'scaleY',
        from: 0,
        to: 1.2,
        duration: 1,
        easing: 'easeOut'
      },
      // 回弹效果
      {
        property: 'scaleX',
        from: 1.2,
        to: 1,
        duration: 0.5,
        easing: 'easeIn',
        delay: 1
      },
      {
        property: 'scaleY',
        from: 1.2,
        to: 1,
        duration: 0.5,
        easing: 'easeIn',
        delay: 1
      },
      // 旋转效果
      {
        property: 'rotation',
        from: 0,
        to: 360,
        duration: 2,
        easing: 'easeInOut',
        delay: 1.5
      },
      // 淡出
      {
        property: 'opacity',
        from: 1,
        to: 0,
        duration: 1,
        easing: 'easeOut',
        delay: -1
      }
    ]);
  
  // 示例5: 元素级别的自定义动画
  console.log("📝 示例5: 元素级别的自定义动画");
  const scene5 = mainTrack.createScene({ duration: 4 })
    .addBackground({ color: "#e74c3c" })
    .addText({
      text: "元素级别自定义动画",
      textColor: "#ffffff",
      fontSize: 36,
      x: '50%',
      y: '40%',
      textAlign: 'center'
    })
    .addAnimation(0, {  // 应用到第一个元素（文本）
      property: 'x',
      from: -300,
      to: 0,
      duration: 2,
      easing: 'easeOut',
      isOffset: true
    })
    .addAnimation(0, {  // 为同一个元素添加第二个动画
      property: 'opacity',
      from: 0,
      to: 1,
      duration: 1.5,
      easing: 'easeIn'
    });
  
  // 输出动画配置信息
  console.log("\n📋 动画配置检查:");
  console.log("场景1动画数量:", scene1.animations ? scene1.animations.length : 0);
  console.log("场景2动画数量:", scene2.animations ? scene2.animations.length : 0);
  console.log("场景3动画数量:", scene3.animations ? scene3.animations.length : 0);
  console.log("场景4动画数量:", scene4.animations ? scene4.animations.length : 0);
  console.log("场景5元素动画数量:", scene5.elements[0].animations ? scene5.elements[0].animations.length : 0);
  
  console.log("\n🎬 开始渲染视频...");
  const outputPath = await builder.render();
  
  console.log("🎉 自定义动画示例完成！");
  console.log(`📁 输出文件: ${outputPath}`);
  console.log("\n✨ 自定义动画使用方式:");
  console.log("1. 直接传入动画配置对象");
  console.log("2. 传入动画配置数组（多属性）");
  console.log("3. 基于预设动画覆盖参数");
  console.log("4. 元素级别的自定义动画");
  console.log("5. 复杂动画组合");
}

// 运行示例
if (import.meta.url === `file://${process.argv[1]}`) {
  customAnimationDemo().catch(console.error);
}

export { customAnimationDemo };
