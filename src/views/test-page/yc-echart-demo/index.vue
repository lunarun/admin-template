<template>
  <div title="echartDemo" class="echart__demo">
    <el-tabs v-model="tabName">
      <el-tab-pane :lazy="true" label="全部" name="all">
        <base-echart></base-echart>
        <line-echart></line-echart>
        <pie></pie>
        <funnel></funnel>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="基础echart" name="base">
        <base-echart></base-echart>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="折线图" name="pie">
        <line-echart></line-echart>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="饼图" name="everyday">
        <pie></pie>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="漏斗图" name="funnel">
        <funnel></funnel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
