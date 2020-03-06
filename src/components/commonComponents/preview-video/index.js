// import {
//   mapGetters,
//   mapMutations
// } from 'vuex';
import Vue from 'vue';

export default {
  name: 'previewVideo',
  data() {
    return {
      visible: false,
      url: '',
    };
  },
  methods: {
    operate(params) {
      if (params && !params.url) {
        this.$errorMessage('缺少视频地址');
      } else {
        const url = params ? params.url : '';
        const data = {
          visible: !!params,
          url,
        };
        this.updatePreviewVideo(data);
      }
    },

    updatePreviewVideo(data) {
      const { visible, url } = data;
      this.visible = visible;
      this.url = url;
    },
  },
};
