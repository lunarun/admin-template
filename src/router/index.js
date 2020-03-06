import Vue from 'vue';
import vueRouter from 'vue-router';
import routes from './table';
import hooks from './hooks/index';

// Vue加载路由模块
Vue.use(vueRouter);
const router = new vueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

hooks(router);

export default router;
