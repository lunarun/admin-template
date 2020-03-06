import auth from '@iyourcar-admin/acl';
import net from '../../net';

export default function(router) {
  const _authGuard = auth.getInstance();

  router.beforeEach(async (to, from, next) => {
    await _getPermissions(_authGuard);

    // 部分特殊路由不检查权限
    const specialPaths = ['/', '/404', '/login', '/template'];
    if (!!~specialPaths.indexOf(to.path)) return next();

    if (!_authGuard.checkPath(to.path)) {
      const currentIs404 = to.path === from.path && to.path === path404;
      next(currentIs404 ? false : specialPaths[0]);
      return;
    }
    next();
  });

  router.afterEach((route) => {
    _authGuard.setCurrentTab();
  });
}

function _getPermissions(authGuard) {
  if (authGuard.getPermission().length > 0) return;

  const _http = net.initHttp();
  return new Promise((resolve, reject) => {
    _http
      .$post(
        'http://res.youcheyihou.com/test/node/datar/mock/4c89284694a7c5f195e75dc2bd15364a/adminTemplate/permission'
      )
      .then((datas) => {
        const result = (datas || {}).result || [];
        authGuard.setPermission(result);
        resolve();
      });
  });
}
