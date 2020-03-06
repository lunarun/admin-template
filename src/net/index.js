// axios封装
import core from './lib/core';

// axios配置
import config from './config';

// 拦截器
import {
  requestInterceptors,
  responseInterceptors,
} from './interceptors/index';

// net实例化
const _http = new core({
  config,
  requestInterceptors,
  responseInterceptors,
});
const _post = (url, params) => {
  return _http.post(url, params);
};
const _get = (url, params) => {
  return _http.get(url, {
    params,
  });
};

export default {
  install(Vue, options) {
    Vue.prototype.$http = _http;
    Vue.prototype.$post = _post;
    Vue.prototype.$get = _get;
  },
  initHttp() {
    return {
      $http: _http,
      $post: _post,
      $get: _get,
    };
  },
};
