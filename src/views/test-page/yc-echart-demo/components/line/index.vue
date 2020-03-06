<template>
  <div>
    <div class="pre">
      <stacked-line-chart
        class="chart"
        :tooltip="eDataTest.tooltip"
        :eLegendData="eDataTest.eLegendData"
        :eSeriesData="eDataTest.echartData"
        :eXAxisName="eDataTest.xAxisName"
        :eTitleName="'折线图堆叠'"
      ></stacked-line-chart>
      <code-section class="code" :content="eDataTest" json></code-section>
    </div>
    <div class="pre">
      <stacked-line-chart
        class="chart"
        :tooltip="eDataTest1.tooltip"
        :eLegendData="eDataTest1.eLegendData"
        :eSeriesData="eDataTest1.echartData"
        :eXAxisName="eDataTest1.xAxisName"
        :eTitleName="'折线图堆叠'"
      ></stacked-line-chart>
      <code-section class="code" :content="eDataTest1" json></code-section>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
