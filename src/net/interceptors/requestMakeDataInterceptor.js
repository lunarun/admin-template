import qs from 'qs';
import session from '../../session/index';

export default {
  fulfilled(request) {
    try {
      request.data = _dataFactory(request.data || {});
      return request;
    } catch (err) {
      throw err;
    }
  },
};

function _dataFactory(data) {
  /**
   * 构造数据
   */
  const body = {
    data: JSON.stringify(data),
  };

  session.setSessionToRequestBody(body);

  return qs.stringify(body);
}
