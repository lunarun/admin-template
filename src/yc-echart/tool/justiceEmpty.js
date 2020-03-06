/**
 * 判定通过props直接传入的data数组进行判定数据是否为空
 * @param {*} data 数据数组
 */
const justiceEmptyData = function(data) {
  if (data && data.length) {
    this.emptyJustice = true;
  } else {
    this.emptyJustice = false;
  }
};

export default {
  justiceEmptyData,
};
