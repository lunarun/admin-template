import funnelChart from './echartCmponents/funnel-chart/index.vue';
import stackedLineChart from './echartCmponents/stacked-line-chart/index.vue';
import refererOfAWebsite from './echartCmponents/referer-of-a-website/index.vue';
import zxEchart from './echartCmponents/yc-echart/index.vue';

const components = [funnelChart, stackedLineChart, refererOfAWebsite, zxEchart];

const install = (Vue, opts = {}) => {
  components.map((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
};
