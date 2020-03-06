<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item v-if="item.meta.title || item.name" :key="index">
          <span
            v-if="
              item.redirect === 'noredirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title || item.name }}</span
          >
          <router-link v-else :to="item.redirect || item.path">{{
            item.meta.title || item.name
          }}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp';

export default {
  name: 'breadCrumb',
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const { params } = this.$route;
      const matched = this.$route.matched.filter((item) => {
        if (item.name || item.meta.title) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          const toPath = pathToRegexp.compile(item.path);
          item.path = toPath(params);
          return item;
        }
        return item;
      });
      // const first = matched[0];
      // first.name = first.name || '';
      // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      //     matched = [{ path: '/dashboard', name: '仪器表', meta: { title: '仪器表' } }].concat(matched);
      // }
      this.levelList = matched;
      // console.log(this.levelList);
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
