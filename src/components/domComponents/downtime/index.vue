<template>
  <el-button
    @click="start"
    :disabled="disabledStatus"
    type="primary"
    :round="type === 'round'"
    :circle="type === 'circle'"
    :plain="type === 'plain'"
    >{{ downtimeText }}</el-button
  >
</template>
<script>
// 到0秒的时候执行结束
const endTime = 0;
export default {
  name: 'downtime',
  data() {
    return {
      downtimeCount: 60,
      clearIntervalMonitor: null,
      startStatus: false,
      once: true,
    };
  },
  props: {
    // cropper 截图参数对象
    time: {
      type: Number,
      required: false,
      default: () => 60,
    },
    text: {
      type: String,
      required: false,
      default: () => '开始倒计时',
    },
    type: {
      type: String,
      required: false,
      default: () => 'plain',
    },
  },
  computed: {
    disabledStatus() {
      if (this.startStatus) {
        if (this.downtimeCount === endTime) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    downtimeText() {
      return this.disabledStatus ? `${this.downtimeCount}s` : this.text;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.initTime();
    },
    initTime() {
      this.downtimeCount = this.time;
    },
    start() {
      let intervalTime = 1000;
      if (this.once) {
        this.initStart();
        this.clearIntervalMonitor = setInterval(() => {
          this.ing();
          if (this.downtimeCount <= endTime) {
            clearInterval(this.clearIntervalMonitor);
            this.end();
          }
        }, intervalTime);
      }
    },
    initStart() {
      this.once = false;
      this.startStatus = true;
      this.beforeStart();
    },
    ing() {
      this.downtimeCount--;
    },
    end() {
      this.once = true;
      this.startStatus = false;
      this.initTime();
      this.afterEnd();
    },
    resetDowntime() {
      this.once = true;
      this.startStatus = false;
      clearInterval(this.clearIntervalMonitor);
      this.initTime();
    },
    afterEnd() {
      this.$emit('afterEnd');
    },
    beforeStart() {
      this.$emit('beforeStart');
    },
  },
};
</script>
<style scoped lang="scss"></style>
