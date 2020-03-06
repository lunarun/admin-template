export const echartType = {
  // 漏斗图funnelPlotBase
  FUNNELPLOTBASE: '1',
  // 折线图refererOfAWebsite
  REFEREROFAWEBSITE: '2',
  // 饼图stackedLineChart
  STACKEDLINECHART: '3',
};

// 状态常量
export const STATUS = {
  EMPTY: 'empty',
  ING: 'ing',
  END: 'end',
};

// 状态文字常量
export const STATUS_JSON = {
  [STATUS.EMPTY]: '暂无数据',
  [STATUS.ING]: '绘制中...',
};

export const CommonProps = {
  tooltip: {
    type: Object,
    required: false,
    default: () => {},
  },
  toolbox: {
    type: Object,
    required: false,
    default: () => {},
  },
};
