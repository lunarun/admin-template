<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        :loading="downloadLoading"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
        >导出Excel</el-button
      >
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      max-height="600"
      @selection-change="(list) => (selectList = list)"
    >
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" prop="id" label="ID" width="95" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" prop="reviewer" />
      <el-table-column label="阅读量" width="115" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">{{
          scope.row.disabled ? '关闭' : '开启'
        }}</template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import service from './service.js';

export default {
  name: 'excel',
  data() {
    return {
      list: [],
      selectList: [],
      downloadLoading: false,
    };
  },
  created() {
    this._$service = new service(this.refreshList);
  },
  mounted() {
    this._$service.postApi().then((data) => {
      this.list = data.result;
    });
  },
  methods: {
    handleDownload() {
      const { selectList } = this;
      if (!selectList.length) {
        return this.$warningMessage('请勾选需要导出的行');
      }
      this.downloadLoading = false;
      this.$exportExcel({
        tHeader: ['id', '作者', '标题', '阅读量', '时间', '状态', '审核'],
        filterVal: [
          'id',
          'author',
          'title',
          'pageviews',
          'time',
          'disabled',
          'reviewer',
        ],
        data: selectList,
        callback: () => {
          this.downloadLoading = false;
        },
      });
    },
  },
};
</script>
