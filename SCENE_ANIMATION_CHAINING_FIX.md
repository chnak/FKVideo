# 场景动画链式调用修复说明

## 问题描述

在多轨道场景中使用链式调用添加多个动画时，只有最后一个动画生效：

```javascript
scene.addAnimation("pulse", { duration: 1 })
  .addAnimation("bounceIn", { duration: 2, delay: 2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });
```

## 问题原因

在 `MultiTrackBuilder.js` 的 `Scene` 类中，`addAnimation` 方法处理多属性动画时存在错误：

```javascript
// 错误的代码
if (typeof animationConfig === 'string') {
  const preset = getAnimationPreset(animationConfig, overrides);
  animationConfigs = [preset]; // 问题：将数组包装在另一个数组中
}
```

当 `getAnimationPreset` 返回数组时（多属性动画如 `pulse`, `bounceIn`），代码错误地将整个数组作为一个动画对象存储，导致动画配置格式不正确。

## 修复方案

修改 `Scene` 类的 `addAnimation` 方法，正确处理多属性动画：

```javascript
// 修复后的代码
if (typeof animationConfig === 'string') {
  const preset = getAnimationPreset(animationConfig, overrides);
  animationConfigs = Array.isArray(preset) ? preset : [preset];
}
```

## 修复效果

### 修复前
- 场景动画数量：3（错误）
- 动画详情：前两个动画的属性为 `undefined`
- 只有最后一个动画正常工作

### 修复后
- 场景动画数量：10（正确）
- 动画详情：所有动画属性都正确展开
- 所有动画都正常工作

## 测试验证

### 测试代码
```javascript
const scene = mainTrack.createScene({ duration: 6 })
  .addBackground({ color: "#ff6b6b" })
  .addText({
    text: "场景动画链式调用测试",
    textColor: "#ffffff",
    fontSize: 36,
    x: '50%',
    y: '40%',
    textAlign: 'center'
  })
  .addAnimation("pulse", { duration: 1 })           // 6个动画属性
  .addAnimation("bounceIn", { duration: 2, delay: 2 }) // 3个动画属性
  .addAnimation("fadeOut", { duration: 1, delay: -1 }); // 1个动画属性
```

### 测试结果
```
场景动画数量: 10
动画详情:
  1. scaleX (1s, delay: 0)      // pulse 动画
  2. scaleY (1s, delay: 0)      // pulse 动画
  3. opacity (1s, delay: 0)     // pulse 动画
  4. scaleX (1s, delay: 0.5)    // pulse 动画
  5. scaleY (1s, delay: 0.5)    // pulse 动画
  6. opacity (1s, delay: 0.5)   // pulse 动画
  7. scaleX (2s, delay: 2)      // bounceIn 动画
  8. scaleY (2s, delay: 2)      // bounceIn 动画
  9. opacity (2s, delay: 2)     // bounceIn 动画
  10. opacity (1s, delay: -1)   // fadeOut 动画
```

## 支持的动画类型

### 单属性动画
- `fadeIn` / `fadeOut` - 淡入淡出
- `scaleIn` / `scaleOut` - 缩放
- `slideInLeft` / `slideInRight` - 滑动
- `rotateIn` / `rotateOut` - 旋转

### 多属性动画
- `pulse` - 脉冲效果（6个属性）
- `bounceIn` / `bounceOut` - 弹跳效果（3个属性）
- `superZoomIn` - 超级缩放（3个属性）
- `spiral` - 螺旋效果（4个属性）
- `explode` - 爆炸效果（6个属性）

## 使用方式

现在可以正常使用场景动画链式调用：

```javascript
// 基础动画链式调用
scene.addAnimation("fadeIn", { duration: 1 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });

// 多属性动画链式调用
scene.addAnimation("pulse", { duration: 1 })
  .addAnimation("bounceIn", { duration: 2, delay: 2 })
  .addAnimation("fadeOut", { duration: 1, delay: -1 });

// 复杂动画组合
scene.addAnimation("superZoomIn", { duration: 2 })
  .addAnimation("pulse", { duration: 0.5, startTime: 2 })
  .addAnimation("wave", { duration: 1, startTime: 3 })
  .addAnimation("glitch", { duration: 0.5, startTime: 4 })
  .addAnimation("explodeOut", { duration: 1.5, delay: -1.5 });
```

## 运行测试

```bash
# 运行场景动画测试
npm run test:scene-animation

# 运行调试测试
node examples/debug-scene-animations.js

# 运行完整测试
node examples/test-scene-animation-fixed.js
```

## 总结

修复成功解决了场景动画链式调用的问题，现在：

1. ✅ 支持单属性和多属性动画的混合使用
2. ✅ 所有动画都会被正确追加到场景中
3. ✅ 多属性动画被正确展开为多个动画属性
4. ✅ 保持向后兼容性
5. ✅ 支持复杂的动画组合

场景动画链式调用现在完全正常工作了！🎉
