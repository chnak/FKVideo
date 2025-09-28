/**
 * 检查 AnimationManagerPresets.js 中所有动画的 easing 参数
 */

import { AnimationManagerPresets } from "../utils/AnimationManagerPresets.js";

console.log("🔍 检查 AnimationManagerPresets.js 中所有动画的 easing 参数...\n");

// 定义正确的 easing 规则
const easingRules = {
  // 进入动画 (In) - 应该使用 easeOut 或 easeInOut
  fadeIn: 'easeIn',           // 淡入：开始慢后加快
  zoomIn: 'easeOut',          // 缩放进入：开始快后减慢
  rotateIn: 'easeOut',        // 旋转进入：开始快后减慢
  slideInLeft: 'easeOut',     // 滑入：开始快后减慢
  slideInRight: 'easeOut',    // 滑入：开始快后减慢
  slideInTop: 'easeOut',      // 滑入：开始快后减慢
  slideInBottom: 'easeOut',   // 滑入：开始快后减慢
  
  // 退出动画 (Out) - 应该使用 easeIn 或 easeInOut
  fadeOut: 'easeOut',         // 淡出：开始快后减慢
  zoomOut: 'easeIn',          // 缩放退出：开始慢后加快
  rotateOut: 'easeIn',        // 旋转退出：开始慢后加快
  slideOutLeft: 'easeIn',     // 滑出：开始慢后加快
  slideOutRight: 'easeIn',    // 滑出：开始慢后加快
  slideOutTop: 'easeIn',      // 滑出：开始慢后加快
  slideOutBottom: 'easeIn',   // 滑出：开始慢后加快
};

// 检查单属性动画
console.log("📝 检查单属性动画:");
const singlePropertyAnimations = [];
Object.entries(AnimationManagerPresets).forEach(([name, config]) => {
  if (!Array.isArray(config)) {
    singlePropertyAnimations.push({ name, config });
  }
});

singlePropertyAnimations.forEach(({ name, config }) => {
  const currentEasing = config.easing;
  const expectedEasing = easingRules[name];
  
  if (expectedEasing) {
    const isCorrect = currentEasing === expectedEasing;
    const status = isCorrect ? "✅" : "❌";
    console.log(`${status} ${name}: ${currentEasing} ${isCorrect ? '' : `(应该是 ${expectedEasing})`}`);
  } else {
    console.log(`ℹ️  ${name}: ${currentEasing} (无预设规则)`);
  }
});

// 检查多属性动画
console.log("\n📝 检查多属性动画:");
const multiPropertyAnimations = [];
Object.entries(AnimationManagerPresets).forEach(([name, config]) => {
  if (Array.isArray(config)) {
    multiPropertyAnimations.push({ name, config });
  }
});

multiPropertyAnimations.forEach(({ name, config }) => {
  console.log(`\n🔸 ${name}:`);
  config.forEach((prop, index) => {
    console.log(`  属性 ${index + 1} (${prop.property}): ${prop.easing}`);
  });
});

// 总结问题
console.log("\n📋 总结:");
const issues = [];

// 检查已知问题
if (AnimationManagerPresets.fadeOut.easing !== 'easeOut') {
  issues.push(`fadeOut 的 easing 应该是 'easeOut'，当前是 '${AnimationManagerPresets.fadeOut.easing}'`);
}

if (AnimationManagerPresets.zoomOut.easing !== 'easeIn') {
  issues.push(`zoomOut 的 easing 应该是 'easeIn'，当前是 '${AnimationManagerPresets.zoomOut.easing}'`);
}

if (AnimationManagerPresets.rotateOut.easing !== 'easeIn') {
  issues.push(`rotateOut 的 easing 应该是 'easeIn'，当前是 '${AnimationManagerPresets.rotateOut.easing}'`);
}

if (issues.length === 0) {
  console.log("✅ 所有动画的 easing 参数都正确！");
} else {
  console.log("❌ 发现以下问题:");
  issues.forEach(issue => console.log(`   - ${issue}`));
}

console.log("\n🎯 修复建议:");
console.log("1. fadeOut: easing 应该是 'easeOut' (开始快后减慢)");
console.log("2. zoomOut: easing 应该是 'easeIn' (开始慢后加快)");
console.log("3. rotateOut: easing 应该是 'easeIn' (开始慢后加快)");
console.log("4. 所有 slideOut*: easing 应该是 'easeIn' (开始慢后加快)");
