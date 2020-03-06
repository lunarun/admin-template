<template>
  <el-tabs v-model="tabName">
    <el-tab-pane label="excel导出" name="exportExcel">
      <export-excel />
    </el-tab-pane>
    <el-tab-pane label="excel导入" name="importExcel">
      <import-excel />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import exportExcel from './export-excel';
import importExcel from './import-excel';
export default {
  name: 'execl',
  components: {
    exportExcel,
    importExcel,
  },
  data() {
    return {
      tabName: 'exportExcel',
    };
  },
};
</script>
