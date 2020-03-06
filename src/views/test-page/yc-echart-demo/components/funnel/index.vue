<template>
  <div>
    <div class="pre">
      <funnel-chart
        class="chart"
        :eLegendData="eDataTest.eLegendData"
        :eSeriesData="eDataTest.echartData"
        :eTitleSubtext="eDataTest.eTitleSubtext"
        :eTitleName="eDataTest.eTitleName"
      ></funnel-chart>
      <code-section class="code" :content="eDataTest" json></code-section>
    </div>
    <div class="pre">
      <funnel-chart
        class="chart"
        :eLegendData="eDataTest1.eLegendData"
        :eSeriesData="eDataTest1.echartData"
        :eTitleSubtext="eDataTest1.eTitleSubtext"
        :eTitleName="eDataTest1.eTitleName"
      ></funnel-chart>
      <code-section class="code" :content="eDataTest1" json></code-section>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
