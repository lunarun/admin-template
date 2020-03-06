<style>
.mt10 {
  margin-top: 10px;
}
</style>

<template>
  <div>
    <!-- 多图上传 -->
    <h3>多图上传</h3>
    <el-button type="primary" @click="testUploadImage"
      >测试上传本地图片</el-button
    >
    <el-button type="success" @click="stopUpload">测试中断上传方法</el-button>
    <el-button @click="testUrl">测试显示当前图片列表</el-button>
    <image-upload
      class="mt10"
      ref="upload-image"
      :image-item-height="multi.imageItemHeight"
      :image-delete-control="multi.imageDeleteControl"
      :image-exchange-control="multi.imageExchangeControl"
      :image-item-width="multi.imageItemWidth"
      :image="multi.image"
      :upload-style="multi.uploadStyle"
      :direction="multi.direction"
      :format="multi.format"
      :size="multi.size"
      :max-num="multi.maxNum"
      :tailor="multi.tailor"
      :single-progress="multi.singleProgress"
      :upload-image-info="multi.uploadImageInfo"
      @finishUpload="finishUpload"
      :cropper-rate="multi.cropperRate"
      :background-size="multi.backgroundSize"
    ></image-upload>

    <!-- 单图上传 -->
    <hr />
    <h3>单图上传</h3>
    <el-button type="primary" @click="testUploadImageSingle"
      >测试单图上传本地图片</el-button
    >
    <el-button type="success" @click="stopUploadSingle"
      >测试单图中断上传方法</el-button
    >
    <el-button @click="testUrlSingle">测试单图显示当前图片列表</el-button>
    <image-upload
      class="mt10"
      ref="upload-image-single"
      :image-item-height="single.imageItemHeight"
      :image-delete-control="single.imageDeleteControl"
      :image-exchange-control="single.imageExchangeControl"
      :image-item-width="single.imageItemWidth"
      :image="single.image"
      :upload-style="single.uploadStyle"
      :direction="single.direction"
      :format="single.format"
      :size="single.size"
      :max-num="single.maxNum"
      :tailor="single.tailor"
      :single-progress="single.singleProgress"
      :upload-image-info="single.uploadImageInfo"
      @finishUpload="finishUpload"
      :cropper-rate="single.cropperRate"
      :background-size="single.backgroundSize"
    ></image-upload>

    <!-- 裁剪demo -->
    <hr />
    <h3>裁剪demo</h3>
    <el-button type="primary" @click="openCropper">点击打开裁剪弹窗</el-button>
    <el-button type="success" @click="getCropperData">获取裁剪数据</el-button>
    <cropper ref="cropper" :options="options"></cropper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multi: {
        imageItemHeight: 240,
        imageItemWidth: 240,
        backgroundSize: 'contain',
        imageDeleteControl: true,
        imageExchangeControl: true,
        uploadStyle: 'multi',
        direction: 'landscape',
        // format: ['JPG', 'PNG'],
        // format: ['JPG'],
        format: [],
        // size: 0.001,
        size: 1,
        maxNum: 14,
        tailor: true,
        singleProgress: true,
        uploadImageInfo: true,
        image: {
          type: 'ycyh_privilege_manage_image',
          imageShowList: [
            'https://img.suv666.com/ycyh/material/329ac1fa943f0eedd8cc6cdea638a43f.jpg-1x1_200x200',
            'https://img.suv666.com/ycyh/material/05943258531c8fe7fcb6f3dfa8f43a13.jpg-1x1_200x200',
            'https://desk-fd.zol-img.com.cn/t_s2560x1600c5/g5/M00/02/04/ChMkJlbKyG6IN4zoAB5phhYg2CYAALICALEmgcAHmme116.jpg',
            'https://img.suv666.com/ycyh/material/ba1c23191e65bbdb063a66e2c121169e.png',
          ],
        },
        cropperRate: [1, 0.618],
      },
      single: {
        imageItemHeight: 240,
        imageItemWidth: 240,
        backgroundSize: 'contain',
        imageDeleteControl: true,
        imageExchangeControl: true,
        uploadStyle: 'single',
        direction: 'landscape',
        // format: ['JPG', 'PNG'],
        // format: ['JPG'],
        format: [],
        // size: 0.001,
        size: 1,
        maxNum: 14,
        tailor: true,
        singleProgress: true,
        uploadImageInfo: true,
        image: {
          type: 'ycyh_privilege_manage_image',
          imageShowList: [
            'https://img.suv666.com/ycyh/material/329ac1fa943f0eedd8cc6cdea638a43f.jpg-1x1_200x200',
          ],
        },
        cropperRate: [1, 0.618],
      },
      // 以下是裁剪参数
      dialogVisible: false,
      options: {
        img:
          'https://img.suv666.com/test/ycyh/news/detail/v22/20190821162509_IC6xAeKq.png',
        fixedNumber: [1, 2],
      },
    };
  },
  methods: {
    testUrl() {
      console.log(this.multi.image);
    },
    /**
     * 测试暴露的上传图片方法
     */
    testUploadImage() {
      this.$nextTick(() => {
        this.$refs['upload-image'].uploaderSubmit();
      });
    },
    stopUpload() {
      this.$nextTick(() => {
        this.$refs['upload-image'].uploadAbort();
      });
    },
    testUrlSingle() {
      console.log(this.single.image);
    },
    /**
     * 测试暴露的上传图片方法
     */
    testUploadImageSingle() {
      this.$nextTick(() => {
        this.$refs['upload-image-single'].uploaderSubmit();
      });
    },
    stopUploadSingle() {
      this.$nextTick(() => {
        this.$refs['upload-image-single'].uploadAbort();
      });
    },
    finishUpload() {
      console.log('上传完成触发的父组件方法');
    },
    /**
     * 点击打开裁剪弹窗
     */
    openCropper() {
      this.$refs.cropper.controlShow(true);
    },
    /**
     * 获取裁剪数据
     */
    getCropperData() {
      console.log(this.options);
    },
  },
  mounted() {},
};
</script>
