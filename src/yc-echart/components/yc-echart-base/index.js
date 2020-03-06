/**
 *  基本echart
 *
 *  props
 *      required
 *      @param {String} id id
 *      @param {String} emptyJustice 是否无数据显示控制
 *      @param {String} drawStatus 绘制状态
 */
import echartStatus from '../echartStatus/index.vue';
import { STATUS } from '../../tool/constant.js';

export default {
  data() {
    return {};
  },
  components: { echartStatus },
  watch: {},
  mounted() {},
  computed: {},
  props: {
    id: {
      type: Number,
      required: true,
      default: () => 0,
    },
    emptyJustice: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    drawStatus: {
      type: String,
      required: true,
      default: () => STATUS.ING,
    },
  },
  methods: {},
};
