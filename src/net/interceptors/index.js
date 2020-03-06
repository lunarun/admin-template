// request拦截器
import requestDomainUrlInterceptor from './requestDomainUrlInterceptor';
import requestMakeDataInterceptor from './requestMakeDataInterceptor';

// response拦截器
import responseSessionInterceptor from './responseSessionInterceptor';
import responseServerErrorInterceptor from './responseServerErrorInterceptor';

// error处理
import errorInterceptor from './errorInterceptor';

export const requestInterceptors = [
  requestDomainUrlInterceptor,
  requestMakeDataInterceptor,
];
export const responseInterceptors = [
  responseSessionInterceptor,
  responseServerErrorInterceptor,
  errorInterceptor,
];
