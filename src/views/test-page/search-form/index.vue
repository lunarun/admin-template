<!--
 * @Description: 列表页面筛选数据表单区域
 * @Author: YJ
 * @Date: 2019-09-12 15:09:13
 * @LastEditTime: 2019-09-18 14:04:37
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss"></style>
<template>
  <div>
    <search-form inline label-width="80px">
      <el-form-item label="名称">
        <el-select v-model="searchForm.select1" placeholder="请选择">
          <el-option
            label="请选择请选择请选择请选择请选择请选择"
            value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-date-picker
          v-model="searchForm.date1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="姓名">
        <el-date-picker
          v-model="searchForm.date2"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary">搜索</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </search-form>
    <yc-table
      url="https://www.fastmock.site/mock/a7e8466883a7fe1e05b3ce2dc414543a/test/data/list"
      :form="searchForm"
      ref="ycTable"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="create_data" label="注册时间"></el-table-column>
    </yc-table>
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="showDialog = true">显示弹窗</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>
    <yc-dialog
      title="咔咔咔"
      @click-cancel="onDialogOk"
      @click-ok="onDialogOk"
      :visible.sync="showDialog"
    >
      <div>上来就富士康砥砺奋进</div>
    </yc-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        select1: '',
        date1: [],
        date2: [],
      },
      showDialog: false,
    };
  },
  methods: {
    onDialogOk() {
      this.showDialog = false;
    },
  },
};
</script>
