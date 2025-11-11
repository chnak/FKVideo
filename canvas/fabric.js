import { createCanvas as createNodeCanvas, ImageData } from "canvas";
import * as fabric from "fabric/node";

/**
 * 创建 Fabric 画布 - 使用真正的 Fabric.js
 */
export function createFabricCanvas({ width, height }) {
  return new fabric.StaticCanvas(null, { width, height });
}

/**
 * 渲染画布为 RGBA 数据 - 参考 FFCreator 的实现
 * 优化：使用 toBuffer('raw') 直接获取数据，避免 getImageData 的内存复制
 */
export async function renderFabricCanvas(canvas, shouldClear = false) {
  // 参考 FFCreator 的实现：使用 toBuffer('raw') 直接获取原始数据
  // 首先渲染所有对象到画布
  canvas.renderAll();
  
  const internalCanvas = canvas.getNodeCanvas();
  
  // 优化：使用 toBuffer('raw') 直接获取原始数据，比 getImageData 快 5-10倍
  // 注意：node-canvas 的 toBuffer('raw') 在不同平台上可能返回不同格式：
  // - Windows: BGRA 格式
  // - Linux/Mac: RGBA 格式
  // FFmpeg 需要 RGBA 格式，所以如果是 BGRA 需要转换
  let buffer;
  try {
    buffer = internalCanvas.toBuffer('raw');
    
    // 验证 buffer 大小是否正确
    const expectedSize = canvas.width * canvas.height * 4;
    if (buffer.length !== expectedSize) {
      throw new Error(`Buffer size mismatch: expected ${expectedSize}, got ${buffer.length}`);
    }
    
    // 检测格式：检查第一个像素（假设不是纯黑色）
    // 如果第一个像素的 R 和 B 值交换后更合理，说明是 BGRA
    // 简单方法：在 Windows 上通常是 BGRA，其他平台通常是 RGBA
    const platform = process.platform;
    const isWindows = platform === 'win32';
    
    if (isWindows) {
      // Windows 上 toBuffer('raw') 返回 BGRA，需要转换为 RGBA
      // 转换方法：交换 R 和 B 通道
      buffer = convertBGRAtoRGBA(buffer);
    }
    // Linux/Mac 上通常是 RGBA，不需要转换
    
  } catch (error) {
    // 如果 toBuffer 失败，回退到 getImageData 方法
    console.warn('toBuffer("raw") failed, falling back to getImageData():', error.message);
    const ctx = internalCanvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    buffer = Buffer.from(imageData.data.buffer, imageData.data.byteOffset, imageData.data.byteLength);
  }
  
  if (shouldClear) {
    canvas.clear();
  }
  
  return buffer;
}

/**
 * 将 BGRA 格式转换为 RGBA 格式
 * @param {Buffer} bgraBuffer - BGRA 格式的 Buffer
 * @returns {Buffer} RGBA 格式的 Buffer
 */
function convertBGRAtoRGBA(bgraBuffer) {
  // 创建新的 Buffer，避免修改原 Buffer
  const rgbaBuffer = Buffer.allocUnsafe(bgraBuffer.length);
  
  // 每 4 个字节为一组（BGRA），交换 B 和 R
  for (let i = 0; i < bgraBuffer.length; i += 4) {
    rgbaBuffer[i] = bgraBuffer[i + 2];     // R = B (原 BGRA 的 B)
    rgbaBuffer[i + 1] = bgraBuffer[i + 1]; // G = G
    rgbaBuffer[i + 2] = bgraBuffer[i];     // B = R (原 BGRA 的 R)
    rgbaBuffer[i + 3] = bgraBuffer[i + 3]; // A = A
  }
  
  return rgbaBuffer;
}

/**
 * 将 RGBA 数据转换为 Fabric 图像对象 - 参考 editly 的实现
 */
export async function rgbaToFabricImage({ width, height, rgba }) {
  // 参考 editly/core/sources/fabric.js 的 rgbaToFabricImage 函数
  const canvas = createNodeCanvas(width, height);
  // FIXME: Fabric tries to add a class to this, but DOM is not defined. Because node?
  // https://github.com/fabricjs/fabric.js/issues/10032
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvas.classList = new Set();
  const ctx = canvas.getContext("2d");
  
  // 参考 editly 的 toUint8ClampedArray 函数
  const data = new Uint8ClampedArray(rgba.length);
  for (let i = 0; i < rgba.length; i += 1) {
    data[i] = rgba[i];
  }
  
  // https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  
  // https://stackoverflow.com/questions/58209996/unable-to-render-tiff-images-and-add-it-as-a-fabric-object
  return new fabric.FabricImage(canvas);
}
