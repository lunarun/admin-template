<template>
  <div>
    <div ref="dom">
      <slot></slot>
    </div>
    <div class="default-to-top" slot="arrow" @click="toTop" v-if="$slots.arrow">
      <slot name="arrow"></slot>
    </div>
    <i
      v-if="!$slots.arrow && this.show"
      slot="arrow"
      @click="toTop"
      class="el-icon-upload2 el-icon-download default-to-top"
    ></i>
  </div>
</template>
<script>
export default {
  name: 'backToTop',
  data() {
    return {
      scrollIngTime: 0,
      clear: null,
      globalLengthSave: 0,
      throttleMonitor: false,
      dom: null,
    };
  },
  props: {
    // 持续时间 单位毫秒
    time: {
      type: Number,
      required: false,
      default: () => 200,
      validator: function(value) {
        return value <= 5000 && value >= 1;
      },
    },
    // 每次移动的时间间隔
    interval: {
      type: Number,
      required: false,
      default: () => 1000 / 60,
      validator: function(value) {
        return value >= 1;
      },
    },
    // 滚动容器 false window容器滚动 true dom容器滚动
    type: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 是否支持滚动中断
    interrupt: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    // 是否展示返回顶部节点
    show: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    // 滚动总长计算是当前滚动条位置还是容器最大滚动高度
    mode: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  computed: {
    /**
     * 计算总共的滚动次数
     */
    scrollTime() {
      const rate = this.time / this.interval;
      return rate <= 1 ? 1 : Math.ceil(rate);
    },
    /**
     * 判定是否滚动结束
     */
    clearMonitor() {
      const justicPos = this.scrollIngLength <= 0;
      const justicTime = this.scrollIngTime >= this.scrollTime;
      return justicPos || justicTime ? true : false;
    },
    /**
     * 计算当前滚动位置
     */
    scrollIngLength() {
      let rate = 1 - this.scrollIngTime / this.scrollTime;
      return rate < 0 ? 0 : this.globalLengthSave * rate;
    },
  },
  methods: {
    initDom() {
      this.dom = this.$refs.dom.children[0];
    },
    /**
     * 设定滚动监听阻断逻辑
     */
    monitorScroll() {
      if (this.interrupt) {
        if (this.type) {
          this.dom.onmousewheel = () => {};
        } else {
          document.body.onmousewheel = () => {};
        }
        return;
      }
      if (this.type) {
        this.dom.onmousewheel = () => {
          this.throttleMonitor = false;
          clearInterval(this.clear);
        };
      } else {
        document.body.onmousewheel = () => {
          this.throttleMonitor = false;
          clearInterval(this.clear);
        };
      }
    },
    /**
     * 初始化当前位置,滚动次数初始化为0
     */
    initScrollIngTime() {
      if (this.mode) {
        this.scrollIngTime = 0;
      } else {
        const globalLength = this.globalLengthSave;
        const presentPosition = this.globalLengthProgress();
        this.scrollIngTime = Math.ceil(
          (globalLength - presentPosition) / (globalLength / this.scrollTime)
        );
      }
    },
    /**
     * 获取总的滚动位置区域
     */
    globalLength() {
      if (this.mode) {
        return this.globalLengthProgress();
      } else {
        return this.globalLengthEnd();
      }
    },
    /**
     * 滚动距离为总长
     */
    globalLengthEnd() {
      if (this.type) {
        return this.dom.scrollHeight - this.dom.clientHeight;
      } else {
        return document.body.scrollHeight - window.screen.availHeight;
      }
    },
    /**
     * 滚动总距离为当前滚动位置
     */
    globalLengthProgress() {
      if (this.type) {
        let winTop = this.dom.scrollTop;
        return winTop <= 0 ? 0 : winTop;
      } else {
        let domTop = document.documentElement.scrollTop;
        return domTop <= 0 ? 0 : domTop;
      }
    },
    /**
     * 存储globalLength 优化性能
     */
    initGlobalLength() {
      this.globalLengthSave = this.globalLength();
    },
    /**
     * 开始滚动前各种初始化
     */
    scrollStart() {
      this.throttleMonitor = true;
      this.initDom();
      this.monitorScroll();
      this.initGlobalLength();
      this.initScrollIngTime();
      this.$emit('beforeStart');
    },
    /**
     * 滚动进行中的各种计算
     */
    scrollIng() {
      this.$emit('progress');
      this.scrollIngTime++;
      this.setTopPosition(this.scrollIngLength);
    },
    /**
     * 滚动结束后触发
     */
    scrollEnd() {
      this.throttleMonitor = false;
      clearInterval(this.clear);
      this.$emit('end');
    },
    /**
     * 定时器指定 实现滚动动画
     */
    toTop() {
      if (this.throttleMonitor) return;
      this.scrollStart();
      this.clear = setInterval(() => {
        this.scrollIng();
        if (this.clearMonitor) {
          this.scrollEnd();
        }
      }, this.interval);
    },
    /**
     * 设定滚动位置坐标
     */
    setTopPosition(pos) {
      if (this.type) {
        this.domToTop(pos);
      } else {
        this.winToTop(pos);
      }
    },
    /**
     * 非指定dom的滚动设置
     */
    winToTop(pos) {
      window.scrollTo(pos, pos);
    },
    /**
     * 指定dom的滚动设置
     */
    domToTop(pos) {
      this.dom.scrollTop = pos;
    },
  },
};
</script>
<style scoped lang="scss">
.default-to-top {
  position: fixed;
  bottom: 10%;
  right: 4%;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  background: #ffffff;
}
</style>
