import Session from '../../session/index';
import { logout } from 'src/utils/uniteLoginJump';
export default function(router) {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    if (Session.checkSession()) return next();
    logout();
    next('/login');
  });

  router.afterEach((route) => {});
}
