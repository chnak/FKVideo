/**
 * CommonJS require 使用示例
 * 运行: node examples/require-example.js
 */

const { VideoMaker, getTextElement, getAnimationManager } = require("../index.cjs");

async function createVideoWithRequire() {
  console.log("使用CommonJS require创建视频...\n");

  try {
    // 异步获取需要的类
    console.log("1. 获取TextElement和AnimationManager类...");
    const TextElement = await getTextElement();
    const { AnimationManager } = await getAnimationManager();
    
    console.log("✅ 类获取成功");
    console.log("   TextElement:", typeof TextElement);
    console.log("   AnimationManager:", typeof AnimationManager);

    // 创建视频制作器
    console.log("\n2. 创建VideoMaker实例...");
    const videoMaker = new VideoMaker({
      outPath: "output/require-example.mp4",
      width: 1920,
      height: 1080,
      fps: 30,
      elements: [
        // 背景
        {
          type: "image",
          source: "../assets/img1.jpg",
          duration: 6,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1
        },
        
        // 主标题
        {
          type: "title",
          text: "CommonJS 支持示例",
          textColor: "#ffffff",
          position: "center",
          zoomDirection: "in",
          zoomAmount: 0.3,
          duration: 3,
          x: 400,
          y: 200
        },
        
        // 副标题
        {
          type: "title",
          text: "使用 require() 语法",
          textColor: "#4ecdc4",
          textAlign: "center",
          textBaseline: "center",
          duration: 3,
          x: 400,
          y: 400
        },
        
        // 动画文本
        {
          type: "title",
          text: "FKVideo 支持双模块系统",
          textColor: "#ff6b6b",
          position: "bottom",
          split: "word",
          splitDelay: 0.3,
          splitDuration: 0.5,
          duration: 6,
          x: 400,
          y: 500
        }
      ]
    });

    console.log("✅ VideoMaker实例创建成功");

    // 监听事件
    videoMaker.on("start", () => {
      console.log("\n3. 开始渲染视频...");
    });

    videoMaker.on("progress", (progress) => {
      console.log(`   渲染进度: ${progress}%`);
    });

    videoMaker.on("complete", (outputPath) => {
      console.log(`✅ 视频渲染完成: ${outputPath}`);
    });

    videoMaker.on("error", (error) => {
      console.error("❌ 渲染失败:", error);
    });

    // 开始渲染
    const outputPath = await videoMaker.start();
    console.log(`\n🎉 视频已保存到: ${outputPath}`);

  } catch (error) {
    console.error("❌ 创建视频失败:", error);
  } finally {
    // 清理资源
    if (videoMaker) {
      await videoMaker.close();
    }
  }
}

// 运行示例
createVideoWithRequire().catch(console.error);
