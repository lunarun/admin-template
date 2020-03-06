/**
 * 指令
 */
const directives = [];

// const install = (Vue, opts = {})=>{
//     directives.map(directive => {
//         Vue.directive(directive.name, directive);
//     });
// };
const install = (Vue) => {
  directives.map((Obj) => {
    for (const key in Obj) {
      if ({}.hasOwnProperty.call(Obj, key)) {
        Vue.directive(key, Obj[key]);
      }
    }
    return Obj;
  });
};

export default {
  install,
};
