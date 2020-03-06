<!--
 * @Description: 左侧区域
 * @Author: YJ
 * @Date: 2019-05-11 11:55:34
 * @LastEditTime: 2019-09-05 15:18:37
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.left-menu-box {
  .el-scrollbar__view {
    display: flex;
    flex-direction: column;
  }
  .logo-bar {
    height: $pageHeaderHeight;
    border-right: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    overflow: hidden;
    img {
      vertical-align: middle;
    }
    .logo-box {
      height: 100%;
      padding: 20px 24px;
      font-size: 0;
      display: block;
    }
    .logo-img,
    .logo-img-box {
      width: 28px;
      height: 100%;
    }
    .logo-img-text {
      width: 88px;
      height: 100%;
    }
  }
  .menu-item-search {
    padding: 16px 24px;
    border-right: 1px solid #f2f2f2 !important;
    .search-menu-btn {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #e6e6e6;
      font-size: 13px;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        color: #c0c4cc;
        border-color: #c0c4cc;
      }
    }
  }
  .left-menu-list {
    border-right: 1px solid #f2f2f2 !important;
    height: inherit !important;
    flex: 1;
    box-shadow: 2px 0 6px 0 rgba(217, 217, 217, 0.1);
  }
}
</style>
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" class="left-menu-box">
    <div class="logo-bar">
      <a class="logo-box" href="/">
        <img class="logo-img" src="@/assets/images/img_logo_graphic.png" />
        <img class="logo-img-text" src="@/assets/images/img_logo_text.png" />
      </a>
    </div>
    <div class="menu-item-search">
      <!-- :autofocus="searchMenuFocus" -->
      <el-input
        ref="search-menu"
        v-show="!isCollapse"
        v-model="searchMenuKey"
        prefix-icon="el-icon-search"
        placeholder="搜索菜单"
        clearable
      >
      </el-input>
      <span v-show="isCollapse" class="search-menu-btn" @click="onCollapseMenu">
        <i class="el-icon-search"></i>
      </span>
    </div>
    <el-menu
      class="left-menu-list"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      mode="vertical"
      background-color="#fff"
      text-color="#333"
      active-text-color="#0070D2"
    >
      <sidebar-item
        v-for="(route, rIndex) in permission_routers1"
        :key="rIndex + '_' + route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  data() {
    return {
      permission_routers1: this.$router.options.routes,
      searchMenuKey: '',
    };
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    ...mapActions(['toggleSideBar']),
    setMenuCollapse() {
      // console.log(this.isCollapse);
      // this.searchMenuFocus = false;
      // if (this.isCollapse) {
      //   setTimeout(() => {
      //     this.searchMenuFocus = true;
      //   }, 1000);
      // }
      this.toggleSideBar();
    },
    onCollapseMenu() {
      this.setMenuCollapse();
      setTimeout(() => {
        this.$refs['search-menu'].focus();
      }, 200);
    },
  },
};
</script>
