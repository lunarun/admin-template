import { STATUS_JSON } from '../../tool/constant.js';
export default {
  name: 'echartEmpty',
  data() {
    return {
      t: {
        STATUS_JSON,
      },
    };
  },
  components: {},
  watch: {},
  computed: {},
  props: {
    status: {
      type: String,
      // empty 无数据 ing绘制中
      // end绘制结束
      required: true,
      default: 'empty',
    },
  },
  filters: {
    statusFilter(value) {
      return STATUS_JSON[value];
    },
  },
  methods: {
    /**
     * 初始化
     * @private
     */
    __init() {
      console.log('初始化');
    },
  },
};
