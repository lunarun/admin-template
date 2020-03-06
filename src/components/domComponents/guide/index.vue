<template>
  <div v-if="show" :id="id" class="guide" @click.stop="next">
    <i class="el-icon-close guide-close" @click="close"></i>
    <img
      v-if="model === 'image'"
      class="preview"
      :src="current[showIndex]"
      alt
    />
    <div class="button">
      <el-button class="button-big" type="primary" @click.stop="pre"
        >上一步</el-button
      >
      <el-button class="button-big ml40" type="primary" @click.stop="next"
        >下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import md5 from 'md5';
import store from 'store';
const preCode = [37];
const nextCode = [13, 39];
const quiteCode = [27];
export default {
  name: 'guide',
  data() {
    return {
      id: '',
      className: '',
      container: null,
      // 边距尺寸
      side: 10,
      borderRadius: 3,
      showIndex: 0,
      guideList: [],
      showList: [],
      currentStr: '',
      historyStr: '',
      show: true,
      justicLocal: '',
    };
  },
  props: {
    // in 内部控制显示隐藏， out外部控制显示隐藏
    controlType: {
      type: String,
      required: false,
      default: () => 'in',
    },
    // dom当前提示控制列表
    current: {
      type: Array,
      required: false,
      default: () => [],
    },
    // dom历史提示控制列表
    history: {
      type: Array,
      required: false,
      default: () => [],
    },
    // 是否自动滚动到相应的位置
    crollAuto: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    // 预览模式 默认 dom模式  image(图片模式)
    model: {
      type: String,
      required: false,
      default: () => 'dom',
    },
  },
  watch: {
    current() {
      this.init();
      this.initStr();
      this.initCurrentLocal();
      this.justiceStatus();
    },
  },
  computed: {},
  created() {
    this.initCreated();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initShowList();
      this.monitorKey();
      if (this.showList.length && this.model === 'dom') {
        this.initReadey();
      }
    },
    initCreated() {
      if (this.model === 'dom') {
        this.initId();
        this.initClassName();
        this.monitorOnload();
      }
    },
    initReadey() {
      this.initContainer();
      this.initDomShow();
      this.initList();
      this.monitorResize();
      this.monitorScroll();
    },
    initShowList() {
      this.showList = this.current;
    },
    initCurrentLocal() {
      if (this.historyStr) {
        this.justicLocal = store.get(this.historyStr);
      } else {
        this.justicLocal = store.get(this.currentStr);
      }
    },
    close() {
      this.$emit('close');
      if (this.controlType === 'in') {
        this.setStatus();
        this.guideShowControl(false);
      }
    },
    initDomShow() {
      this.showList.forEach((item) => {
        this.createItem(item);
      });
    },
    setStyle(style, attribute) {
      for (let x in attribute) {
        style[x] = attribute[x];
      }
    },
    /**
     * 绘制显示内容模块
     */
    createContent(target, side) {
      let create = target.cloneNode(true);
      let style = create.style;
      style.position = 'relative';
      style.left = '0';
      style.top = '0';
      style.margin = `${side}px 0 0 ${side}px`;
      style.display = 'inline-block';
      return create;
    },
    /**
     * 设定背景高亮模块
     */
    createHeightLight(target, pos, side, borderRadius) {
      let create = document.createElement('div');
      let style = create.style;
      let attribute = {
        position: 'relative',
        left: '0',
        top: '0',
        display: 'inline-block',
        width: `${pos.width + side * 2}px`,
        height: `${pos.height + side * 2}px`,
        background: 'white',
        borderRadius: `${borderRadius}px`,
      };
      this.setStyle(style, attribute);
      return create;
    },
    guideArrow(pos) {
      let create = new Image();
      let style = create.style;
      let attribute = {
        position: 'relative',
        left: '0',
        top: '0',
        display: 'block',
        width: `${pos.width / 5}px`,
        height: 'auto',
        margin: '10px auto 0',
        // transform: 'rotate(-90deg)',
      };
      this.setStyle(style, attribute);
      create.src = require('./assets/arrows.jpg');
      return create;
    },
    guideText(pos, text, size) {
      let create = document.createElement('div');
      let style = create.style;
      let attribute = {
        position: 'relative',
        left: '0',
        top: '0',
        display: 'inline-block',
        textAlign: 'center',
        color: 'white',
        padding: '10px',
        width: `${pos.width + size * 2}px`,
      };
      this.setStyle(style, attribute);
      create.innerHTML = text;
      return create;
    },
    createItem(target) {
      let pos = target.dom.getBoundingClientRect();
      let element = this.createContent(target.dom, this.side);
      let heightLight = this.createHeightLight(
        target.dom,
        pos,
        this.side,
        this.borderRadius
      );
      let arrow = this.guideArrow(pos);
      let text = this.guideText(pos, target.text, this.side);
      let moduleItem = this.createItemModule(pos, this.side, this.borderRadius);
      this.appendModule(heightLight, element);
      this.appendModule(moduleItem, heightLight);
      this.appendModule(moduleItem, arrow);
      this.appendModule(moduleItem, text);
      this.appendModule(this.container, moduleItem);
    },
    createItemModule(pos, side, borderRadius) {
      let create = document.createElement('div');
      create.classList.add(this.className);
      let style = create.style;
      let attribute = {
        position: 'absolute',
        transform: `translate3d(${pos.left - side}px, ${pos.top - side}px, 0)`,
        borderRadius: `${borderRadius}px`,
        visibility: 'hidden',
        zIndex: 1,
      };
      this.setStyle(style, attribute);
      return create;
    },
    updatePos() {
      let len = this.guideList.length;
      for (let i = 0; i < len; i++) {
        let pos = this.showList[i].dom.getBoundingClientRect();
        this.updatePosItem(this.guideList[i], pos, this.side);
      }
    },
    updatePosItem(target, pos, side) {
      let style = target.style;
      let attribute = {
        transform: `translate3d(${pos.left - side}px, ${pos.top - side}px, 0)`,
      };
      this.setStyle(style, attribute);
    },
    appendModule(container, moduleItem) {
      container.appendChild(moduleItem);
    },
    initId() {
      this.id = `id${Math.random()}`;
    },
    initClassName() {
      this.className = `item${Math.random()}`;
    },
    initList() {
      this.guideList = document.getElementsByClassName(this.className);
      this.initFirstStep();
    },
    initContainer() {
      this.container = document.getElementById(this.id);
    },
    initFirstStep() {
      this.showControl(this.showIndex, true);
      // setTimeout(() => {
      this.toGuidePos();
      // }, 3000);
    },
    clearChild() {
      while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.firstChild);
      }
    },
    pre() {
      if (this.model === 'image') {
        if (this.showIndex > 0) {
          this.preCommon();
        }
      } else {
        if (this.showIndex > 0) {
          this.showControl(this.showIndex, false);
          this.preCommon();
          this.showControl(this.showIndex, true);
          this.toGuidePos();
        }
      }
    },
    preCommon() {
      this.showIndex--;
      this.$emit('pre', this.showIndex);
    },
    next() {
      if (this.model === 'image') {
        if (this.showIndex < this.current.length - 1) {
          this.nextCommon();
        } else {
          this.close();
        }
      } else {
        if (this.showIndex < this.guideList.length - 1) {
          this.showControl(this.showIndex, false);
          this.nextCommon();
          this.showControl(this.showIndex, true);
          this.toGuidePos();
        } else {
          this.close();
        }
      }
    },
    nextCommon() {
      this.showIndex++;
      this.$emit('next', this.showIndex);
    },
    showControl(index, control) {
      if (this.guideList[index]) {
        let style = this.guideList[index].style;
        let attribute = {
          visibility: control ? 'visible' : 'hidden',
        };
        this.setStyle(style, attribute);
      }
    },
    monitorKey() {
      document.addEventListener(
        'keyup',
        (event) => {
          const keyCode = event.keyCode;
          const pre = preCode.find((item) => item === keyCode);
          const next = nextCode.find((item) => item === keyCode);
          const quite = quiteCode.find((item) => item === keyCode);
          pre ? this.pre() : '';
          next ? this.next() : '';
          quite ? this.close() : '';
        },
        false
      );
    },
    monitorResize() {
      window.addEventListener('resize', () => {
        this.updatePos(this.guideList);
      });
    },
    monitorScroll() {
      window.addEventListener('scroll', () => {
        this.updatePos(this.guideList);
      });
    },
    toGuidePos() {
      if (this.crollAuto) {
        const pos = this.getScrollY(this.showList[this.showIndex].dom, 200);
        this.winToTop(pos);
      }
    },
    winToTop(pos) {
      window.scrollTo(pos, pos);
      // window.scrollTo({
      //   top: pos,
      //   behavior: 'smooth',
      // });
    },
    monitorOnload() {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.initFirstStep();
        }, 0);
      });
    },
    getScrollY(element, distanceTop) {
      function getElementPagePosition(element) {
        //计算x坐标
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        //计算y坐标
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop + current.clientTop;
          current = current.offsetParent;
        }
        //返回结果
        return { x: actualLeft, y: actualTop };
      }
      const pos = getElementPagePosition(element);
      return pos.y - distanceTop;
    },
    createMd5Num(list) {
      return md5(list);
    },
    initStr() {
      this.currentStr = this.createMd5Num(JSON.stringify(this.current));
      if (this.history.length) {
        this.historyStr = this.createMd5Num(JSON.stringify(this.history));
      }
    },
    setStatus() {
      if (this.currentStr && !this.historyStr) {
        if (this.justicLocal !== this.currentStr) {
          store.set(this.currentStr, this.currentStr);
        }
      } else if (this.currentStr && this.historyStr) {
        if (this.justicLocal !== this.historyStr) {
          store.set(this.currentStr, this.currentStr);
        }
      }
    },
    justiceStatus() {
      if (this.currentStr && !this.historyStr) {
        if (this.justicLocal === this.currentStr) {
          this.guideShowControl(false);
        } else {
          this.guideShowControl(true);
        }
      } else if (this.currentStr && this.historyStr) {
        if (this.justicLocal === this.historyStr) {
          this.guideShowControl(false);
        } else {
          this.guideShowControl(true);
        }
      }
    },
    guideShowControl(control) {
      this.show = control;
    },
  },
};
</script>
<style scoped lang="scss">
.guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0.95, 0.95, 0.95, 0.5);
  z-index: 1000000;
}
.guide-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  color: white;
  cursor: pointer;
}
.button {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.button-big {
  width: 100px;
  height: 40px;
}
.ml40 {
  margin-left: 30px;
}
.preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 100vh;
}
</style>
