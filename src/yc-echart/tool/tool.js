let countkey = 1;
// 创建唯一的内部标识id
export const uniquenessKey = function() {
  countkey += 1;
  return countkey;
  // return new Date().getTime();
};

/**
 * 通过props数据 格式化出watch数据
 * @param {*} propsObj
 */
export const createWatch = function(propsObj) {
  let watchObj = {};
  for (let item in propsObj) {
    watchObj[item] = function() {
      this.dataChange();
    };
  }
  return watchObj;
};
