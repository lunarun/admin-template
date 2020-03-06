<template>
  <div class="zx__echart__base">
    <div v-show="emptyJustice" class="zx__echart__base_canvas" :id="id"></div>
    <echart-status
      :status="emptyJustice ? drawStatus : 'empty'"
    ></echart-status>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss">
@import './index.scss';
</style>
