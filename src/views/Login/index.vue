<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎您" :bordered="false">
        <div class="form-con">
          <login-form :form-set="formData" @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">请输入您的用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import LoginForm from './components/login-form';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      formData: {
        userName: 'admin',
        password: '123456',
      },
    };
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    async handleSubmit(callback, formData) {
      try {
        callback(true);
        const { userName: username, password, rememberMe, grantType, phone, code } = formData;
        if (rememberMe) {
          Cookies.set('username', username, { expires: 30 });
          Cookies.set('password', encrypt(password), {
            expires: 30,
          });
          Cookies.set('rememberMe', rememberMe, {
            expires: 30,
          });
        } else {
          Cookies.remove('username');
          Cookies.remove('password');
          Cookies.remove('rememberMe');
        }

        const { error } = await this.handleLogin({
          username,
          password,
          grantType,
          phone,
          code,
          appCode: this.$config.appCode,
          clientId: this.$config.clientId,
          clientSecret: this.$config.clientSecret,
        });
        if (error) return callback(false);
        this.$router.replace({
          name: this.$store.getters.dynamicHomePage || this.$config.homeName,
        });
      } catch (error) {
        callback(false);
        console.error(error);
      }
    },
    // async routeToHome(callback) {
    //   try {
    //     const { error } = await this.getUserInfo();
    //     callback(false);
    //     if (!error) {
    //       this.$router.push({
    //         name: this.$config.homeName,
    //       });
    //     }
    //   } catch (error) {
    //     callback(false);
    //     console.error(error);
    //   }
    // },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const rememberMe = Cookies.get('rememberMe');
      this.formData = {
        userName: username ? this.formData.username : username,
        password: password ? this.formData.password : decrypt(password),
        rememberMe: rememberMe ? false : Boolean(rememberMe),
      };
    },
  },
};
</script>

<style lang="less">
@import url('./login.less');
</style>

<style></style>
