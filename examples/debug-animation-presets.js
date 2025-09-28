/**
 * 调试动画预设问题
 */

import { getAnimationPreset, AnimationPresets } from "../utils/AnimationPresets.js";

console.log("🔍 调试动画预设问题...");

// 测试基础预设
console.log("\n📝 测试基础预设:");
try {
  const fadeIn = getAnimationPreset("fadeIn", { duration: 2 });
  console.log("fadeIn:", JSON.stringify(fadeIn, null, 2));
} catch (error) {
  console.error("fadeIn 错误:", error.message);
}

// 测试 AnimationManager 预设
console.log("\n📝 测试 AnimationManager 预设:");
try {
  const bounceIn = getAnimationPreset("bounceIn", { duration: 2 });
  console.log("bounceIn:", JSON.stringify(bounceIn, null, 2));
  console.log("bounceIn 类型:", Array.isArray(bounceIn) ? "数组" : "对象");
} catch (error) {
  console.error("bounceIn 错误:", error.message);
}

// 测试多属性动画
console.log("\n📝 测试多属性动画:");
try {
  const superZoomIn = getAnimationPreset("superZoomIn", { duration: 2 });
  console.log("superZoomIn:", JSON.stringify(superZoomIn, null, 2));
  console.log("superZoomIn 类型:", Array.isArray(superZoomIn) ? "数组" : "对象");
} catch (error) {
  console.error("superZoomIn 错误:", error.message);
}

// 检查预设是否存在
console.log("\n📝 检查预设是否存在:");
console.log("AnimationPresets 中的 bounceIn:", !!AnimationPresets.bounceIn);
console.log("AnimationPresets 中的 superZoomIn:", !!AnimationPresets.superZoomIn);
console.log("AnimationPresets 中的 fadeIn:", !!AnimationPresets.fadeIn);

// 检查预设类型
console.log("\n📝 检查预设类型:");
console.log("bounceIn 类型:", Array.isArray(AnimationPresets.bounceIn) ? "数组" : "对象");
console.log("superZoomIn 类型:", Array.isArray(AnimationPresets.superZoomIn) ? "数组" : "对象");
console.log("fadeIn 类型:", Array.isArray(AnimationPresets.fadeIn) ? "数组" : "对象");
