import { Message } from 'element-ui';

/**
 * message提示
 * @param {String} type 提示类型
 * @returns {Function} (message, opt) => {}
 *  @param {String} message 提示内容
 *  @param {Object} opt 配置项
 */
const ElementMessage = (type) => (message, opt = {}) => {
  Message({
    ...opt,
    type,
    message,
  });
};

export const $successMessage = ElementMessage('success');
export const $errorMessage = ElementMessage('error');
export const $warningMessage = ElementMessage('warning');
export const $infoMessage = ElementMessage('info');
