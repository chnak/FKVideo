import { VideoMaker } from "../index.js";

async function testSubtitleSimple() {
  console.log("测试简单字幕功能...");
  
  const videoMaker = new VideoMaker({
    outPath: "output/simple-subtitle-test.mp4",
    width: 720,
    height: 1080,
    fps: 30,
    duration: 30,
    elements: [
      // 测试字幕显示
      {
            type: "shape",
            shape: "rectangle",
            fillColor: "blue",
            width: "100%",
            height: "100%",
            duration: 20,
            startTime: 0,
            x: '50%',
            y: '50%'
      },
      {
        type: "subtitle",
        text: "在遥远的夜空里，住着无数闪亮的小星星。它们中最小的那颗叫闪闪，它和别的星星不一样——它还不会眨眼。",
        fontSize: 60,
        textColor: "#ffffff",
        backgroundColor: "rgb(20, 20, 20, 0.3)",
        // audio: "../assets/winxp.mp3",
        position: "bottom",
        volume: 1,
        startTime: 0,
        duration: 10,
        padding: 10
      },
      {
        type: "subtitle",
        text: "你好士大夫大师傅手动阀手动阀士大夫随风倒十分大师傅大师傅但是发的是否",
        fontSize: 60,
        textColor: "#ffffff",
        backgroundColor: "rgb(20, 20, 20, 0.3)",
        // audio: "../assets/winxp.mp3",
        x: '50%',
        y: '50%',
        volume: 1,
        startTime: 0,
        duration: 10,
        padding: 10
      },
      {
        type: "subtitle",
        text: "The United States of America (USA), also known as the United States (U.S.) or America, is a country primarily located in North America. It is a federal republic of 50 states and a federal capital district, Washington, D.C. The 48 contiguous states border Canada to the north and Mexico to the south, with the semi-exclave of Alaska in the northwest and the archipelago of Hawaii in the Pacific Ocean. The United States also asserts sovereignty over five major island territories and various uninhabited islands in Oceania and the Caribbean.[j] It is a megadiverse country, with the world's third-largest land area[c] and third-largest population, exceeding 340 million.",
        fontSize: 60,
        textColor: "#ffffff",
        backgroundColor: "rgb(20, 20, 20, 0.3)",
        // audio: "../assets/winxp.mp3",
        x: '50%',
        y: '30%',
        volume: 1,
        startTime: 0,
        duration: 10,
        padding: 10
      }
    ]
  });

  try {
    await videoMaker.start();
    console.log("简单字幕测试完成: output/subtitle-simple-test.mp4");
  } catch (error) {
    console.error("简单字幕测试失败:", error);
  }
}

testSubtitleSimple();