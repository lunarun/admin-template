<template>
  <div>
    <div class="pre">
      <referer-of-a-website
        class="chart"
        :eLegendData="eDataTest.eLegendData"
        :eSeriesData="eDataTest.eSeriesData"
        :eTitleName="eDataTest.eTitleName"
        :eTitleSubtext="eDataTest.eTitleSubtext"
        :eSeriesName="eDataTest.eSeriesName"
      ></referer-of-a-website>
      <code-section class="code" :content="eDataTest" json></code-section>
    </div>
    <div class="pre">
      <referer-of-a-website
        class="chart"
        :eLegendData="eDataTest1.eLegendData"
        :eSeriesData="eDataTest1.eSeriesData"
        :eTitleName="eDataTest1.eTitleName"
        :eTitleSubtext="eDataTest1.eTitleSubtext"
        :eSeriesName="eDataTest1.eSeriesName"
      ></referer-of-a-website>
      <code-section class="code" :content="eDataTest1" json></code-section>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
