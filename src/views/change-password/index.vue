<style lang="scss">
.change-password {
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
.change-password .el-form {
  width: 600px;
}
.change-password .last-item {
  padding-top: 40px;
}
</style>
<template>
  <section class="change-password">
    <el-form
      :model="formList"
      :rules="rules"
      ref="passwdForm"
      label-width="100px"
    >
      <el-form-item label="原始密码" prop="originPass">
        <el-input
          type="password"
          v-model="formList.originPass"
          autocomplete="off"
          placeholder="请输入原始密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="formList.newPass"
          autocomplete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="repeatPass">
        <el-input
          type="password"
          v-model="formList.repeatPass"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="last-item">
        <el-button type="primary" @click="submitForm('passwdForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import net from 'src/net';
import auth from '@iyourcar-admin/acl';

export default {
  data() {
    return {
      formList: {
        originPass: '',
        repeatPass: '',
        newPass: '',
      },
      rules: {
        originPass: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入原密码'));
                return;
              }
              callback();
            },
            trigger: 'blur',
          },
        ],
        newPass: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入新密码'));
                return;
              }
              if (value.length < 8 || !/[a-zA-Z0-9]{1,}/.test(value)) {
                callback(
                  new Error(
                    '最小8个长度；至少1个大写字符；至少1个小写字母；至少一位数字'
                  )
                );
                return;
              }
              callback();
            },
            trigger: 'blur',
          },
        ],
        repeatPass: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.formList.newPass) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    ...mapGetters({
      getUserInfo: 'getUserInfo',
      getUserIdAndPsw: 'getUserIdAndPsw',
    }),
    ...mapMutations(['userLogout', 'setUserIdAndPsw']),
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.updataPassword();
        }
      });
    },
    /**
     * require - 修改密码
     */
    updataPassword() {
      const params = {
        ori_pwd: this.formList.originPass,
        new_pwd: this.formList.newPass,
        repeat_new_user_passwd: this.formList.repeatPass,
        id: this.getUserInfo.id,
      };
      this.$post('me/pwd/update', params).then(() => {
        this.$alert('修改成功，需要重新登录。', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning',
          callback: () => {
            this.$refs.passwdForm.resetFields();
            this.userLogout();
            const idAndPsw = this.getUserIdAndPsw();
            idAndPsw.pwd = this.formList.checkPass;
            idAndPsw.is_record_pwd = false;
            this.setUserIdAndPsw(idAndPsw);
            this.$router.push('/login');
            auth.getInstance().setPermission([]);
          },
        });
      });
    },
  },
};
</script>
