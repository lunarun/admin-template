<style lang="scss">
.ueditor-com {
  word-break: break-word;
  line-height: 20px;
  img,
  video {
    max-width: 100%;
  }
  .edui-toolbar {
    text-align: left;
  }
  .edui-default .edui-toolbar .edui-combox .edui-combox-body {
    border: 1px solid #ccc !important;
  }
  .w-editor-toolbar {
    background: #ebebeb;
    padding-top: 2px;
  }
  .w-editor-content_box {
    border: 1px solid #ccc;
    height: 500px;
  }
  .w-editor-text {
    text-align: left;
    .w-e-text-container {
      height: 500px !important;
    }
  }
  .edui-wn-icon {
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .single-image-dialog {
    .el-dialog__body {
      padding: 5px 20px 20px;
    }
    .el-input {
      max-width: 380px;
    }
    .select-appid {
      width: 320px;
    }
  }
  .add-img-win {
    // .el-dialog__body {
    //   padding: 5px 20px 20px;
    // }
    .win-img-list {
      max-height: 380px;
      overflow-y: auto;
    }
    .img-tips_txt {
      font-size: 12px;
      color: #aaa;
      // margin-bottom: 10px;
    }
  }
  .com-video-progress {
    padding-top: 10px;
    .el-progress-bar {
      padding-right: 100px;
    }
    .el-progress__text {
      margin-left: -20px;
    }
  }
  .force-enable-icon {
    .edui-box.edui-icon.edui-default {
      opacity: 1;
      filter: none;
    }
  }
}
</style>

<template>
  <div class="ueditor-com" ref="ueditor">
    <script :id="editorId" type="text/plain"></script>
    <yc-dialog
      class="single-image-dialog"
      title="添加图片"
      width="640px"
      :visible.sync="singleImageDialogVisible"
      :close-on-click-modal="false"
      @click-ok="onSubmitSingleImage"
      @click-cancel="singleImageDialogVisible = false"
    >
      <el-form>
        <el-form-item label="图片" required>
          <image-upload
            ref="upload_image_single"
            :image-item-height="150"
            :image-item-width="150"
            :image="singleImageForm.image"
            @finishUpload="finishUpload"
          ></image-upload>
        </el-form-item>
        <el-form-item label="跳转方式" required>
          <el-radio-group v-model="singleImageForm.jump_type">
            <el-radio label="no_jump">无跳转</el-radio>
            <el-radio label="this_app">本小程序</el-radio>
            <el-radio label="other_app">其他小程序</el-radio>
            <el-radio label="h5_page">网页</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="APPID"
          required
          v-show="singleImageForm.jump_type === 'other_app'"
        >
          <el-select
            v-model="singleImageForm.appid"
            class="select-appid"
            :spellcheck="false"
            placeholder="请输入要跳转的小程序的APPID"
            clearable
            filterable
            default-first-option
            allow-create
          >
            <el-option
              v-for="item in APPID_TYPE_ARRAY"
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="页面路径类型"
          required
          v-show="['this_app'].includes(singleImageForm.jump_type)"
        >
          <el-radio-group v-model="singleImageForm.wxapp_path_type">
            <el-radio label="normal">普通页面路径</el-radio>
            <el-radio label="tab">tab页面路径</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="页面路径"
          required
          v-show="['other_app', 'this_app'].includes(singleImageForm.jump_type)"
        >
          <el-input
            clearable
            placeholder="请输入要跳转的小程序页面路径"
            v-model="singleImageForm.page_path"
            key="page_path"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="地址"
          required
          v-show="singleImageForm.jump_type === 'h5_page'"
        >
          <el-input
            clearable
            placeholder="请输入要打开的网页地址"
            v-model="singleImageForm.h5_path"
            key="h5_path"
          ></el-input>
        </el-form-item>
      </el-form>
    </yc-dialog>

    <yc-dialog
      class="add-img-win"
      title="添加图片"
      :visible.sync="showAddImgWin"
      :close-on-click-modal="false"
      @click-ok="onUploadImg"
      @click-cancel="showAddImgWin = false"
    >
      <div class="img-tips_txt">选择的图片不能大于1M</div>
      <div class="win-img-list">
        <image-upload
          ref="upload_image"
          :image-item-height="150"
          :image-item-width="150"
          upload-style="multi"
          :size="1"
          :image="selectImgList.image"
          @finishUpload="finishImageUpload"
        ></image-upload>
      </div>
    </yc-dialog>

    <yc-dialog
      :close-on-click-modal="false"
      :visible.sync="showAddVideoWin"
      width="500px"
      title="添加视频"
    >
      <el-form label-width="80px" :disabled="isUpload">
        <el-form-item label="视频" required>
          <div class="com-video-progress">
            <el-progress :percentage="videoInfo.progress"></el-progress>
            <el-upload
              ref="video-file"
              accept="video/*"
              :auto-upload="false"
              :on-change="onSelectVideoFile"
              :on-remove="onRemoveVideoFile"
              :limit="1"
              action="/"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">300M以内，不限格式</div>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button :disabled="isUpload" @click="showAddVideoWin = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="onComfirmAddVideo"
          :disabled="isUpload"
          >{{ isUpload ? '上传中……' : '确定' }}</el-button
        >
      </div>
    </yc-dialog>
  </div>
</template>

<script>
import '../../../../static/ueditor/ueditor.config.js';
import '../../../../static/ueditor/ueditor.all.js';
import '../../../../static/ueditor/lang/zh-cn/zh-cn.js';
// import '../../../static/ueditor/ueditor.config.js';
// import '../../../static/ueditor/ueditor.all.min.js';
// import '../../../static/ueditor/lang/zh-cn/zh-cn.js';
import YcDialog from '@/components/domComponents/yc-dialog';
import service from './server.js';

const APPID_TYPE_ARRAY = [
  { value: 'wxd89b0def414d9163', label: '有车以后' },
  { value: 'wxce41379a615edaed', label: '车王答题' },
  { value: 'wx4c3af9312307ce20', label: '有车福袋' },
  { value: 'wx7825fabcaf9d87e3', label: '砖叔福利开抢' },
  { value: 'wx24307a21e84db71a', label: '众泰T700报价' },
  { value: 'wx5498724bb5671eb8', label: '博越报价大全' },
  { value: 'wx69105532936c26f6', label: '群空间' },
];

function initSingleImageForm() {
  return {
    image: {
      type: 'ycyh_material_image',
      imageShowList: [],
    },
    /**
     * no_jump 无跳转
     * this_app 本小程序
     * other_app 其他小程序
     * h5_page 网页
     */
    jump_type: 'no_jump',
    wxapp_path_type: 'normal',
    appid: '',
    page_path: '',
    h5_path: '',
    progress: 0,
  };
}

function initImageForm() {
  return {
    image: {
      type: 'ycyh_material_image',
      imageShowList: [],
    },
  };
}

function initVideoForm() {
  return {
    progress: 0,
    video: '',
    videoList: [],
  };
}

export default {
  name: 'uEditor',
  components: {},

  props: {
    // 插入图片是否需要配置项
    isImageSetting: {
      type: Boolean,
      default: false,
    },
    // 上传视频，获取7牛配置的type
    uploadVideoType: {
      type: String,
    },
  },

  data() {
    return {
      // 上传实例
      uploader: null,
      throttleSubmit: 0,
      APPID_TYPE_ARRAY,
      editorId: `${Math.random()
        .toString(36)
        .substr(2)}-${Date.now()}`,
      config: {
        // 可以在此处定义工具栏的内容
        toolbars: [
          [
            'source', // 源代码
            // 'anchor', // 锚点
            'undo', // 撤销
            'redo', // 重做
            'bold', // 加粗
            'indent', // 首行缩进
            // 'snapscreen', // 截图
            'italic', // 斜体
            'underline', // 下划线
            'strikethrough', // 删除线
            'subscript', // 下标
            'fontborder', // 字符边框
            'superscript', // 上标
            'formatmatch', // 格式刷
            'blockquote', // 引用
            'pasteplain', // 纯文本粘贴模式
            'selectall', // 全选
            'print', // 打印
            'preview', // 预览
            'horizontal', // 分隔线
            'removeformat', // 清除格式
            'time', // 时间
            'date', // 日期
            // 'unlink', // 取消链接
            // 'insertrow', // 前插入行
            // 'insertcol', // 前插入列
            // 'mergeright', // 右合并单元格
            // 'mergedown', // 下合并单元格
            // 'deleterow', // 删除行
            // 'deletecol', // 删除列
            // 'splittorows', // 拆分成行
            // 'splittocols', // 拆分成列
            // 'splittocells', // 完全拆分单元格
            // 'deletecaption', // 删除表格标题
            // 'inserttitle', // 插入标题
            // 'mergecells', // 合并多个单元格
            // 'deletetable', // 删除表格
            'cleardoc', // 清空文档
            'insertparagraphbeforetable', // "表格前插入行"
            'insertcode', // 代码语言
            'fontfamily', // 字体
            'fontsize', // 字号
            'paragraph', // 段落格式
            'simpleupload', // 单图上传
            'insertimage', // 多图上传
            // 'edittable', // 表格属性
            // 'edittd', // 单元格属性
            // 'link', // 超链接
            // 'emotion', // 表情
            'spechars', // 特殊字符
            'searchreplace', // 查询替换
            // 'map', // Baidu地图
            // 'gmap', // Google地图
            'insertvideo', // 视频
            // 'help', // 帮助
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            'fullscreen', // 全屏
            'directionalityltr', // 从左向右输入
            'directionalityrtl', // 从右向左输入
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'pagebreak', // 分页
            'insertframe', // 插入Iframe
            'imagenone', // 默认
            'imageleft', // 左浮动
            'imageright', // 右浮动
            'attachment', // 附件
            'imagecenter', // 居中
            'wordimage', // 图片转存
            'lineheight', // 行间距
            'edittip ', // 编辑提示
            'customstyle', // 自定义标题
            'autotypeset', // 自动排版
            // 'webapp', // 百度应用
            'touppercase', // 字母大写
            'tolowercase', // 字母小写
            'background', // 背景
            'template', // 模板
            'scrawl', // 涂鸦
            // 'music', // 音乐
            // 'inserttable', // 插入表格
            'drafts', // 从草稿箱加载
            // 'charts', // 图表
          ],
        ],
        serverUrl: '',
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        // 初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        initialContent: '请输入内容',
        // 是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        autoClearinitialContent: true,
        initialFrameWidth: null,
        initialFrameHeight: 450,
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/',
        // 图片
        // imageAllowFiles: [".gif", ".jpg"],
        // imageUrl: 'http://up.qiniu.com/',
        // "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
        // "imageFieldName": "file", /* 提交的图片表单名称 */
        // "imageMaxSize": 2048000, /* 上传大小限制，单位B */
        // "imageUrlPrefix": "http://7xkcdc.com2.z0.glb.qiniucdn.com/", /* 图片访问路径前缀 */
        // "imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
      },
      content: '',
      editor: null,
      isReady: false,
      showAddImgWin: false,
      selectImgList: initImageForm(),
      isUpload: false,
      showAddVideoWin: false,
      videoInfo: initVideoForm(),
      /**
       * 单图对话框：
       */
      singleImageDialogVisible: false,
      singleImageForm: initSingleImageForm(),
    };
  },
  watch: {
    showAddImgWin(val) {
      if (!val) {
        this.clearSelectImages();
      }
    },
    showAddVideoWin() {
      this.clearSelectVideo();
    },
  },
  created() {
    this._$service = new service();
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化UE
     */
    async init() {
      // 初始化UE
      this.editor = window.UE.delEditor(this.editorId);
      this.editor = window.UE.getEditor(this.editorId, this.config);
      this.editor.ready(() => {
        this.isReady = true;
        this.setContent(this.content);
        this.initEvent();
      });
      this.editor.addListener('contentChange', (res) => {
        this.emitContentChangeEvent();
      });
      this.editor.execCommand('uploadimage', '_token', '123');
    },

    setTimeoutPromise(func, delay = 80) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            func();
            resolve();
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    },

    /**
     * 初始化事件
     */
    async initEvent() {
      let imgDom = null;
      let singleImageBtn = null;
      let videoDom = null;
      let singleImageBtnBox = null;
      const { ueditor } = this.$refs;

      // 不要用id，id序号是动态生成的，每次都不一定一样：
      let singleImageIcon = ueditor.querySelector('.edui-for-simpleupload');

      try {
        singleImageBtn = this.$refs.ueditor.querySelector(
          `.edui-for-simpleupload .edui-button-body`
        );

        if (!this.isImageSetting) {
          singleImageBtnBox = this.$refs.ueditor.querySelector(
            `.edui-for-simpleupload .edui-default`
          );
          UE.dom.domUtils.setStyle(singleImageBtnBox, 'display', 'none');
        }

        imgDom = this.$refs.ueditor.querySelector(
          `.edui-for-insertimage .edui-button-body`
        );
        videoDom = this.$refs.ueditor.querySelector(
          `.edui-for-insertvideo .edui-button-body`
        );

        // 用async await 来取代setTimeout的回调函数，这样才能try到错误：
        await this.setTimeoutPromise(() => {}, 500);
        // 实在是删不干净 edui-state-disabled 只能这样hack：
        singleImageIcon.classList.add('force-enable-icon');
        singleImageIcon.onmouseover = function(e) {
          this.classList.add('edui-state-hover');
        };
        singleImageIcon.onmouseout = function(e) {
          this.classList.remove('edui-state-hover');
        };
        this.setTimeoutPromise(() => {}, 3000);
        // 实在是删不干净 edui-state-disabled 只能这样hack：
        singleImageIcon.classList.add('force-enable-icon');
        singleImageIcon.onmouseover = function(e) {
          this.classList.add('edui-state-hover');
        };
        singleImageIcon.onmouseout = function(e) {
          this.classList.remove('edui-state-hover');
        };
      } catch (e) {
        singleImageBtn = null;
        singleImageBtn = null;
        imgDom = null;
        await this.setTimeoutPromise(() => {}, 100);
        await this.initEvent();
      }
      if (imgDom) {
        imgDom.onclick = () => {
          this.showAddImgWin = true;
        };
      }
      if (singleImageBtn) {
        singleImageBtn.onclick = () => {
          this.singleImageForm = initSingleImageForm();
          this.singleImageDialogVisible = true;
        };
      }
      if (videoDom) {
        videoDom.onclick = () => {
          this.showAddVideoWin = true;
        };
      }
    },

    emitContentChangeEvent() {
      this.content = this.editor.getContent();
      this.$emit('editor-input', this.content);
    },

    /**
     * 清空选择的图片
     */
    clearSelectImages() {
      this.selectImgList = initImageForm();
    },

    /**
     * 清除视频文件
     */
    clearSelectVideo() {
      if (!this.$refs['video-file']) return;
      this.$refs['video-file'].clearFiles();
      this.videoInfo.video = '';
      this.videoInfo.videoList.splice(0, this.videoInfo.videoList.length);
      this.videoInfo.progress = 0;
    },

    /**
     * 设置编辑器内容
     */
    setContent(content) {
      if (this.isReady) {
        this.editor.setContent(content || '');
      }
      this.content = content;
    },

    /**
     * 上传图片
     */
    onUploadImg() {
      this.$refs.upload_image.uploaderSubmit();
    },

    /**
     * 仅图片上传完成回调
     */
    finishImageUpload() {
      const { image } = this.selectImgList;
      for (let i = 0; i < image.imageShowList.length; i++) {
        this.editor.execCommand(
          'inserthtml',
          `<img src="${image.imageShowList[i]}" />`
        );
        const content = this.editor.getContent();
        this.setContent(`${content}<p><br /></p>`);
      }
      this.showAddImgWin = false;
    },

    /**
     * 选择视频文件时触发
     */
    onSelectVideoFile(file, files) {
      // 图片大小，单位M
      const size = file.size / 1024 / 1024;
      if (size > 300) {
        this.$message({
          type: 'error',
          message: '视频大小不能超过300M',
        });
        files.pop();
        return;
      }
      this.videoInfo.video = file.raw;
      this.videoInfo.videoList = files;
    },
    onRemoveVideoFile() {
      this.videoInfo = initVideoForm();
    },

    /**
     * 上传视频
     */
    async onComfirmAddVideo() {
      if (!this.videoInfo.video) {
        this.$message({
          type: 'error',
          message: '请选择视频文件',
        });
        return;
      }
      this.isUpload = true;
      this._$service
        .aVideoUploadToQiniu(
          {
            file: this.videoInfo.video,
            type: this.uploadVideoType,
          },
          (progress) => {
            let percent = progress.total.percent;
            percent = +percent.toFixed(2);
            this.videoInfo.progress = percent;
          }
        )
        .then((res) => {
          if (!res) return;
          // 更新url 地址
          this.videoInfo = initVideoForm();
          this.editor.execCommand(
            'inserthtml',
            `<video controls="controls" src="${res.url}">视频</video>`
          );
          const content = this.editor.getContent();
          this.setContent(`${content}<p><br /></p>`);
          this.showAddVideoWin = false;
        });
      this.isUpload = false;
    },

    /**
     * 上传可配置项图片
     */
    onSubmitSingleImage() {
      let tips;
      const form = this.singleImageForm;
      if (!form.image) {
        tips = '请选择图片';
      } else if (!form.page_path && form.jump_type === 'this_app') {
        tips = '请输入要跳转的小程序页面路径';
      } else if (!form.appid && form.jump_type === 'other_app') {
        tips = '请输入要跳转的小程序的APPID';
      } else if (!form.page_path && form.jump_type === 'other_app') {
        // 为了保证提示的顺序， 重新加了：
        tips = '请输入要跳转的小程序页面路径';
      } else if (!form.h5_path && form.jump_type === 'h5_page') {
        tips = '请输入要打开的网页地址';
      }
      if (tips) {
        this.$message.error(tips);
        return;
      }
      this.doSubmitSingleImage();
    },
    async doSubmitSingleImage() {
      if (this.throttleSubmit) return;
      this.throttleSubmit = setTimeout(() => {
        this.throttleSubmit = 0;
      }, 2000);
      this.$refs.upload_image_single.uploaderSubmit();
    },

    /**
     * 上传结束回调
     */
    finishUpload() {
      this.insertImageHtml(this.singleImageForm);
      const content = this.editor.getContent();
      this.setContent(`${content}<p><br /></p>`);
      this.singleImageForm = initSingleImageForm();
      this.singleImageDialogVisible = false;
    },

    /**
     * 单图上传插入文本
     */
    insertImageHtml(form) {
      let dataType = '';
      if (form.jump_type === 'no_jump') {
        dataType = 'empty';
      } else if (
        form.jump_type === 'this_app' &&
        form.wxapp_path_type === 'normal'
      ) {
        dataType = 'localAppletPage';
      } else if (
        form.jump_type === 'this_app' &&
        form.wxapp_path_type === 'tab'
      ) {
        dataType = 'localAppletTag';
      } else if (form.jump_type === 'other_app') {
        dataType = 'otherApplet';
      } else if (form.jump_type === 'h5_page') {
        dataType = 'web';
      }
      let dataUrl = '';
      if (form.jump_type === 'this_app' || form.jump_type === 'other_app') {
        dataUrl = form.page_path;
      } else if (form.jump_type === 'h5_page') {
        dataUrl = form.h5_path;
      }
      this.editor.execCommand(
        'inserthtml',
        `<img src="${
          form.image.imageShowList[0]
        }" data-type="${dataType}" data-url="${dataUrl}" data-appid="${
          form.appid
        }" />`
      );
    },
  },
};
</script>
