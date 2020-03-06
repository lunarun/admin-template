<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-10-24 10:57:00
 * @LastEditTime: 2019-09-05 14:04:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="app-main">
    <div class="app-main-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style lang="scss">
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
  background: #fafafa;
  box-sizing: border-box;
  display: flex;
  .app-main-content {
    background: #fff;
    padding: 10px;
    flex: 1;
    overflow: hidden;
    // width: 100%;
    // min-height: 100%;
    // position: absolute;
  }
}
</style>
