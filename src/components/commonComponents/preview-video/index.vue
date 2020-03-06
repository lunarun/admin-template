<template>
  <transition name="fade">
    <div v-if="visible" class="preview-video">
      <div class="preview-video__container">
        <div class="preview-video__close">
          <i
            class="preview-video__icon el-icon-close"
            @click.stop="$previewVideo()"
          />
        </div>
        <video :src="url" width="620" height="348" controls />
      </div>
    </div>
  </transition>
</template>

<script src="./index.js"></script>
<style lang="scss">
@import './index.scss';
</style>
