// common
import multImagePreview from './commonComponents/mult-image-preview/index.vue';
import singleImagePreview from './commonComponents/single-image-preview/index.vue';
import previewVideo from './commonComponents/preview-video/index.vue';
// dom
import cropper from './domComponents/cropper/index.vue';
import imageUpload from './domComponents/image-upload/index.vue';
import ycDialog from './domComponents/yc-dialog/index.vue';
import baiduMap from './domComponents/baidu-maps/index.vue';
import breadCrumb from './domComponents/bread-crumb/index.vue';
import hamburger from './domComponents/hamburger/index.vue';
import searchForm from './domComponents/search-form/index.vue';
import ycTable from './domComponents/yc-table/index.vue';
import scrollPane from './domComponents/scroll-pane/index.vue';
import uEditor from './domComponents/ueditor/index.vue';
import icon from './domComponents/font-icon/index.vue';
import svgIcon from './domComponents/svg-icon/index.vue';
import uploadExcelComponent from './domComponents/upload-excel/index.vue';
import downtime from './domComponents/downtime/index.vue';
import backToTop from './domComponents/back-to-top/index.vue';
import guide from './domComponents/guide/index.vue';

const domComponents = [
  imageUpload,
  cropper,
  ycDialog,
  baiduMap,
  breadCrumb,
  hamburger,
  searchForm,
  ycTable,
  scrollPane,
  uEditor,
  icon,
  svgIcon,
  uploadExcelComponent,
  downtime,
  backToTop,
  guide,
  previewVideo,
];
const commonComponents = [multImagePreview, singleImagePreview, previewVideo];

const install = (Vue) => {
  // dom组件注册
  domComponents.map((component) => Vue.component(component.name, component));
  // 全局方法绑定
  commonComponents.map((component) => {
    const GlobalItem = Vue.extend(component);
    const globalItemInstance = new GlobalItem().$mount();
    Vue.prototype[`$${component.name}`] = (...params) => {
      const $el = globalItemInstance.$el;
      // 防止重复添加导致重新渲染
      !$el.parentNode && document.getElementById('app').appendChild($el);

      globalItemInstance.operate(...params);
    };
  });
};

export default {
  install,
};
