<template>
  <div class="photo">
    <!-- 导入图片顶部 -->
    <global-info
      :upload-image-info="uploadImageInfo"
      :isUpload="isUpload"
      :file-list-length="fileListLength"
      :file-list-size="fileListSize"
      :percentage="percentage"
    >
    </global-info>

    <!-- 图片显示主体 -->
    <div
      class="photo__upload-list"
      :class="{
        'photo__upload-vertical': direction === 'vertical',
      }"
    >
      <!-- 显示的item -->
      <preview-item
        :image-item-width="imageItemWidth"
        :background-size="backgroundSize"
        :image-item-height="imageItemHeight"
        :tailor="tailor"
        :file-list="fileList"
        :font-size="fontSize"
        :upload-control="uploadControl"
        :image-delete-control="imageDeleteControl"
        :single-progress="singleProgress"
        @uploadItemDelete="uploadItemDelete"
        @tailorImage="tailorImage"
        @targetIndexSave="targetIndexSave"
        @handlePictureCardPreview="handlePictureCardPreview"
        :dealPreviewImage="dealPreviewImage"
        @changeFile="changeFile"
        @addFile="addFile"
      >
      </preview-item>
    </div>

    <!-- 裁剪图片 -->
    <cropper
      ref="cropper"
      :cropper-rate="cropperRate"
      @callback="cropperCallback"
      :options="options"
    ></cropper>
  </div>
</template>

<script>
import MD5 from 'md5';
import { QuniuUploader } from './qiniu';
import globalInfo from './globalInfo.vue';
import previewItem from './previewItem.vue';

export default {
  name: 'image-upload',
  data() {
    return {
      // 上传实例
      uploader: null,
      visible: false,
      fileList: [],
      // 需要上传数量
      uploadNum: 0,
      // 是否允许上传
      isUpload: false,
      // 替换图片的操控保存索引
      changeIndex: 0,
      // 裁剪图片的参数
      options: {
        img: '',
      },
    };
  },
  components: {
    globalInfo,
    previewItem,
  },
  props: {
    // 图片显示形式 cover contain
    backgroundSize: {
      type: String,
      required: false,
      default: () => 'contain',
    },
    // 默认显示单元宽度
    imageItemWidth: {
      type: Number,
      required: false,
      default: () => 120,
    },
    // 默认显示单元高度
    imageItemHeight: {
      type: Number,
      required: false,
      default: () => 120,
    },
    // 是否显示删除图标
    imageDeleteControl: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    // 是否显示替换图标
    imageExchangeControl: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    // 图片传入对象
    image: {
      type: Object,
      required: false,
      default: () => {},
    },
    // 上传图片的形式 single 单图 multi 多图
    uploadStyle: {
      type: String,
      required: false,
      default: () => 'single',
    },
    // 图片的放置顺序 竖向 vertical 横向 landscape
    direction: {
      type: String,
      required: false,
      default: () => 'landscape',
    },
    // 图片格式 JPG PNG
    format: {
      type: Array,
      required: false,
      default: () => [],
    },
    // 图片格式 单位 M
    size: {
      type: Number,
      required: false,
      default: () => 2,
    },
    // 多图模式最多上传 图片数量限制
    maxNum: {
      type: Number,
      required: false,
      default: () => 10,
    },
    // 图片是否显示裁剪选项
    tailor: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 单图进度条显示
    singleProgress: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 上传文件信息显示
    uploadImageInfo: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 裁剪比例
    cropperRate: {
      type: Array,
      required: false,
      default: () => [1, 1],
    },
  },
  computed: {
    uploadControl() {
      if (this.uploadStyle === 'single' && this.fileList.length) {
        return false;
      }
      if (
        this.uploadStyle === 'multi' &&
        this.fileList.length > this.maxNum - 1
      ) {
        return false;
      }
      return true;
    },
    /**
     * 更具变量宽高计算字体大小
     */
    fontSize() {
      return `${(this.imageItemWidth + this.imageItemHeight) / 8}px`;
    },
    /**
     * 上传图片列表长度
     * */
    fileListLength() {
      let len = 0;
      this.fileList.forEach((item) => {
        // 只计算本地选中的图片大小
        if (item.uploadStatus !== 'success') {
          len += 1;
        }
      });
      return len;
    },
    /**
     * 上传图片总大小
     * */
    fileListSize() {
      let sizeTotal = 0;

      this.fileList.forEach((item) => {
        // 只计算本地选中的图片大小
        if (item.uploadStatus !== 'success') {
          sizeTotal += this.getImgSize(item.base64);
        }
      });

      return this.formatSize(sizeTotal, ['字节', 'K', 'M', 'G']);
    },
    /**
     * 已上传数量
     * */
    uploadedNum() {
      let num = 0;

      this.fileList.forEach(({ uploadStatus }) => {
        uploadStatus === 'success' && (num += 1);
      });
      return num;
    },
    /**
     * 未上传的文件大小
     */
    unUploadedNum() {
      let num = 0;

      this.fileList.forEach(({ uploadStatus }) => {
        uploadStatus && (num += 1);
      });
      return num;
    },
    /**
     * 当前进度百分比
     * */
    percentage() {
      let percentage = 0;
      if (this.unUploadedNum) {
        percentage = (this.uploadedNum / this.unUploadedNum) * 100;
      }
      return parseInt(percentage, 10);
    },
  },

  created() {
    this.init();
  },
  methods: {
    init() {
      this.initEnterImage();
      this.initImagePermission();
    },
    /**
     * 递归格式化图片总大小
     * @params size {Number} 图片大小
     * @params text {Array}  容量后缀
     * */
    formatSize(size, text) {
      const currentText = text.shift();
      const step = 1024;

      if (size < step || text.length <= 0) {
        const fixedSize = size.toFixed(2);
        return `${fixedSize}${currentText}`;
      }
      return this.formatSize(size / step, text);
    },
    /**
     * 上传图片上传面板
     * */
    showUploader() {
      this.visible = true;
    },
    /**
     * 获取图片base64
     * @params file {Object} 文件对象
     * */
    getImgBase64(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function selfOnload(e) {
          resolve(this, e);
        };
      });
    },
    /**
     * 触发上传
     * */
    async uploaderSubmit() {
      if (this.fileList.length === this.uploadedNum) return false;

      this.isUpload = true;

      this.uploadNum = this.fileList.length - this.uploadedNum;

      await this.uploadLoop();

      this.isUpload = false;

      this.updateFarImage();

      this.$emit('finishUpload', {});
      return false;
    },
    async initImagePermission() {
      this.uploader = new QuniuUploader();
      await this.uploader.upload({
        type: this.image.type,
      });
    },
    /**
     * 递归上传队列
     * */
    async uploadLoop(index = 0) {
      if (!this.isUpload) return false;

      const file = this.fileList[index];
      const { uploadStatus } = file;
      if (uploadStatus !== 'success') {
        try {
          file.uploadStatus = 'progress';
          const { path, domain } = await this.uploader.uploading(file, {}, {});
          // 更新url 地址
          this.fileList[index].url = `${domain}${path}`;
        } catch (err) {
          file.uploadStatus = 'error';
        }
      }

      let innerIndex = index;
      innerIndex += 1;

      if (this.fileList[innerIndex]) {
        await this.uploadLoop(innerIndex);
      }
      return false;
    },
    /**
     * 增加上传文件
     * @params file {Object} 文件对象
     * */
    addFile(file) {
      if (this.justiceSizeAndFormat(file)) {
        this.getImgBase64(file).then(({ result }) => {
          const fileSource = {
            uploadStatus: 'wait',
            base64: result,
            progress: 0,
            file,
          };
          this.fileList.splice(this.fileList.length + 1, 0, fileSource);
        });
      }
      return false;
    },
    /**
     * 限定文件的大小和格式
     */
    justiceSizeAndFormat(file) {
      let isTargetFormat = false;
      const isSize = file.size / 1024 / 1024 < this.size;

      // 判定限定格式
      isTargetFormat = this.format.some((item) => {
        const justice =
          (item === 'JPG' && file.type === 'image/jpeg') ||
          (item === 'PNG' && file.type === 'image/png');
        return justice;
      });
      if (!this.format.length) {
        isTargetFormat = true;
      }

      if (!isTargetFormat) {
        this.$message.error(`上传图片只能是 ${this.format.join('/')} 格式!`);
      }
      if (!isSize) {
        this.$message.error(`上传图片大小不能超过 ${this.size} MB!`);
      }
      if (isTargetFormat && isSize) {
        return true;
      }
      return false;
    },
    /**
     * 停止上传
     * */
    uploadAbort() {
      this.isUpload = false;
      this.uploader.abort();
    },
    /**
     * 删除上传图片 并同步数据到父组件
     * */
    uploadItemDelete(index) {
      this.fileList.splice(index, 1);
      this.updateFarImage();
    },
    /**
     * 更新父组件图片列表数据
     */
    updateFarImage() {
      const newImageArr = [];
      this.fileList.forEach((item) => {
        if (item.uploadStatus === 'success') {
          newImageArr.push(item.url);
        }
      });
      this.image.imageShowList = newImageArr;
    },
    /**
     * 初始化读取的图片
     */
    initEnterImage() {
      if (this.uploadStyle === 'single' && this.image.imageShowList.length) {
        this.fileList.push({
          uploadStatus: 'success',
          progress: 0,
          url: this.image.imageShowList[0],
        });
      } else {
        this.image.imageShowList.forEach((item) => {
          this.fileList.push({
            uploadStatus: 'success',
            progress: 0,
            url: item,
          });
        });
      }
      this.updateFarImage();
    },
    targetIndexSave(index) {
      this.changeIndex = index;
    },
    /**
     * 更换图片
     */
    changeFile(file) {
      if (this.justiceSizeAndFormat(file)) {
        this.getImgBase64(file).then(({ result }) => {
          const fileSource = {
            uploadStatus: 'wait',
            base64: result,
            progress: 0,
            file,
          };
          this.fileList.splice(this.changeIndex, 1, fileSource);
        });
      }
      return false;
    },
    /**
     * 处理预览图片
     */
    dealPreviewImage(item) {
      return `url(${this.dealPreviewItemImage(item)})`;
    },
    dealPreviewItemImage(item) {
      return item.base64 ? item.base64 : item.url;
    },
    /**
     * 预览图片 包含单图和多图逻辑
     */
    handlePictureCardPreview(item, index) {
      if (this.uploadStyle === 'multi') {
        this.$multImagePreview(this.dealUrlList(this.fileList), index);
      } else {
        this.$singleImagePreview(this.dealPreviewItemImage(item));
      }
    },
    dealUrlList(data) {
      let resList = [];
      data.forEach((item) => {
        resList.push(this.dealPreviewItemImage(item));
      });
      return resList;
    },
    /**
     * 图片裁剪
     */
    tailorImage(item, index) {
      this.changeIndex = index;
      this.options.img = this.dealPreviewItemImage(item);
      this.openCropper();
    },
    /**
     * 点击打开裁剪弹窗
     */
    openCropper() {
      this.$refs.cropper.controlShow(true);
    },
    /**
     * 裁剪成功之后的回调
     */
    cropperCallback() {
      const fileSource = {
        uploadStatus: 'wait',
        base64: this.options.img,
        progress: 0,
        file: this.dataURLtoFile(this.options.img),
      };
      this.fileList.splice(this.changeIndex, 1, fileSource);
    },
    /**
     * 将base64转换为文件对象
     */
    dataURLtoFile(dataurl) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 转换成file对象
      return new File([u8arr], this.buildBase64FileName(dataurl, mime), {
        type: mime,
      });
    },
    /**
     * 自定义base64文件名
     */
    buildBase64FileName(dataurl, mime) {
      const name = MD5(dataurl);
      const suffix = mime.split('/')[1];
      return `${name}.${suffix}`;
    },
    /**
     * 计算base64文件大小
     */
    getImgSize(str) {
      const strLength = str.length;
      const fileLength = parseInt(strLength - (strLength / 8) * 2, 10);
      return fileLength;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.photo {
  &__upload-vertical {
    flex-flow: column;
  }
  .multi-preview {
    display: block;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
