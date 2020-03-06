<style lang="scss">
.multi-preview {
  display: block;
  margin: 0 auto;
  height: 100%;
}
.el-carousel__button {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  border: 1px grey solid;
  background: grey;
  opacity: 1;
}
.el-carousel__indicator.is-active button {
  background: rgb(0, 0, 0);
}
.footer {
  text-align: right;
}
</style>

<template>
  <!-- 图片预览 -->
  <yc-dialog
    title="多图片预览"
    :show-close="true"
    :visible.sync="dialogVisible"
  >
    <el-carousel
      height="500px"
      ref="carousel"
      v-if="refreshCarousel"
      arrow="always"
      :initial-index="initialIndex"
    >
      <el-carousel-item v-for="item in list" :key="item.url">
        <img class="multi-preview" :src="item" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="footer" slot="footer">
      <el-button @click="showControl(false)">关闭</el-button>
      <el-button type="primary" @click="openBigImg()">点击查看原图</el-button>
    </div>
  </yc-dialog>
</template>

<script>
import { openBigImgJump } from '../common/common.js';

export default {
  name: 'multImagePreview',
  data() {
    return {
      dialogVisible: false,
      refreshCarousel: true,
      // 多图预览第一张显示
      initialIndex: 0,
      list: [],
    };
  },
  props: {},
  watch: {},
  mounted() {},
  methods: {
    operate(list, index) {
      this.list = list;
      this.dialogVisible = true;
      this.refreshCarousel = false;
      this.$nextTick(() => {
        this.refreshCarousel = true;
        this.initialIndex = index;
      });
    },
    showControl(control) {
      this.dialogVisible = control;
    },
    openBigImg() {
      // window.open(this.list[this.$refs.carousel.activeIndex]);
      // window.location.href = this.list[this.$refs.carousel.activeIndex];
      openBigImgJump(this.list[this.$refs.carousel.activeIndex]);
    },
  },
};
</script>
