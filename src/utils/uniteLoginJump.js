/**
 * 前端配合统一登录页跳转的逻辑：
 */
import { getStoken, redirectLoginPage } from 'iyourcar-getstoken';
import { formatUrlParameter } from 'src/utils';
import auth from '@iyourcar-admin/acl';
import Session from '../session';

// 在从 统一登录页登入之后，获取stoken:
async function getSystemStoken() {
  let env = 'develop';
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'release'
  ) {
    env = process.env.NODE_ENV;
  }

  return getStoken(env);
}

// 退出之后，再请求接口决定重定向去哪里：
function httpRequestRedirectLogin(params) {
  return redirectLoginPage({
    env: process.env.NODE_ENV || 'develop',
    path: `${window.location.origin}${window.location.pathname}#/login`,
    ...params,
  });
}

/**
 * 整个过程如有失败，保底跳去自有登录页：
 */
function ensureJumpSelfLoginPage() {
  if (window.location.href.includes('/login')) return;
  setTimeout(() => {
    window.location = `${window.location.origin}${
      window.location.pathname
    }#/login`;
  }, 10);
}

/**
 * 把根据redirectLoginPage的返回结果
 */
export async function logout(result = {}) {
  const session = Session.getInstance();

  function _final() {
    session.clearSession();
    session.clearInfo();
    auth.getInstance().setPermission([]);
    ensureJumpSelfLoginPage();
  }
  try {
    await httpRequestRedirectLogin({
      result,
      // callback 在返回自有登录页的时候执行：
      callback: _final,
    });
  } catch (e) {
    _final();
  }
}

export async function login(cb) {
  const query = formatUrlParameter();
  if (query.secret && query.sk && query.timestamp) {
    const res = await getSystemStoken();
    return cb(res);
  }
}
