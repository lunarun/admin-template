# 图片上传组件

## 简介

该组件是图片上传组件，支持多图和单图上传，支持本地预览等功能。
具体 demo 可以参考 src/views/test-page 路径下的实例

<hr>

## Attribute

| 参数                 | 说明                          | 类型    | 可选值             | 默认值          |
| -------------------- | ----------------------------- | ------- | ------------------ | --------------- |
| backgroundSize       | 图片显示形式                  | String  | cover/contain      | contain         |
| imageItemWidth       | 默认显示单元宽度              | Number  | --                 | 120             |
| imageItemHeight      | 默认显示单元高度              | Number  | --                 | 120             |
| imageDeleteControl   | 是否显示删除图标              | Boolean | --                 | true            |
| imageExchangeControl | 是否显示替换图标              | Boolean | --                 | true            |
| image                | 图片传入对象                  | Object  | --                 | 具体结构看 demo |
| uploadStyle          | 上传图片的形式                | String  | single/ multi      | single          |
| direction            | 图片的放置顺序                | String  | vertical/landscape | landscape       |
| format               | 图片格式                      | Number  | --                 | 2               |
| maxNum               | 多图模式最多上传 图片数量限制 | Number  | --                 | 10              |
| tailor               | 图片是否显示裁剪选项          | Boolean | --                 | false           |
| singleProgress       | 单图进度条显示                | Boolean | --                 | false           |
| uploadImageInfo      | 上传文件信息显示              | Boolean | --                 | false           |
| cropperRate          | 裁剪比例                      | Array   | --                 | [1, 1]          |

<hr>

## Events

| 参数         | 说明         | 类型     | 可选值 | 默认值 |
| ------------ | ------------ | -------- | ------ | ------ |
| finishUpload | 上传结束回调 | Function | --     | --     |

## Method (通过获取组件节点进行调用)

| 参数           | 说明             | 类型 | 可选值 | 默认值 |
| -------------- | ---------------- | ---- | ------ | ------ |
| uploaderSubmit | 触发图片上传方法 | --   | --     | --     |
| uploadAbort    | 中断图片上传方法 | --   | --     | --     |
