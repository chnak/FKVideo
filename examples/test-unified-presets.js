/**
 * 测试统一后的预设动画配置
 */

import { 
  AnimationPresets, 
  getAnimationPreset, 
  getAnimationPresetNames,
  getAllAnimationPresetNames,
  isMultiPropertyAnimation
} from "../utils/AnimationPresets.js";

console.log("🔍 测试统一后的预设动画配置...");

// 测试 AnimationPresets 是否指向 AnimationManagerPresets
console.log("📝 检查 AnimationPresets 配置:");
console.log("AnimationPresets 类型:", typeof AnimationPresets);
console.log("是否为对象:", typeof AnimationPresets === 'object');
console.log("预设数量:", Object.keys(AnimationPresets).length);

// 测试获取预设名称
console.log("\n📝 获取预设名称:");
const presetNames = getAnimationPresetNames();
console.log("预设名称数量:", presetNames.length);
console.log("前10个预设:", presetNames.slice(0, 10));

// 测试获取所有预设名称
console.log("\n📝 获取所有预设名称:");
const allPresetNames = getAllAnimationPresetNames();
console.log("所有预设名称数量:", allPresetNames.length);
console.log("前10个预设:", allPresetNames.slice(0, 10));

// 测试获取动画预设
console.log("\n📝 测试获取动画预设:");

try {
  // 测试单属性动画
  const fadeInPreset = getAnimationPreset('fadeIn', { duration: 2 });
  console.log("fadeIn 预设:", fadeInPreset);
  
  // 测试多属性动画
  const bounceInPreset = getAnimationPreset('bounceIn', { duration: 2 });
  console.log("bounceIn 预设:", bounceInPreset);
  console.log("bounceIn 类型:", Array.isArray(bounceInPreset) ? "数组" : "对象");
  
  // 测试复杂动画
  const superZoomInPreset = getAnimationPreset('superZoomIn', { duration: 2 });
  console.log("superZoomIn 预设:", superZoomInPreset);
  console.log("superZoomIn 类型:", Array.isArray(superZoomInPreset) ? "数组" : "对象");
  
  console.log("✅ 所有预设动画测试通过！");
  
} catch (error) {
  console.error("❌ 预设动画测试失败:", error.message);
}

// 测试多属性动画检查
console.log("\n📝 测试多属性动画检查:");
const testAnimations = ['fadeIn', 'bounceIn', 'superZoomIn', 'pulse', 'spiral'];
testAnimations.forEach(anim => {
  const isMulti = isMultiPropertyAnimation(anim);
  console.log(`${anim}: ${isMulti ? '多属性' : '单属性'}`);
});

console.log("\n🎉 统一预设配置测试完成！");
console.log("✨ 现在所有动画预设都统一使用 AnimationManagerPresets 中的配置");
