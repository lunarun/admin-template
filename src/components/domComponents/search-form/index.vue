<!--
 * @Description: 列表页面筛选数据表单区域
 * @Author: YJ
 * @Date: 2019-09-12 15:09:13
 * @LastEditTime: 2019-09-16 18:24:41
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.yc-com-search_form {
  background: #fafafa;
  padding-top: 18px;
  margin-bottom: 10px;
  .el-date-editor.el-range-editor {
    width: 350px;
    .el-range-input {
      width: 135px;
    }
    .el-range-separator {
      width: 23px;
    }
  }
  .el-select {
    .el-input--suffix {
      .el-input__inner {
        padding-right: 15px;
      }
    }
    .el-input__suffix {
      background: #fff;
      top: 1px;
      bottom: 2px;
      height: auto;
    }
  }
}
</style>
<template>
  <el-form
    :inline="inline"
    :label-width="labelWidth"
    class="yc-com-search_form"
  >
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: 'searchForm',
  data() {
    return {};
  },
  props: {
    inline: Boolean,
    labelWidth: String,
  },
};
</script>
