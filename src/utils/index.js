/*
 * @Description: 工具函数集
 * @Author: YJ
 * @Date: 2019-10-17 13:34:29
 * @LastEditTime: 2019-10-17 15:41:49
 * @LastEditors: Please set LastEditors
 */
const dataType = [
  'Number',
  'String',
  'Function',
  'Boolean',
  'Object',
  'Array',
  'Date',
];

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * @desc 判断数据类型
 */
export const DataType = {};
for (let i = 0; i < dataType.length; i++) {
  /* eslint-disable */
  DataType['is' + dataType[i]] = ((_type) => {
    return (_data) => ({}.toString.call(_data) == '[object ' + _type + ']');
  })(dataType[i]);
}
/**
 * @desc 随机生成字符串
 * @param {number} len 要生成的字符串长度
 */
export function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let maxPos = $chars.length;
  let pwd = '';
  let gap = 0;
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  gap = len - pwd.length;
  for (let a = 0; a < gap; a++) {
    pwd += 'o';
  }
  return pwd;
}
/**
 * @desc 时间格式转换
 * @param { Date/String/Number } date 时间，可Date对象、时间字符串、时间戳
 * @param {*} pattern 要返回的时间字符串格式
 * @return {Boolean}
 */
export function formatDate(date, pattern) {
  const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
  const DEFAULT_PATTERN = 'yyyy-MM-dd';
  if (!DataType.isDate(date)) {
    date = new Date(date);
  }
  pattern = pattern || DEFAULT_PATTERN;
  return pattern.replace(SIGN_REGEXP, ($0) => {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length);
      case 'M':
        return padding(date.getMonth() + 1, $0.length);
      case 'd':
        return padding(date.getDate(), $0.length);
      case 'w':
        return date.getDay() + 1;
      case 'h':
        return padding(date.getHours(), $0.length);
      case 'm':
        return padding(date.getMinutes(), $0.length);
      case 's':
        return padding(date.getSeconds(), $0.length);
    }
  });
}

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
export function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * @desc 根据name读取cookie
 * @param  {String} key
 * @return {String}
 */
export function getCookie(key) {
  const arr = document.cookie.replace(/\s/g, '').split(';');
  for (let i = 0; i < arr.length; i++) {
    const tempArr = arr[i].split('=');
    if (tempArr[0] === key) {
      return decodeURIComponent(tempArr[1]);
    }
  }
  return '';
}

/**
 * @desc  设置Cookie
 * @param {String} key
 * @param {String} value
 * @param {Number} days 有效期，单位秒
 */
export function setCookie(key, value, second) {
  const date = new Date();
  date.setTime(date.getTime() + second * 1000);
  document.cookie = key + '=' + value + ';expires=' + date;
}

/**
 * @desc 根据key删除cookie
 * @param  {String} key
 */
export function removeCookie(key) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(key, '1', -1);
}

/**
 * @desc 生成指定范围随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export function randomNum(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  email
 * @return {Boolean}
 */
export function isEmail(email) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);
}
/**
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isIdCard(str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  );
}
/**
 * @desc   判断是否为手机号
 * @param  {String|Number} phone
 * @return {Boolean}
 */
export function isPhoneNum(phone) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
    phone
  );
}
/**
 * @desc   判断是否为URL地址
 * @param  {String} url
 * @return {Boolean}
 */
export function isUrl(url) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
    url
  );
}

/**
 * @desc   倒计时，计算距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {Object}
 */
export function formatRemainTime(endTime) {
  // 开始时间
  const startDate = newDate();
  // 结束时间
  const endDate = newDate(endTime);
  //时间差
  const t = endDate.getTime() - startDate.getTime();
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }
  return {
    d,
    h,
    m,
    s,
  };
}
/**
 * @desc   url参数转对象
 * @param  {String} url  默认是window.location.href
 * @return {Object}
 */
export function formatUrlParameter(url) {
  const urlStr = !url ? window.location.href : url;
  if (!~urlStr.indexOf('?')) return {};

  const search = urlStr.substring(urlStr.lastIndexOf('?') + 1);

  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
