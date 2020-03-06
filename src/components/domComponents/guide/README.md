# 新手引导组件

## 简介

该组件是新手引导组件。

<hr>

## Attribute

| 参数        | 说明                                       | 类型    | 可选值          | 默认值 |
| ----------- | ------------------------------------------ | ------- | --------------- | ------ |
| controlType | in 内部控制显示隐藏， out 外部控制显示隐藏 | String  | in/out          | in     |
| current     | dom 当前提示控制列表                       | Array   | 具体结构看 demo | []     |
| history     | dom 历史提示控制列表                       | Array   | 具体结构看 demo | []     |
| crollAuto   | 是否自动滚动到相应的位置                   | Boolean | true/false      | true   |
| model       | 预览模式 默认 dom 模式 image(图片模式)     | String  | dom/image       | dom    |

<hr>

## Events

| 参数  | 说明           | 类型     | 可选值 | 默认值 |
| ----- | -------------- | -------- | ------ | ------ |
| close | 关闭弹窗的回调 | Function | --     | --     |
| pre   | 上一步的回调   | Function | --     | --     |
| next  | 下一步的回调   | Function | --     | --     |

## Method (通过获取组件节点进行调用)

| 参数      | 说明     | 类型 | 可选值 | 默认值 |
| --------- | -------- | ---- | ------ | ------ |
| updatePos | 刷新位置 | --   | --     | --     |
