/**
 *  基本echart图
 *
 *  props
 *      required
 *      @param {Boolean} option 基本echart图基本配置选项
 */
import echartStatus from '../../components/echartStatus/index.vue';
import ycEchartBase from '../../components/yc-echart-base/index.vue';
import { echartShow } from '../../tool/common.js';
import { createWatch } from '../../tool/tool.js';
import { CommonProps } from '../../tool/constant.js';
import { merge, cloneDeep } from 'lodash';

let echartPropsSelf = {
  option: {
    type: Object,
    required: true,
    default: () => null,
  },
};
const propsObj = merge(cloneDeep(CommonProps), echartPropsSelf);

export default {
  name: 'ycEchart',
  data() {
    return {
      optionInner: {},
    };
  },
  components: {
    echartStatus,
    ycEchartBase,
  },
  watch: {
    ...createWatch(propsObj),
  },
  mounted() {
    this.__init();
  },
  computed: {},
  props: {
    ...propsObj,
  },
  mixins: [echartShow],
  methods: {
    /**
     * 初始化
     * @private
     */
    __init() {
      this.drawEchart();
    },
    /**
     * 每个echart的数据初始化
     */
    initOptionInner() {
      this.optionInner = this.option;
    },
  },
};
