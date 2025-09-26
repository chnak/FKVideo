import { VideoMaker } from "./index.js";

const videoMaker = new VideoMaker({
  outPath: "output/output.mp4",
  width: 1920,
  height: 1080,
  fps: 30,
  elements: [
    // {
    //   type: "shape",
    //   shape: "rect",
    //   width: '100%',
    //   height: '100%',
    //   x: '50%',
    //   y: '50%',
    //   fillColor: "#3498db",
    //   duration: 5,
    //   startTime: 0
    // },
    {
      type: "image",
      src: "https://element.eleme.io/static/theme-index-blue.c38b733.png",
      duration: 5,
      x: '50%',
      y: '50%',
      width: '100%',
      height: '100%',
      fit: "cover"
    },
    {
      type: "text",
      text: "Hello World!",
      font: "48px Arial",
      fillColor: "#ffffff",
      duration: 5,
      x: 960,
      y: 540,
      textAlign: "center",
      animations: [
        {
          property: "opacity",
          from: 0,
          to: 1,
          duration: 1,
          easing: "easeIn"
        }
      ]
    }
  ]
});

await videoMaker.start();