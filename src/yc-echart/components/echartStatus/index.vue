<template>
  <div class="echart_empty" v-if="t.STATUS_JSON[status]">
    {{ status | statusFilter }}
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss">
@import './index.scss';
</style>
