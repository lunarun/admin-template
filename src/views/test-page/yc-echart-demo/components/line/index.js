import codeSection from '../common/components/code-section.vue';
export default {
  data() {
    return {
      eDataTest: {
        xAxisName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        echartData: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '邮件营销',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        eLegendData: ['邮件营销'],
      },
      eDataTest1: {
        xAxisName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        echartData: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        eLegendData: [
          '邮件营销',
          '联盟广告',
          '视频广告',
          '直接访问',
          '搜索引擎',
        ],
      },
    };
  },
  components: {
    codeSection,
  },
  created() {},
  mounted() {},
  methods: {},
};
