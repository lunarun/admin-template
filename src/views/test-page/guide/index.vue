<style lang="scss">
.guide-far {
  // background: black !important;
}
.item1 {
  color: red;
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid black;
  margin-bottom: 10px;
}
.item2 {
  color: green;
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid yellow;
  margin-top: 10px;
}
</style>

<template>
  <section>
    <guide
      :current="current"
      :controlType="'out'"
      class="guide-far"
      v-if="show"
      @close="close"
      @pre="pre"
      @next="next"
    ></guide>
    <div class="item1" ref="item1" @click="test">引导显示测试单元1</div>
    <div class="item2" ref="item2">引导显示测试单元2</div>
    <div class="item2" ref="item3">引导显示测试单元3</div>
    <div class="item2">显示测试单元</div>
    <div class="item2" v-for="n in 100" :key="n">引导显示测试单元item2</div>
    <div class="item2" ref="item4">引导显示测试单元</div>
    <div class="item1" v-for="n in 100" :key="n + 100">
      引导显示测试单元item1
    </div>
  </section>
</template>

<script>
import store from 'store';
export default {
  data() {
    return {
      show: false,
      guitest: 'guitest',
      current: [],
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initDomList();
    },
    guideControl(control) {
      this.show = control;
    },
    close() {
      this.guideControl(false);
      this.setAlreadyRead(true);
    },
    justiceAlreadyRead() {
      if (store.get(this.guitest)) {
        this.guideControl(false);
      } else {
        this.guideControl(true);
      }
    },
    setAlreadyRead(status) {
      store.set(this.guitest, status);
    },
    initDomList() {
      this.$nextTick(() => {
        this.current = [
          {
            dom: this.$refs.item1,
            text: '引导说明1',
          },
          {
            dom: this.$refs.item2,
            text: '引导说明2',
          },
          {
            dom: this.$refs.item3,
            text:
              '引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3',
          },
          {
            dom: this.$refs.item4,
            text: '引导说明4',
          },
        ];
        this.justiceAlreadyRead();
      });
    },
    test() {
      console.log('test');
    },
    pre(val) {
      console.log('pre', val);
    },
    next(val) {
      console.log('next', val);
    },
  },
};
</script>
