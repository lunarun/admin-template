import { MessageBox } from 'element-ui';
import { logout } from 'src/utils/uniteLoginJump';

export default {
  fulfilled(response) {
    const { data } = response;
    try {
      if (data.errcode === 100) {
        throw MessageBox({
          title: '提示',
          message: data.msg,
          callback: () => {
            logout(data.result || {});
          },
        });
      }
      return response;
    } catch (err) {
      throw err;
    }
  },
};
