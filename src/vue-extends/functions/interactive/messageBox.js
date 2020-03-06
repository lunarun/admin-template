import { MessageBox } from 'element-ui';

const TITLE = '提示';
const CONFIRM_BTN_TXT = '确定';
const CANCLE_BTN_TXT = '取消';

/**
 * confirm弹窗
 * @param {String} message 弹窗内容
 * @param {Object} [opt = {}] 配置项
 * @param {String} [opt.title = 提示] 弹窗标题
 * @param {String} [opt.confirmButtonText = 确定] “确定”按钮文案
 * @param {String} [opt.cancelButtonText = 取消] “取消”按钮文案
 * @param {String} [opt.type = waring] 弹窗类型
 * @param {Function} opt.successCb 确定-回调函数
 * @param {Function} opt.cancelCb 取消-回调函数
 */
export const $confirmMessageBox = (message, opt = {}) => {
  const options = {
    title: TITLE,
    confirmButtonText: CONFIRM_BTN_TXT,
    cancelButtonText: CANCLE_BTN_TXT,
    type: 'warning',
  };
  Object.assign(options, opt);
  MessageBox.confirm(message, options)
    .then(() => {
      opt.successCb && opt.successCb();
    })
    .catch(() => {
      opt.cancelCb && opt.cancelCb();
    });
};

/**
 * alert弹窗
 * @param {String} message 弹窗内容
 * @param {Object} [opt = {}] 配置项
 * @param {String} [opt.title = 提示] 弹窗标题
 * @param {String} [opt.confirmButtonText = 确定] “确定”按钮文案
 * @param {Function} opt.callback 确定-回调函数
 */
export const $alertMessageBox = (message, opt = {}) => {
  const options = {
    title: TITLE,
    confirmButtonText: CONFIRM_BTN_TXT,
    callback: () => {},
  };
  Object.assign(options, opt);
  MessageBox.alert(message, options);
};

/**
 * prompt弹窗
 * @param {String} message 弹窗内容
 * @param {Object} [opt = {}] 配置项
 * @param {String} [opt.title = 提示] 弹窗标题
 * @param {String} [opt.confirmButtonText = 确定] “确定”按钮文案
 * @param {String} [opt.cancelButtonText = 取消] “取消”按钮文案
 * @param {Function} opt.successCb 确定-回调函数
 * @param {Function} opt.cancelCb 取消-回调函数
 */
export const $promptMessageBox = (message, opt = {}) => {
  const options = {
    title: TITLE,
    confirmButtonText: CONFIRM_BTN_TXT,
    cancelButtonText: CANCLE_BTN_TXT,
  };
  Object.assign(options, opt);
  MessageBox.prompt(message, options)
    .then(({ value }) => {
      opt.successCb && opt.successCb(value);
    })
    .catch(() => {
      opt.cancelCb && opt.cancelCb();
    });
};
