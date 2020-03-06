<template>
  <div class="photo__header">
    <div v-if="uploadImageInfo && !isUpload">
      上传{{ fileListLength }}张图片，共{{ fileListSize }}。
    </div>
    <el-progress v-if="uploadImageInfo && isUpload" :percentage="percentage" />
  </div>
</template>
<script>
export default {
  props: {
    // 上传文件信息显示
    uploadImageInfo: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 是否允许上传
    isUpload: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 上传图片列表长度
    fileListLength: {
      type: Number,
      required: false,
      default: () => 0,
    },
    // 上传图片总大小
    fileListSize: {
      type: String,
      required: false,
      default: () => '',
    },
    // 当前进度百分比
    percentage: {
      type: Number,
      required: false,
      default: () => 0,
    },
  },
};
</script>
<style scoped lang="scss">
.photo {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

    .el-progress {
      width: 300px;
    }
  }
}
</style>
