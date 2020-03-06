import codeSection from '../common/components/code-section.vue';
export default {
  data() {
    return {
      eDataTest: {
        eTitleName: 'test',
        eTitleSubtext: 'echartSubtext',
        eSeriesName: 'eSeriesName',
        eSeriesData: [{ value: 335, name: '直接访问' }],
        eLegendData: ['直接访问'],
      },
      eDataTest1: {
        eTitleName: 'test',
        eTitleSubtext: 'echartSubtext',
        eSeriesName: 'eSeriesName',
        eSeriesData: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' },
        ],
        eLegendData: [
          '直接访问',
          '邮件营销',
          '联盟广告',
          '视频广告',
          '搜索引擎',
        ],
      },
    };
  },
  components: {
    codeSection,
  },
  mounted() {},
  methods: {},
};
