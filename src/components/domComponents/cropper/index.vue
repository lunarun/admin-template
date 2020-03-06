<template>
  <el-dialog :visible.sync="dialogVisible">
    <vueCropper
      class="cropper"
      ref="cropper"
      :img="options.img"
      :output-size="option.size"
      :output-type="option.outputType"
      :fixed="option.fixed"
      :fixed-number="cropperRate"
      :can-move="option.canMove"
      :can-move-box="option.canMoveBox"
      :center-box="option.centerBox"
      :mode="option.mode"
    ></vueCropper>
    <div class="cropper__footer">
      <el-button @click="controlShow(false)">取消</el-button>
      <el-button @click="cropper" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { VueCropper } from 'vue-cropper';

export default {
  name: 'cropper',
  data() {
    return {
      option: {
        size: 1,
        outputType: 'jpeg || png || webp',
        fixed: true,
        canMove: false,
        canMoveBox: true,
        centerBox: true,
        mode: 'auto auto',
      },
      dialogVisible: false,
    };
  },
  props: {
    // cropper 截图参数对象
    options: {
      type: Object,
      required: false,
      default: () => {},
    },
    // 裁剪比例
    cropperRate: {
      type: Array,
      required: false,
      default: () => [1, 1],
    },
  },
  components: {
    VueCropper,
  },
  watch: {
    dialogVisible() {
      this.init();
    },
  },
  created() {},
  methods: {
    init() {
      if (this.options && this.dialogVisible) {
        this.startCropper();
      }
    },
    startCropper() {
      this.$nextTick(() => {
        this.$refs.cropper.startCrop();
      });
    },
    clearCropper() {
      this.$nextTick(() => {
        this.$refs.cropper.clearCrop();
      });
    },
    cropper() {
      this.$nextTick(() => {
        this.$refs.cropper.getCropData((data) => {
          this.options.img = data;
          this.$emit('callback');
          this.controlShow(false);
        });
      });
    },
    controlShow(control) {
      if (!control) {
        this.clearCropper();
      }
      this.dialogVisible = control;
    },
  },
};
</script>
<style scoped lang="scss">
.cropper {
  width: 100%;
  height: 500px;
}
.cropper__footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  justify-items: center;
}
</style>
