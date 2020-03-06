import codeSection from '../common/components/code-section.vue';
export default {
  data() {
    return {
      eDataTest: {
        eTitleName: 'test',
        eTitleSubtext: 'echartSubtext',
        eSeriesName: 'echartSeriesName',
        echartData: [{ value: 100, name: '展现' }],
        eLegendData: ['展现'],
      },
      eDataTest1: {
        eTitleName: 'test',
        eTitleSubtext: 'echartSubtext',
        eSeriesName: 'echartSeriesName',
        echartData: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' },
        ],
        eLegendData: ['展现', '点击', '访问', '咨询', '订单'],
      },
    };
  },
  components: {
    codeSection,
  },
  mounted() {},
  methods: {},
};
