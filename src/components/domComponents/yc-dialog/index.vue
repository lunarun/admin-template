<!--
 * @Description: 弹窗
 * @Author: YJ
 * @Date: 2019-09-17 11:34:48
 * @LastEditTime: 2019-09-17 15:29:31
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.yc-com-dialog {
  .el-dialog__header {
    padding: 0px;
    position: relative;
    .el-dialog__headerbtn {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .dialog-title {
    border-bottom: 1px solid #d9d9d9;
    padding: 12px;
  }
  .el-dialog__footer {
    padding: 0;
  }
  .dialog-footer {
    border-top: 1px solid #d9d9d9;
    padding: 12px;
  }
}
</style>

<template>
  <el-dialog
    class="yc-com-dialog"
    :visible.sync="showDialog"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :show-close="showClose"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
    :center="center"
    :top="top"
  >
    <div slot="title" class="dialog-title">
      <slot name="title" v-if="$slots.title"></slot>
      <template v-else>{{ title }}</template>
    </div>
    <slot></slot>
    <div slot="footer" v-if="$slots.footer" class="dialog-footer">
      <slot name="footer"></slot>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button @click="onClickCancel">取消</el-button>
      <el-button type="primary" @click="onClickOk">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ycDialog',
  data() {
    return {
      showDialog: false,
    };
  },
  props: {
    title: String,
    center: Boolean,
    visible: Boolean,
    width: String,
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    top: {
      type: String,
      default: '100px',
    },
  },
  watch: {
    visible(val) {
      this.showDialog = val;
    },
    showDialog(val) {
      if (val !== this.visible) {
        this.$emit('update:visible', val);
      }
    },
  },
  mounted() {
    this.showDialog = this.visible;
  },
  methods: {
    onOpen(res) {
      this.$emit('open', res);
    },
    onOpened(res) {
      this.$emit('opened', res);
    },
    onClose(res) {
      this.$emit('close', res);
    },
    onClosed(res) {
      this.$emit('closed', res);
    },
    onClickCancel(res) {
      this.$emit('click-cancel', res);
    },
    onClickOk(res) {
      this.$emit('click-ok', res);
    },
  },
};
</script>
