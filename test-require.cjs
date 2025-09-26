/**
 * 测试CommonJS require支持
 * 注意：此文件必须使用 .cjs 扩展名或 package.json 中设置 "type": "commonjs"
 */

console.log("测试FKVideo的CommonJS支持...\n");

try {
  // 测试基本require
  console.log("1. 测试基本require...");
  const { VideoMaker } = require("./index.cjs");
  console.log("✅ VideoMaker类导入成功");
  console.log("   VideoMaker类型:", typeof VideoMaker);
  console.log("   VideoMaker是否为函数:", typeof VideoMaker === "function");

  // 测试创建VideoMaker实例
  console.log("\n2. 测试创建VideoMaker实例...");
  const videoMaker = new VideoMaker({
    outPath: "output/test-require.mp4",
    width: 1920,
    height: 1080,
    fps: 30,
    elements: [
      {
        type: "text",
        text: "测试CommonJS支持",
        font: "48px Arial",
        fillColor: "#ffffff",
        duration: 2,
        x: 960,
        y: 540
      }
    ]
  });
  console.log("✅ VideoMaker实例创建成功");
  console.log("   实例类型:", typeof videoMaker);
  console.log("   实例方法:", Object.getOwnPropertyNames(Object.getPrototypeOf(videoMaker)));

  // 测试异步导入函数
  videoMaker.start().then(()=>{
    console.log("✅ 视频渲染完成");
  }).catch((error)=>{
    console.error("❌ 视频渲染失败:", error);
  });

  console.log("\n✅ 所有测试完成！FKVideo已成功支持CommonJS require语法");
  console.log("\n使用示例:");
  console.log("const { VideoMaker } = require('FKvideo');");
  console.log("const videoMaker = new VideoMaker({...});");

} catch (error) {
  console.error("❌ 测试失败:", error.message);
  console.error("错误堆栈:", error.stack);
  process.exit(1);
}
