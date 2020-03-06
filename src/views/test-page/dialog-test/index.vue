<style lang="scss">
.mt10 {
  margin-top: 10px;
}
</style>

<template>
  <section>
    <yc-dialog
      title="弹窗测试"
      class="w800"
      :visible="dialogShow"
      :show-close="true"
      >弹窗测试body</yc-dialog
    >
    <el-button @click="showControl(true)" size="small" type="primary"
      >点击显示弹窗</el-button
    >
    <el-button @click="showControl(false)" size="small">点击关闭弹窗</el-button>
    <div class="mt10">
      <el-button @click="testImagePreview" size="small"
        >点击测试多图预览</el-button
      >
    </div>
    <div class="mt10">
      <el-button @click="testSingleImagePreview" size="small"
        >点击测试单图预览</el-button
      >
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  components: {},
  mounted() {},
  methods: {
    showControl(control) {
      this.dialogShow = control;
    },
    /**
     * 测试图片预览
     */
    testImagePreview() {
      const list = [
        'https://img.suv666.com/ycyh/material/329ac1fa943f0eedd8cc6cdea638a43f.jpg-1x1_200x200',
        'https://img.suv666.com/ycyh/material/05943258531c8fe7fcb6f3dfa8f43a13.jpg-1x1_200x200',
        'https://img.suv666.com/ycyh/material/ba1c23191e65bbdb063a66e2c121169e.png',
      ];
      const index = 2;
      this.$multImagePreview(list, index);
    },
    testSingleImagePreview() {
      const url =
        'https://img.suv666.com/ycyh/material/ba1c23191e65bbdb063a66e2c121169e.png';
      this.$singleImagePreview(url);
    },
  },
};
</script>
