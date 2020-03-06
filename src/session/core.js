import store from 'store';
export default class session {
  label = 'admin';
  sid = '';
  token = '';
  info = null;
  constructor({ label } = {}) {
    if (label) this.label = label;

    this.sid = this._getLocalStorage('sid') || '';
    this.token = this._getLocalStorage('token') || '';
  }

  setInfo(info) {
    if (info) {
      this.info = info;
      this._setLocalStorage('info', info);
    }
  }

  getInfo() {
    return this._getLocalStorage('info');
  }

  clearInfo() {
    this.info = null;
    localStorage.removeItem(`${this.label}_info`);
  }

  getSession() {
    return {
      sid: this._getLocalStorage('sid'),
      token: this._getLocalStorage('token'),
    };
  }

  setSession({ sid, token } = {}) {
    if (sid) {
      this.sid = sid;
      this._setLocalStorage('sid', sid);
    }

    if (token) {
      this.token = token;
      this._setLocalStorage('token', token);
    }
  }

  clearSession() {
    this.sid = '';
    this.token = '';
    store.remove(`${this.label}_sid`);
    store.remove(`${this.label}_token`);
  }

  _setLocalStorage(key, value) {
    if (value) store.set(`${this.label}_${key}`, value);
  }

  _getLocalStorage(key) {
    return this[key] || store.get(`${this.label}_${key}`) || undefined;
  }
}
