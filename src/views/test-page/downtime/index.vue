<style lang="scss">
.downtime {
  width: 100px;
}
</style>

<template>
  <section>
    <downtime
      ref="downtime"
      class="downtime"
      @afterEnd="afterEnd"
      @beforeStart="beforeStart"
      :text="text"
      :time="downtimeCount"
      :type="type"
    ></downtime>
    <el-button @click="resetdowntime" round="round">重置时间测试</el-button>
  </section>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      downtimeCount: 10,
      text: '获取验证码',
      type: 'round',
    };
  },
  components: {},
  mounted() {},
  methods: {
    afterEnd() {
      console.log('倒计时结束');
    },
    resetdowntime() {
      this.$refs.downtime.resetDowntime();
    },
    beforeStart() {
      console.log('倒计时开始之前触发');
    },
  },
};
</script>
