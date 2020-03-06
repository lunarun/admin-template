import { Notification } from 'element-ui';

/**
 * notify提示
 * @param {String} type 提示类型
 * @returns {Function} (message, opt) => {}
 *  @param {String} message 提示内容
 *  @param {Object} opt 配置项
 *  @param {String} [opt.title = 提示] 提示标题
 *  @param {Number} [opt.duration = 3000] 提示显示时间，为0则不消失
 *  @param {Number} [opt.offset = 50] 位置偏移量
 */

const ElementNotify = (type) => (message, opt = {}) => {
  const options = {
    title: '提示',
    duration: 3000,
    offset: 50,
    message,
  };
  Object.assign(options, opt);
  Notification[type](options);
};

export const $successNotify = ElementNotify('success');
export const $errorNotify = ElementNotify('error');
export const $warningNotify = ElementNotify('warning');
export const $infoNotify = ElementNotify('info');
