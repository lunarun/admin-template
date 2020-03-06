/**
 * 常量定义
 * 测试示列，实际开发可以删除
 */
export const TEST_1 = {
  ATTR_1: 1,
};
export const TEST_2 = {
  A: 1,
};

export default (Vue) => {
  Vue.prototype.$constant = {
    TEST_1,
    TEST_2,
  };
};
