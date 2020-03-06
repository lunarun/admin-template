import session from './core';
import setSessionToRequestBody from './setSessionToRequestBody';
import checkSession from './checkSession';

export default {
  _instance: null,
  install(Vue, options) {
    const { label } = options;
    this._instance = this._create({ label });
    Vue.prototype.$session = this._instance;
  },
  getInstance({ label } = {}) {
    return this._instance || this._create({ label });
  },
  _create({ label }) {
    return new session({ label });
  },
  setSessionToRequestBody,
  checkSession,
};
