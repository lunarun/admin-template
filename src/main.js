import Vue from 'vue';

// 富文本配置文件
import '../static/ueditor/ueditor.all';
import '../static/ueditor/ueditor.all.min';
import '../static/ueditor/lang/zh-cn/zh-cn';

// Element-ui
import Element from 'element-ui';
Vue.use(Element, {
  // set element-ui default size
  size: 'small',
});
import '@/assets/theme/index.css';
import 'font-awesome/css/font-awesome.min.css';

// 全局常量
import globalConstant from './constant';
Vue.use(globalConstant);

// ------- 组件抽离到私有npm部分 start -------
// 全局组件 + 全局方法
import globalComponents from './components';
Vue.use(globalComponents);

// 全局dom组件
// import domComponent from '@iyourcar-admin/dom-component';
// Vue.use(domComponent);

// 全局方法
// import commonComponents from '@iyourcar-admin/common-compoentns';
// Vue.use(commonComponents);

/**
 * echart 二次封装组件
 */
import vueZxEchart from 'src/yc-echart/index';
Vue.use(vueZxEchart);

/**
 * echart 二次封装组件npm
 */
// import vueZxEchart from '@iyourcar-admin/yc-echart';
// Vue.use(vueZxEchart);
// ------- 组件抽离到私有npm部分 end -------

// 导入图标
import '@/icons'; // icon

// Vue的扩展方法
import vueExtendsFunction from './vue-extends/functions';
Vue.use(vueExtendsFunction);

// 错误日志
import './errorLog';

// 关闭生产环境提示
Vue.config.productionTip = false;

// 网络I/O服务
import net from './net';
Vue.use(net);

// 用户身份认证
import session from './session/index';
Vue.use(session, { label: require('../package.json').name });

/**
 * 页面路由
 */
import VueRouter from 'vue-router';
// import router from './router/index';
// window.router = router;
Vue.use(VueRouter);

// 初始化Vue实例
import App from './App';
import router from './router';
import store from './store';
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
