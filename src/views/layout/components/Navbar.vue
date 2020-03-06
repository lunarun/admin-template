<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-11-04 15:00:20
 * @LastEditTime: 2019-09-05 15:39:53
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.header-navbar {
  height: $pageHeaderHeight;
  line-height: $pageHeaderHeight;
  border-radius: 0px !important;
  box-shadow: 0 2px 6px 0 rgba(217, 217, 217, 0.1);
  .hamburger-container {
    line-height: $pageHeaderHeight;
    height: $pageHeaderHeight;
    width: $pageHeaderHeight;
    float: left;
    text-align: center;
  }
  .header-sys-name {
    float: left;
    position: relative;
    padding-left: 16px;
    font-size: 16px;
    color: #383838;
    &::before {
      content: ' ';
      width: 1px;
      height: 16px;
      background: #e9e9e9;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="header-navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="header-sys-name">管理后台</div>
    <!-- <bread-crumb class="breadcrumb-container"/> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <i>{{ userName }}</i>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;color: #F56C6C" @click="logout"
              >退出</span
            >
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;color: #000" @click="resetPwd"
              >修改密码</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { logout } from 'src/utils/uniteLoginJump';
import net from 'src/net';

export default {
  data() {
    const info = this.$session.getInfo();
    return {
      avatar: '',
      isOfBusiness: info.of_business,
      userName: info.username,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    ...mapGetters(['sidebar', 'name', 'device']),
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    /**
     * 修改密码
     */
    resetPwd() {
      if (this.isOfBusiness) {
        this.$router.push('/change-password');
      } else {
        this.$alert(
          '内部员工帐号不支持直接修改密码，请访问“https://ldap.suv163.com/get_pass.php”修改',
          '提示'
        );
      }
    },
    async logout() {
      this.$confirm('您确定要退出登录吗？', '提示').then(() => {
        this.$post('logout', {}).then((res) => {
          logout(res.result);
        });
      });
    },
  },
};
</script>
