<template>
  <div class="login">
    <div class="login-form" v-if="isDevModes" @keyup.enter="login">
      <div class="title">后台管理系统</div>
      <div class="input-group">
        <el-input :autofocus="true" placeholder="请输入用户名" v-model="loginForm.telephone"> </el-input>
      </div>
      <div class="input-group">
        <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"> </el-input>
      </div>
      <div class="input-group">
        <el-button @click.native="formLogin" type="primary">登录</el-button>
      </div>
    </div>
    <div v-else>
      登录中请稍后...
    </div>
  </div>
</template>

<script>
import { isDevMode } from '@/utils';
import * as Apis from './api';
/**
 * 开发环境使用账号密码登录获取用户信息、线上直接使用地址栏携带的token换取用户信息
 * 注意：不同的系统登录使用的接口可能会不一致，需要确认
 */
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        telephone: '12000002020',
        password: '123456',
        userType: 17 // 视讯通类型
      },
      isDevModes: isDevMode() // 判断本地和线上环境
    };
  },
  created() {
    if (!this.isDevModes) {
      // 线上环境
      let { token } = this.$route.query;
      if (!token) {
        this.$message.error('缺少token无法跳转！');
        return;
      }
      // 存token
      this.$store.commit('SET_VALUE_BY_KEY', { key: 'token', value: token });
      // 使用token获取用户信息
      this.tokenGetUser(token);
    }
  },
  methods: {
    formLogin() {
      // 密码账号登录
      this.getUserInfo();
    },
    async getUserInfo() {
      // 获取用户信息
      let { success, data } = await Apis.login(this.loginForm);
      if (success) {
        // 存token
        this.$store.commit('SET_VALUE_BY_KEY', { key: 'token', value: data.access_token });
        this.storeUser(data.user);
      }
    },
    async tokenGetUser(_token) {
      // toekn换取用户信息
      let { success, data } = await Apis.loginAuto({ token: _token });
      if (success) {
        // 存用户信息
        this.storeUser(data.user);
      }
    },
    async storeUser(_data) {
      // 存用户信息
      // 视讯通用户
      if (this.loginForm.userType == 17) {
        // 获取企业信息
        let rep = await Apis.personCompanyList();
        if (rep.success) {
          if (rep.data[0]) {
            _data.companyInfo = rep.data[0]; // 取第一个企业
          }
        }
      }
      this.$store.commit('SET_VALUE_BY_KEY', {
        key: 'userInfo',
        value: _data
      });
      // 跳转到主页
      this.$router.push({ path: '/app/home' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
