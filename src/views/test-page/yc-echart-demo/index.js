import funnel from './components/funnel/index.vue';
import lineEchart from './components/line/index.vue';
import pie from './components/pie/index.vue';
import baseEchart from './components/base-echart/index.vue';
export default {
  data() {
    return {
      tabName: 'all',
    };
  },
  components: {
    funnel,
    lineEchart,
    pie,
    baseEchart,
  },
  mounted() {},
  methods: {},
};
