<template>
  <div>
    <div class="pre">
      <yc-echart class="chart" :option="option"></yc-echart>
      <code-section class="code" :content="option" json></code-section>
    </div>
    <div class="pre">
      <yc-echart class="chart" :option="option1"></yc-echart>
      <code-section class="code" :content="option1" json></code-section>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
