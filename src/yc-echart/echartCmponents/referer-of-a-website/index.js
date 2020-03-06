/**
 *  基本饼图
 *
 *  props
 *      required
 *      @param {Array} eLegendData 选项显示控制选项
 *      @param {Array} eSeriesData 图标数据
 *      @param {String} eTitleName 饼图名称
 *      @param {String} eTitleSubtext 饼图描述
 *      @param {String} eSeriesName 饼图表格名称
 */
import echartStatus from '../../components/echartStatus/index.vue';
import ycEchartBase from '../../components/yc-echart-base/index.vue';
import { echartShow } from '../../tool/common.js';
import { createWatch } from '../../tool/tool.js';
import { CommonProps } from '../../tool/constant.js';
import { merge, cloneDeep } from 'lodash';

let echartPropsSelf = {
  tooltip: {
    type: Object,
    required: false,
    default: () => {},
  },

  // title 里面 start
  // 图名称
  eTitleName: {
    type: String,
    required: false,
    default: () => '',
  },
  // 图描述
  eTitleSubtext: {
    type: String,
    required: false,
    default: () => '',
  },
  // title 里面 end

  // legend 里面 start
  // 选项显示控制选项
  eLegendData: {
    type: Array,
    required: false,
    default: () => [],
  },
  // legend 里面 end

  // series 里面 start
  // 图表格名称
  eSeriesName: {
    type: String,
    required: false,
    default: () => '',
  },
  // 图数据
  eSeriesData: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 外边文字显示格式
  eSeriesLabel: {
    type: Object,
    required: false,
    default: () => {
      return {
        normal: {
          formatter: '{b}\n {@2012} ({d}%)',
        },
      };
    },
  },
  // series 里面 end

  // xAxis 里面 start
  eXAxisName: {
    type: Array,
    required: false,
    default: () => [],
  },
  // xAxis 里面 end
};
const propsObj = merge(cloneDeep(CommonProps), echartPropsSelf);

export default {
  name: 'refererOfAWebsite',
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
  props: {
    ...propsObj,
  },
  mounted() {
    this.__init();
  },
  computed: {},
  mixins: [echartShow],
  methods: {
    /**
     * 初始化
     * @private
     */
    __init() {},
    /**
     * 每个echart的数据初始化
     * 包含 props的数据整合
     */
    initOptionInner() {
      this.optionInner = {
        title: {
          text: this.eTitleName,
          subtext: this.eTitleSubtext,
          x: 'center',
        },
        tooltip: this.tooltip,
        toolbox: this.toolbox,
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.eLegendData,
        },
        series: [
          {
            name: this.eSeriesName,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: this.eSeriesLabel,
            data: this.eSeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    },
  },
};
