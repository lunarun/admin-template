import axios from 'axios';

/**
 * @param config {Object} axios配置
 * @param requestInterceptors {Array} request拦截器数组
 * @param responseInterceptors {Array} response拦截器数组
 */
export default class {
  constructor({
    config = {},
    requestInterceptors = [],
    responseInterceptors = [],
  } = {}) {
    const instance = axios.create(config);

    requestInterceptors.forEach((interceptor) => {
      instance.interceptors.request.use(
        interceptor.fulfilled || null,
        interceptor.rejected || null
      );
    });
    responseInterceptors.forEach((interceptor) => {
      instance.interceptors.response.use(
        interceptor.fulfilled || null,
        interceptor.rejected || null
      );
    });

    return instance;
  }
}
