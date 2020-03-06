import codeSection from '../common/components/code-section.vue';
export default {
  data() {
    return {
      option: {
        silent: true,
        series: {
          radius: ['15%', '80%'],
          type: 'sunburst',
          sort: null,
          highlightPolicy: 'ancestor',
          data: [
            {
              value: 8,
              children: [
                {
                  value: 4,
                  children: [
                    {
                      value: 2,
                    },
                    {
                      value: 1,
                    },
                    {
                      value: 1,
                    },
                    {
                      value: 0.5,
                    },
                  ],
                },
                {
                  value: 2,
                },
              ],
            },
            {
              value: 4,
              children: [
                {
                  children: [
                    {
                      value: 2,
                    },
                  ],
                },
              ],
            },
            {
              value: 4,
              children: [
                {
                  children: [
                    {
                      value: 2,
                    },
                  ],
                },
              ],
            },
            {
              value: 3,
              children: [
                {
                  children: [
                    {
                      value: 1,
                    },
                  ],
                },
              ],
            },
          ],
          label: {
            color: '#fff',
            textBorderColor: '#666',
            textBorderWidth: 2,
            borderColor: '#999',
            borderWidth: 1,
            formatter: function(param) {
              var depth = param.treePathInfo.length;
              if (depth === 2) {
                return 'radial';
              } else if (depth === 3) {
                return 'tangential';
              } else if (depth === 4) {
                return '0';
              }
            },
          },
          levels: [
            {},
            {
              itemStyle: {
                color: 'red',
              },
              label: {
                rotate: 'radial',
              },
            },
            {
              itemStyle: {
                color: 'orange',
              },
              label: {
                rotate: 'tangential',
              },
            },
            {
              itemStyle: {
                color: 'yellow',
              },
              label: {
                rotate: 0,
              },
            },
          ],
        },
      },
      option1: {
        title: {
          text: '浏览器占比变化',
          subtext: '纯属虚构',
          top: 10,
          left: 10,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)',
        },
        legend: {
          type: 'scroll',
          bottom: 10,
          data: (function() {
            var list = [];
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + '');
            }
            return list;
          })(),
        },
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true,
        },
        radar: {
          indicator: [
            { text: 'IE8-', max: 400 },
            { text: 'IE9+', max: 400 },
            { text: 'Safari', max: 400 },
            { text: 'Firefox', max: 400 },
            { text: 'Chrome', max: 400 },
          ],
        },
        series: (function() {
          var series = [];
          for (var i = 1; i <= 28; i++) {
            series.push({
              name: '浏览器（数据纯属虚构）',
              type: 'radar',
              symbol: 'none',
              lineStyle: {
                width: 1,
              },
              emphasis: {
                areaStyle: {
                  color: 'rgba(0,250,0,0.3)',
                },
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    (i * i) / 2,
                  ],
                  name: i + 2000 + '',
                },
              ],
            });
          }
          return series;
        })(),
      },
    };
  },
  components: {
    codeSection,
  },
  mounted() {},
  methods: {},
};
