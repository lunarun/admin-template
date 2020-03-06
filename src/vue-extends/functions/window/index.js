import VueRouter from 'vue-router';
/**
 * 跳转页面通用方法
 * @param {String} path 跳转路径
 * @param {Object} query 跳转后连接携带的参数
 * query: {
      uid: 111,
      tab: 'postlist',
    }
  * @param {Boolean} newPage 跳转是否需要打开新页面，默认为true
  * 
  */
export default {
  name: '$openWindow',
  fn(path, query = {}, newPage = true) {
    const pathObj = { path, query };
    if (newPage) {
      const { href } = this.$router.resolve(pathObj);
      return _openWay(href);
    }
  },
};
// const $openWindow = (path, query = {}, newPage = true) => {
//   const pathObj = { path, query };
//   console.log(this);

//   if(newPage) {
//     const { href } = VueRouter.prototype.resolve(pathObj);

//     return _openWay(href);

//   }
//   VueRouter.prototype.push(pathObj);
// }

/**
 * 防止浏览组拦截新开页面
 * @param {String} url 跳转路径
 * @private
 */
const _openWay = (url) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.setAttribute('id', 'newPage');
  // 防止反复添加
  if (!document.getElementById('newPage')) {
    document.body.appendChild(a);
  }
  a.click();
};

// export default {
//   $openWindow,
// };
