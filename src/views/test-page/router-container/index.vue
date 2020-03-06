<template>
  <div>
    <span>路由页容器 & 富文本</span>
    <u-editor
      ref="editor-content"
      @editor-input="onInputContent"
      :isImageSetting="true"
      upload-video-type="cyfl_bonus_event_video"
    ></u-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onInputContent(txt) {
      console.log(txt);
    },
  },
};
</script>

<style lang="scss"></style>
