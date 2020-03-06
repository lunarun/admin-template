import Vue from 'vue';

import { aCommonGet, aCommonPost } from 'src/net/commonApi';
class service extends Vue {
  constructor() {
    super();
  }

  async postApi() {
    const res = await this.$post(
      'http://res.youcheyihou.com/test/node/datar/mock/4c89284694a7c5f195e75dc2bd15364a/adminTemplate/postApi'
    );

    /**
     * 按视图需要，预先处理好res数据
     * ...
     */

    return res;
  }

  async commonGet() {
    const res = await aCommonGet({ name: 'Bob', age: 18 });

    /**
     * 按视图需要，预先处理好res数据
     * ...
     */

    return res;
  }

  async commonPost() {
    const res = await aCommonPost({ name: 'Tom', age: 28 });

    /**
     * 按视图需要，预先处理好res数据
     * ...
     */

    return res;
  }
}
export default service;
