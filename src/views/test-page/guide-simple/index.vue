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
      ref="guide"
      :current="current"
      :history="history"
      class="guide-far"
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
export default {
  data() {
    return {
      current: [],
      history: [],
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initDomList();
      this.updatePos();
    },
    close() {
      console.log('close');
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
        ];

        // this.history = [
        //   {
        //     dom: this.$refs.item1,
        //     text: '引导说明1',
        //   },
        //   {
        //     dom: this.$refs.item2,
        //     text: '引导说明2',
        //   },
        //   {
        //     dom: this.$refs.item3,
        //     text:
        //       '引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3引导说明3',
        //   },
        //   {
        //     dom: this.$refs.item4,
        //     text: '引导说明4',
        //   },
        // ];
      });
    },
    updatePos() {
      setTimeout(() => {
        this.$refs.guide.updatePos();
      }, 300);
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
