<template>
  <div class="app-container">
    <el-button @click="switchType" style="margin-bottom: 20px"
      >切换导入方式</el-button
    >
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :upload-type="uploadType"
    />
    <div align="right" style="margin:20px 0 10px;">
      <el-button
        @click="
          tableData = [];
          tableHeader = [];
        "
        type="primary"
        >清空表格数据</el-button
      >
    </div>
    <el-table :data="tableData" border highlight-current-row height="500">
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'importExcel',
  data() {
    return {
      tableData: [],
      tableHeader: [],
      uploadType: 'drag',
    };
  },
  methods: {
    switchType() {
      if (this.uploadType === 'drag') {
        this.uploadType = 'click';
        return;
      }
      this.uploadType = 'drag';
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }
      this.$warningMessage('请不要上传大于1m的文件');
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
  },
};
</script>
