<template>
  <div>
    <el-button type="primary" @click="onPreviewVideo">点击预览视频</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    onPreviewVideo() {
      this.$previewVideo({
        url: 'xxxx',
      });
    },
  },
};
</script>

<style lang="scss"></style>
