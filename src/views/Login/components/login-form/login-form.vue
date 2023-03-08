<template>
  <Form ref="loginForm" :model="formData" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="formData.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model="formData.password" type="password" password placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
        <!-- <Icon slot="append" :size="14" type="md-lock"></Icon> -->
      </Input>
    </FormItem>
    <Row align="middle" style="margin-bottom: 10px">
      <Col span="12">
        <Checkbox v-model="formData.rememberMe">记住我</Checkbox>
      </Col>
      <Col span="12" style="text-align: right">
        <a href="http://">忘记密码？</a>
      </Col>
    </Row>
    <FormItem>
      <Button type="primary" long :loading="loading" @click="handleSubmit">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
const basicForm = Object.freeze({
  userName: '',
  password: '',
  grantType: 'password',
  phone: '',
  code: '',
  rememberMe: false,
});
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }];
      },
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }];
      },
    },
    formSet: {
      type: Object,
      default: () => ({
        ...basicForm,
      }),
    },
  },
  data() {
    return {
      loading: false,
      formData: {
        ...basicForm,
        ...this.formSet,
      },
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
      };
    },
    formParams() {
      return this.formData;
    },
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.loginForm.validate();
      if (valid) {
        this.$emit(
          'on-success-valid',
          (isLoad) => {
            this.loading = isLoad;
          },
          { ...this.formData },
        );
      }
    },
  },
};
</script>
