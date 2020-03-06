export default {
  rejected(error) {
    // 这里必须 throw ，业务层才可能从catch里面拿到：
    throw error;
  },
};
