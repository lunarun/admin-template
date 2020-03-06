<style lang="scss">
.pre-image {
  max-width: 400px;
  display: block;
  margin: 0 auto;
  // width: 100%;
}
.footer {
  text-align: right;
}
</style>

<template>
  <!-- 图片预览 -->
  <yc-dialog title="单图预览" :show-close="true" :visible.sync="dialogVisible">
    <img class="pre-image" :src="dialogImageUrl" alt />
    <div class="footer" slot="footer">
      <el-button @click="showControl(false)">关闭</el-button>
      <el-button type="primary" @click="openBigImg(dialogImageUrl)"
        >点击查看原图</el-button
      >
    </div>
  </yc-dialog>
</template>

<script>
import Vue from 'vue';
import { openBigImgJump } from '../common/common.js';

export default {
  name: 'singleImagePreview',
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
    };
  },
  props: {},
  watch: {},
  mounted() {},
  methods: {
    operate(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    showControl(control) {
      this.dialogVisible = control;
    },
    openBigImg(url) {
      // window.open(url);
      openBigImgJump(url);
    },
  },
};
</script>
