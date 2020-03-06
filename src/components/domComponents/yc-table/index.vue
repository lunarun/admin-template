<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 15:24:38
 * @LastEditTime: 2019-09-18 14:32:00
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.yc-com-table_list {
  .page-bar {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="yc-com-table_list">
    <el-table border size="mini" :data="dataList">
      <slot></slot>
    </el-table>
    <div class="page-bar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pg"
        :page-sizes="pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ycTable',
  data() {
    return {
      searchForm: {},
      pageSizes: [10, 20, 30, 50, 100, 200, 300, 500, 1000],
      dataList: [],
      page: {
        pg: 1,
        size: 10,
        total: 0,
      },
    };
  },
  props: {
    url: String,
    form: Object,
  },
  watch: {
    url(val) {
      console.log(val);
    },
    form(val) {
      this.setSearchForm(val);
    },
  },
  mounted() {
    // console.log(this.url);
    // console.log(this);
    // setTimeout(() => {
    //   console.log(this.form);
    // }, 1000);
    this.setSearchForm(this.form);
  },
  methods: {
    setSearchForm(obj) {
      this.searchForm = obj || {};
      this.page.pg = 1;
      if (this.url) {
        this.requestTableData();
      }
    },
    $getTableData(obj) {
      this.setSearchForm(obj);
    },
    requestTableData() {
      const params = {
        ...this.searchForm,
        page_id: this.page.pg,
        page_size: this.page.size,
      };
      const keys = Object.keys(params);
      let item = null;
      for (let i = 0; i < keys.length; i++) {
        if (['', null, undefined].indexOf(params[keys[i]]) !== -1) {
          delete params[keys[i]];
        }
      }
      this.$post(this.url, params).then((res) => {
        const result = res.result || {};
        const list = result.list || [];
        this.page.pg = result.page_id;
        this.page.total = result.total_size;
        this.dataList = list;
      });
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.page.pg = 1;
      this.requestTableData();
    },
    handleCurrentChange(pg) {
      this.page.pg = pg;
      this.requestTableData();
    },
  },
};
</script>
