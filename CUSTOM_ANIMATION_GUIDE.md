# 自定义动画使用指南

## 概述

`.addAnimation()` 方法支持多种自定义动画方式，包括直接传入动画配置、多属性动画、基于预设覆盖参数等。

## 使用方式

### 1. 单属性自定义动画

直接传入动画配置对象：

```javascript
scene.addAnimation({
  property: 'opacity',    // 动画属性
  from: 0,               // 起始值
  to: 1,                 // 结束值
  duration: 2,           // 持续时间（秒）
  easing: 'easeInOut',   // 缓动函数
  delay: 0.5,            // 延迟时间（秒）
  startTime: 1           // 开始时间（秒）
});
```

### 2. 多属性自定义动画

传入动画配置数组：

```javascript
scene.addAnimation([
  {
    property: 'opacity',
    from: 0,
    to: 1,
    duration: 2,
    easing: 'easeInOut'
  },
  {
    property: 'scaleX',
    from: 0.5,
    to: 1,
    duration: 2,
    easing: 'easeOut'
  },
  {
    property: 'rotation',
    from: -45,
    to: 0,
    duration: 1.5,
    easing: 'easeInOut',
    delay: 0.5
  }
]);
```

### 3. 基于预设动画覆盖参数

使用预设动画名称，覆盖部分参数：

```javascript
// 基于 fadeIn 预设，覆盖参数
scene.addAnimation('fadeIn', { 
  duration: 3,        // 覆盖持续时间
  delay: 0.5,         // 添加延迟
  easing: 'easeOut'   // 覆盖缓动函数
});

// 基于 bounceIn 预设，覆盖参数
scene.addAnimation('bounceIn', {
  duration: 1.5,      // 所有属性都使用新的持续时间
  delay: 0.5          // 所有属性都添加延迟
});
```

### 4. 元素级别的自定义动画

指定元素索引，为特定元素添加动画：

```javascript
scene.addAnimation(0, {  // 应用到第一个元素
  property: 'x',
  from: -300,
  to: 0,
  duration: 2,
  easing: 'easeOut',
  isOffset: true
});

// 为同一个元素添加多个动画
scene.addAnimation(0, {
  property: 'opacity',
  from: 0,
  to: 1,
  duration: 1.5,
  easing: 'easeIn'
});
```

## 支持的动画属性

### 基础属性
- `opacity` - 透明度 (0-1)
- `x` - X 坐标
- `y` - Y 坐标
- `scaleX` - X 轴缩放
- `scaleY` - Y 轴缩放
- `rotation` - 旋转角度（度）

### 颜色属性
- `textColor` - 文字颜色
- `fillColor` - 填充颜色
- `strokeColor` - 描边颜色

### 其他属性
- `fontSize` - 字体大小
- `width` - 宽度
- `height` - 高度

## 支持的缓动函数

### 基础缓动
- `linear` - 线性
- `easeIn` - 缓入
- `easeOut` - 缓出
- `easeInOut` - 缓入缓出

### 特殊缓动
- `easeInBounce` - 弹跳进入
- `easeOutBounce` - 弹跳退出
- `spring` - 弹簧效果
- `elastic` - 弹性效果

## 参数说明

### 必需参数
- `property` - 动画属性名称
- `from` - 起始值
- `to` - 结束值
- `duration` - 持续时间（秒）

### 可选参数
- `easing` - 缓动函数（默认：'linear'）
- `delay` - 延迟时间（秒，默认：0）
- `startTime` - 开始时间（秒，默认：0）
- `isOffset` - 是否为相对偏移（默认：false）

## 使用示例

### 示例1：淡入效果
```javascript
scene.addAnimation({
  property: 'opacity',
  from: 0,
  to: 1,
  duration: 2,
  easing: 'easeIn'
});
```

### 示例2：缩放进入
```javascript
scene.addAnimation([
  {
    property: 'scaleX',
    from: 0,
    to: 1,
    duration: 1.5,
    easing: 'easeOut'
  },
  {
    property: 'scaleY',
    from: 0,
    to: 1,
    duration: 1.5,
    easing: 'easeOut'
  }
]);
```

### 示例3：滑动进入
```javascript
scene.addAnimation({
  property: 'x',
  from: -300,
  to: 0,
  duration: 1,
  easing: 'easeOut',
  isOffset: true
});
```

### 示例4：旋转效果
```javascript
scene.addAnimation({
  property: 'rotation',
  from: 0,
  to: 360,
  duration: 2,
  easing: 'easeInOut'
});
```

### 示例5：复杂组合动画
```javascript
scene.addAnimation([
  // 淡入
  {
    property: 'opacity',
    from: 0,
    to: 1,
    duration: 1,
    easing: 'easeIn'
  },
  // 缩放进入
  {
    property: 'scaleX',
    from: 0,
    to: 1.2,
    duration: 1,
    easing: 'easeOut'
  },
  {
    property: 'scaleY',
    from: 0,
    to: 1.2,
    duration: 1,
    easing: 'easeOut'
  },
  // 回弹效果
  {
    property: 'scaleX',
    from: 1.2,
    to: 1,
    duration: 0.5,
    easing: 'easeIn',
    delay: 1
  },
  {
    property: 'scaleY',
    from: 1.2,
    to: 1,
    duration: 0.5,
    easing: 'easeIn',
    delay: 1
  },
  // 旋转效果
  {
    property: 'rotation',
    from: 0,
    to: 360,
    duration: 2,
    easing: 'easeInOut',
    delay: 1.5
  },
  // 淡出
  {
    property: 'opacity',
    from: 1,
    to: 0,
    duration: 1,
    easing: 'easeOut',
    delay: -1
  }
]);
```

## 链式调用

支持链式调用多个动画：

```javascript
scene.addAnimation('fadeIn', { duration: 1 })
  .addAnimation('pulse', { duration: 0.5, startTime: 1 })
  .addAnimation('fadeOut', { duration: 1, delay: -1 });
```

## 运行测试

```bash
# 运行自定义动画示例
node examples/simple-custom-animation.js

# 运行完整自定义动画演示
node examples/custom-animation-demo.js
```

## 注意事项

1. **属性值类型**：确保 `from` 和 `to` 的值类型正确
2. **时间单位**：所有时间参数都以秒为单位
3. **相对偏移**：使用 `isOffset: true` 时，坐标值是相对于当前位置的偏移
4. **延迟时间**：`delay` 为负值时表示相对于元素结束时间的延迟
5. **多属性动画**：数组中的每个动画对象都会同时执行

## 总结

自定义动画提供了极大的灵活性，可以创建各种复杂的动画效果。通过组合不同的属性、缓动函数和时间参数，可以实现几乎任何想要的动画效果！🎉
