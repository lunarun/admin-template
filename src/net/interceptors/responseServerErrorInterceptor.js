import { MessageBox } from 'element-ui';

export default {
  fulfilled(response) {
    try {
      if (response.data.errcode !== 0) {
        throw MessageBox({
          title: '提示',
          message: response.data.msg,
        });
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
