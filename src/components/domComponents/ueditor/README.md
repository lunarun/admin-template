### 富文本编辑器

## 在 UEditor 基础上进行封装，加进了图片、视频上传弹窗

### 使用说明

#### 基础使用

```
// 页面直接使用
import uEditor from '@/components/ueditor';

<u-editor ref="editor-content" @editor-input="onInputContent"></u-editor>

```

---

## API

### Attributes

| 参数            | 说明                          | 类型    | 可选值 | 默认值 |
| --------------- | ----------------------------- | ------- | ------ | ------ |
| isImageSetting  | 插入图片是否需要配置项        | Boolean | --     | false  |
| uploadVideoType | 上传视频，获取七牛配置的 type | String  | --     | --     |

### Events

| 参数         | 说明                                | 类型           | 可选值 | 默认值 |
| ------------ | ----------------------------------- | -------------- | ------ | ------ |
| editor-input | 输入完成后的回调(text 为输入的文本) | Function(text) | --     |

---
