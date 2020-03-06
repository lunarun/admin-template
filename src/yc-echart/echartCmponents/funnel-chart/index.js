/**
 *  基本漏斗图
 *
 *  props
 *      required
 *      @param {Array} eLegendData 选项显示控制选项
 *      @param {Array} eSeriesData 图标数据
 *      @param {String} eTitleName 漏斗图名称
 *      @param {String} eTitleSubtext 漏斗图描述
 *      @param {String} eSeriesName 漏斗图表格名称
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
  eSeriesMax: {
    type: Number,
    required: false,
    default: () => 100,
  },
  // 排序
  eSeriesSort: {
    type: String,
    required: false,
    default: () => 'descending',
  },
  // 外边文字显示格式
  eSeriesLabel: {
    type: Object,
    required: false,
    default: () => {},
  },
  // series 里面 end
};
const propsObj = merge(cloneDeep(CommonProps), echartPropsSelf);

export default {
  name: 'funnelChart',
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
        },
        tooltip: this.tooltip,
        toolbox: this.toolbox,
        legend: {
          data: this.eLegendData,
        },
        calculable: true,
        series: [
          {
            name: this.eSeriesName,
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: this.eSeriesMax,
            minSize: '0%',
            maxSize: '100%',
            sort: this.eSeriesSort,
            gap: 2,
            label: this.eSeriesLabel,
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid',
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: this.eSeriesData,
          },
        ],
      };
    },
  },
};
