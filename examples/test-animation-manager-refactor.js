/**
 * 测试重构后的 AnimationManager
 */

import { AnimationManager } from "../animations/AnimationManager.js";

console.log("🔍 测试重构后的 AnimationManager...");

const manager = new AnimationManager();

// 测试获取可用预设
console.log("📝 获取可用预设动画:");
const presets = manager.getAvailablePresets();
console.log(`发现 ${presets.length} 个预设动画`);
console.log("前10个预设:", presets.slice(0, 10));

// 测试应用预设动画
console.log("\n📝 测试应用预设动画:");

try {
  // 测试单属性动画
  const fadeInAnim = manager.applyPreset('fadeIn', { duration: 2 });
  console.log("fadeIn 动画:", fadeInAnim);
  
  // 测试多属性动画
  const bounceInAnim = manager.applyPreset('bounceIn', { duration: 2 });
  console.log("bounceIn 动画:", bounceInAnim);
  console.log("bounceIn 类型:", Array.isArray(bounceInAnim) ? "数组" : "对象");
  
  // 测试复杂动画
  const superZoomInAnim = manager.applyPreset('superZoomIn', { duration: 2 });
  console.log("superZoomIn 动画:", superZoomInAnim);
  console.log("superZoomIn 类型:", Array.isArray(superZoomInAnim) ? "数组" : "对象");
  
  console.log("✅ 所有预设动画测试通过！");
  
} catch (error) {
  console.error("❌ 预设动画测试失败:", error.message);
}

// 测试添加自定义预设
console.log("\n📝 测试添加自定义预设:");
manager.addPreset('customFade', {
  property: 'opacity',
  from: 0,
  to: 1,
  duration: 1,
  easing: 'easeInOut'
});

const customAnim = manager.applyPreset('customFade', { duration: 2 });
console.log("自定义预设动画:", customAnim);

console.log("\n🎉 AnimationManager 重构测试完成！");
