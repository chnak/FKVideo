import { MultiTrackBuilder, createMultiTrackBuilder } from "../utils/MultiTrackBuilder.js";

/**
 * 场景动画测试
 * 测试场景级别的动画功能
 */
async function sceneAnimationTest() {
  console.log("开始场景动画测试...");
  
  try {
    const builder = createMultiTrackBuilder({
      width: 1280,
      height: 720,
      fps: 30,
      outPath: "output/scene-animation-test.mp4"
    });

    // 创建主轨道
    const mainTrack = builder.createTrack({ zIndex: 1 });

    // 场景1 - 测试场景动画
    console.log("创建场景1 - 场景动画...");
    const scene1 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#ff6b6b" })
      .addText({
        text: "场景动画测试",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addSubtitle({
        text: "整个场景的动画",
        textColor: "#ffffff",
        fontSize: 20,
        x: '50%',
        y: '60%',
        startTime: 0.5,
        duration: 3.5
      });

    // 为整个场景添加动画
    scene1.addAnimation("fadeIn", { duration: 2 });
    scene1.addAnimation("scaleIn", { duration: 1.5, startTime: 1 });

    // 场景2 - 测试多个场景动画
    console.log("创建场景2 - 多个场景动画...");
    const scene2 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#4ecdc4" })
      .addText({
        text: "多个场景动画",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addSubtitle({
        text: "场景级别的动画效果",
        textColor: "#ffffff",
        fontSize: 20,
        x: '50%',
        y: '60%',
        startTime: 0.5,
        duration: 3.5
      });

    // 为整个场景添加多个动画
    scene2.addAnimation("bounceIn", { duration: 2 });
    scene2.addAnimation("rotateIn", { duration: 2, startTime: 1 });

    // 场景3 - 测试混合使用
    console.log("创建场景3 - 混合使用...");
    const scene3 = mainTrack.createScene({ duration: 4 })
      .addBackground({ color: "#45b7d1" })
      .addText({
        text: "混合使用",
        textColor: "#ffffff",
        fontSize: 36,
        x: '50%',
        y: '40%',
        textAlign: 'center'
      })
      .addSubtitle({
        text: "场景动画 + 元素动画",
        textColor: "#ffffff",
        fontSize: 20,
        x: '50%',
        y: '60%',
        startTime: 0.5,
        duration: 3.5
      });

    // 场景动画
    scene3.addAnimation("slideInLeft", { duration: 2 });
    
    // 元素动画（传统方式）
    scene3.addAnimation(1, "fadeIn", { duration: 1.5, startTime: 1 });

    // 添加过渡效果
    builder.addTransition("fade", { duration: 1, startTime: 3.5 });
    builder.addTransition("slideLeft", { duration: 1, startTime: 7.5 });

    // 渲染视频
    console.log("开始渲染视频...");
    const outputPath = await builder.render();
    console.log(`✅ 场景动画测试完成: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ 场景动画测试失败:", error);
  }
}

// 运行测试
if (import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  sceneAnimationTest();
}

export { sceneAnimationTest };
