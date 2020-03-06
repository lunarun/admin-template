<template>
  <div class="login-page">
    <div class="bg-color login-bg">
      <div class="login-container">
        <p class="title">管理后台</p>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
          label-width="0px"
          class="login-form"
        >
          <div class="pt10">
            <div class="text-center">
              <p class="mt0 login-title" v-if="accountType === 'self'">
                帐号密码登录
              </p>
              <p class="mt0 login-title" v-else>内部员工帐号密码登录</p>
            </div>
            <el-form-item prop="account">
              <el-input
                type="text"
                v-model="loginForm.account"
                auto-complete="off"
                :placeholder="transAccountPlaceholderText[accountType]"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="transPasswordPlaceholderText[accountType]"
                @keyup.native.enter="onLogin"
              ></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click.prevent="onLogin"
                :loading="logining"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item style="width:100%;">
              <div class="flex flex-justify-between">
                <el-checkbox v-model="loginForm.remberPassword" class="remenber"
                  >记住帐号</el-checkbox
                >
                <el-button
                  v-if="accountType === 'ldap'"
                  class="login-error-text"
                  type="text"
                  @click="onForgetPassword"
                  >忘记密码</el-button
                >
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div class="flex flex-justify-between other-login">
          <div>
            <el-button
              v-if="accountType !== 'self'"
              type="text"
              @click="onChangeLoginWay('account')"
              >帐号密码登录</el-button
            >
            <el-button
              v-if="accountType !== 'ldap'"
              type="text"
              @click="onChangeLoginWay('ldap')"
              >内部员工登录</el-button
            >
          </div>
        </div>
      </div>
      <footer class="ui-footer">
        <p>广州市有车以后信息科技有限公司</p>
        <p class="ui-copyright">
          Copyright © IYOURCAR All rights reserved
          广州市有车以后信息科技有限公司
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import { aGetMeInfo } from 'src/net/commonApi';
import session from 'src/session';
import { login } from 'src/utils/uniteLoginJump';

const transAccountPlaceholderText = {
  self: '帐号',
  ldap: '内部员工帐号',
};
const transPasswordPlaceholderText = {
  self: '密码',
  ldap: '内部员工密码',
};
export default {
  name: 'Login',
  data() {
    return {
      transAccountPlaceholderText,
      transPasswordPlaceholderText,
      logining: false,
      loginForm: {
        account: '',
        password: '',
        remberPassword: true,
      },
      accountType: 'self',
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '帐号不能为空' }],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
        ],
      },
    };
  },
  mounted() {
    login(_dealAfterLogin.bind(this));
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return;
        this.logining = true;
        const { loginForm } = this;
        const { account, password } = loginForm;
        const params = {
          username: account,
          password,
          login_type: this.accountType === 'self' ? 1 : 2,
        };
        this.$post('login', params)
          .then((loginRes) => {
            _dealAfterLogin.bind(this)(loginRes.result);
          })
          .finally(() => {
            this.logining = false;
          });
      });
    },
    /**
     * 切换登录方式
     */
    onChangeLoginWay(way) {
      switch (way) {
        case 'account':
          this.logining = false;
          this.accountType = 'self';
          break;
        case 'ldap':
          this.logining = false;
          this.accountType = 'ldap';
          break;
        default:
          break;
      }
    },

    /**
     * 忘记密码
     */
    onForgetPassword() {
      window.open('https://ldap.suv163.com/get_pass.php');
    },
  },
};

function _dealAfterLogin(info) {
  const { sid, token } = info;
  this.$session.setSession({ sid, token });

  aGetMeInfo().then((res) => {
    const { result } = res;
    const userInfo = result;
    this.$session.setInfo(userInfo);

    // const idAndPsw = {
    //   user_name: loginForm.account,
    //   id: result.id,
    //   psw: this.loginForm.remberPassword ? loginForm.password : '',
    //   is_record_pwd: loginForm.remberPassword,
    // };

    this.$router.push({ path: '/' });
  });
}
</script>

<style lang="scss">
.login-page {
  .login-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: scroll;
  }

  .login-container {
    background: #ffffff;
    border: 1px solid #eaeaea;
    width: 420px;
    margin: 180px auto;
    padding: 30px 60px;
    .title {
      font-size: 36px;
      color: #383838;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
    }
    .login-form {
      height: 230px;
    }

    .login-title {
      font-size: 14px;
      color: #383838;
    }

    .other-login {
      margin-top: 10px;
      width: 300px;
      height: 50px;
      background: rgba(255, 255, 255, 0);
      box-shadow: inset 0 1px 0 0 #f2f2f2;
      > p {
        font-size: 12px;
        color: #616161;
        letter-spacing: 0;
        line-height: 18px;
      }
    }
    .remenber {
      .el-checkbox__label {
        font-size: 12px;
        color: #616161;
        letter-spacing: 0;
      }
    }
    .login-error-text {
      font-size: 12px;
      color: #8f8f8f;
      letter-spacing: 0;
      float: right;
    }
  }

  .ui-footer {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #99a9bf;
    .ui-copyright {
      font-size: 12px;
      color: #c0ccda;
      margin-top: 14px;
    }
  }
}
</style>
