<template>
  <div>
    <!-- 预览list -->
    <div
      class="item"
      :style="{
        width: imageItemWidth + 'px',
        height: imageItemHeight + 'px',
      }"
      v-for="(item, index) in fileList"
      :key="index"
    >
      <div class="photo__upload-operate">
        <i
          v-if="imageDeleteControl"
          class="el-icon-delete"
          @click="uploadItemDelete(index)"
        />
        <i
          v-if="tailor"
          @click="tailorImage(item, index)"
          class="el-icon-crop crop-hover"
        />
        <el-upload
          ref="uploader"
          :show-file-list="false"
          :before-upload="changeFile"
          action=""
          accept="image/*"
          multiple
        >
          <i @click="targetIndexSave(index)" class="el-icon-sort" />
        </el-upload>
      </div>
      <div
        class="progress"
        v-if="item.uploadStatus === 'progress' && singleProgress"
      >
        <el-progress class="progress-bar" :percentage="item.progress" />
      </div>
      <div
        class="item-show"
        @click="handlePictureCardPreview(item, index)"
        :style="{
          backgroundImage: dealPreviewImage(item),
          backgroundSize,
        }"
      ></div>
      <span
        v-show="item.uploadStatus === 'success'"
        class="photo__upload-success"
      >
        <i class="el-icon-check" />
      </span>
    </div>

    <!-- 添加的item -->
    <div
      v-if="uploadControl"
      :style="{
        width: imageItemWidth + 'px',
        height: imageItemHeight + 'px',
      }"
      class="item"
    >
      <el-upload
        ref="uploader"
        :show-file-list="false"
        :before-upload="addFile"
        action=""
        accept="image/*"
        multiple
      >
        <div
          class="no_image"
          :style="{
            width: imageItemWidth + 'px',
            height: imageItemHeight + 'px',
            fontSize,
          }"
        >
          +
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
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
    // 遍历数组
    fileList: {
      type: Array,
      required: false,
      default: () => [],
    },
    // 是否显示删除图标
    imageDeleteControl: {
      type: Boolean,
      required: false,
      default: () => true,
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
    // 单图进度条显示
    dealPreviewImage: {
      type: Function,
      required: false,
      default: () => () => {},
    },
    // 单图进度条显示
    uploadControl: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    // 单图进度条显示
    fontSize: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  methods: {
    uploadItemDelete(index) {
      this.$emit('uploadItemDelete', index);
    },
    tailorImage(item, index) {
      this.$emit('tailorImage', item, index);
    },
    targetIndexSave(index) {
      this.$emit('targetIndexSave', index);
    },
    handlePictureCardPreview(item, index) {
      this.$emit('handlePictureCardPreview', item, index);
    },
    changeFile(file) {
      this.$emit('changeFile', file);
      return false;
    },
    addFile(file) {
      this.$emit('addFile', file);
      return false;
    },
  },
};
</script>
<style scoped lang="scss">
.photo {
  &__upload-operate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.5);
    text-align: right;
    padding: 7px 5px;
    color: #fff;
    transition: all 0.5s;
    opacity: 0;
    transform: translateY(-100%);
    display: flex;
    justify-content: space-around;
    align-items: center;

    .el-icon-delete,
    .el-icon-sort {
      cursor: pointer;
    }
  }

  &__upload-list {
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .item {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 12px 12px 0;
      display: inline-block;
      overflow: hidden;
      &:hover .photo__upload-operate {
        opacity: 1;
        transform: translateY(0);
      }

      .item-show {
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        cursor: zoom-in;
      }
    }
    .no_image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #d9d9d9;
      color: #d9d9d9;
    }
  }

  &__upload-success {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-bottom: 50px solid #60afff;
      border-left: 50px solid transparent;
    }

    .el-icon-check {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #fff;
      font-weight: bold;
    }
  }
  .crop-hover {
    cursor: pointer;
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }
  .progress-bar {
    width: 80%;
    height: 10%;
  }
}
</style>
