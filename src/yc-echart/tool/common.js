import echarts from 'echarts';
import { uniquenessKey } from './tool.js';
import { STATUS } from './constant.js';
import justiceEmpty from './justiceEmpty.js';

export const echartShow = {
  data() {
    return {
      // 无数据判定 true 有数据
      emptyJustice: true,
      // 绘制中 ing 绘制结束 end
      drawStatus: STATUS.ING,
    };
  },
  created() {
    this.mergeData();
  },
  mounted() {
    this.commonInit();
  },
  computed: {
    // 唯一的内部标识id
    id() {
      return uniquenessKey();
    },
  },
  methods: {
    /**
     * 判定数据是否为空
     * @param {*} data
     */
    emptyControlData(data) {
      if (this.option) {
        this.emptyJustice = true;
      } else {
        justiceEmpty.justiceEmptyData.bind(this)(data);
      }
    },
    /**
     * 绘制echart图
     */
    drawEchart() {
      this.$nextTick(() => {
        const chart = echarts.init(document.getElementById(this.id));
        chart.clear();
        this.controlStatus(chart);
        chart.setOption(this.optionInner);
      });
    },
    /**
     * 控制绘制状态
     * @param {*} chart
     */
    controlStatus(chart) {
      chart.on('finished', () => {
        this.drawStatus = STATUS.END;
      });
    },
    /**
     * 基本的数据合并
     * 在每个组件的created执行 每个组件后面还要执行数据处理
     */
    mergeData() {
      // option有数据就使用option数据 就不使用props数据
      // if (this.option !== null) {
      //   this.initOptionInner();
      //   this.optionInner = merge(this.optionInner, this.option);
      // } else {
      this.initOptionInner();
      // }
    },
    /**
     * 数据变化触发的方法
     */
    dataChange() {
      this.mergeData();
      this.resetStatus();
      this.commonInit();
    },
    /**
     * 公用初始化
     */
    commonInit() {
      this.eachEchartEmptyControl();
      // 有数据才会执行绘制逻辑
      if (this.emptyJustice) {
        this.drawEchart();
      }
    },
    /**
     * 判定数据是否为空
     */
    eachEchartEmptyControl() {
      this.emptyControlData(this.eSeriesData);
    },
    /**
     * 数据变化重绘时重置当前组件 状态
     */
    resetStatus() {
      this.emptyJustice = true;
      this.drawStatus = STATUS.ING;
    },
  },
};
