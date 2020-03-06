/**
 * Vue方法扩展
 */
import interactive from './interactive';
import excel from './excel';
import window from './window';
const install = (Vue) => {
  [interactive, excel, window].map((Obj) => {
    for (const key in Obj) {
      if ({}.hasOwnProperty.call(Obj, key)) {
        if (key.indexOf('$') > -1) {
          Vue.prototype[key] = Obj[key];
        } else {
          Vue.prototype[Obj.name] = Obj.fn;
        }
      }
    }
    return Obj;
  });
};

export default {
  install,
};
