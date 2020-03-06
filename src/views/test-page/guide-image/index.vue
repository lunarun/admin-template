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
      :model="model"
      class="guide-far"
      @close="close"
      @pre="pre"
      @next="next"
    ></guide>
  </section>
</template>

<script>
export default {
  data() {
    return {
      current: [],
      history: [],
      model: 'image',
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
      this.current = [
        'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg06.png',
        'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg01.png',
        'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg02.png',
      ];

      // this.history = [
      //   'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg06.png',
      //   'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg01.png',
      //   'https://img.suv666.com/ui/baojun/meeting/common/v2/baojun/bg02.png',
      // ];
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
