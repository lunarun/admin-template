import { Loading } from 'element-ui';
import Vue from 'vue';

let loadingObj = null;

/**
 * 开启loading
 * @param {String} opt 需要loading的组件
 * @param {Object} opt loading的配置项
 */
export const $loading = (opt) => {
  const options = {
    text: '加载中',
  };
  const actions = new Map([
    [
      'string',
      () => {
        options.target = opt;
      },
    ],
    [
      'object',
      () => {
        Object.assign(options, opt);
      },
    ],
  ]);
  const action = actions.get(typeof opt);
  action && action();
  loadingObj = Loading.service(options);
};

/**
 * 关闭loading
 */
export const $closeLoading = () => {
  Vue.prototype.$nextTick(() => {
    loadingObj && loadingObj.close();
  });
};
