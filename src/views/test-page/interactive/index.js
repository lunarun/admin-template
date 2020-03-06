export default {
  data() {
    return {};
  },
  methods: {
    successMessage() {
      this.$successMessage('这是一条成功提示');
    },
    warningMessage() {
      this.$warningMessage('这是一条警告提示');
    },
    errorMessage() {
      this.$errorMessage('这是一条错误提示');
    },
    infoMessage() {
      this.$infoMessage('这是一条信息提示');
    },
    confirm() {
      this.$confirmMessageBox('这是确认消息对话框', {
        title: '这是标题',
        cancelCb: () => {
          alert('你点了取消');
        },
        successCb: () => {
          alert('你点了确定');
        },
      });
    },
    alert() {
      this.$alertMessageBox('这是消息提示对话框', {
        title: '这是标题',
        callback: () => {
          alert('你点了确定');
        },
      });
    },
    promt() {
      this.$promptMessageBox('这是消息提示对话框', {
        title: '这是标题',
        successCb: (val) => {
          alert(val || '你的输入为空');
        },
        cancelCb: () => {
          alert('你点了取消');
        },
      });
    },
    successNotify(position) {
      this.$successNotify('这是一条成功通知', { position });
    },
    warningNotify() {
      this.$warningNotify('这是一条警告通知');
    },
    errorNotify() {
      this.$errorNotify('这是一条错误通知');
    },
    infoNotify() {
      this.$infoNotify('这是一条信息通知');
    },
    loading() {
      this.$loading({ text: 'loading的文案', target: '.loading-area' });
    },
    closeLoading() {
      this.$closeLoading();
    },
    openPage() {
      // console.log(this);

      this.$openWindow('/test-page/yc-echart-demo');
    },
    openNewPage() {},
  },
};
