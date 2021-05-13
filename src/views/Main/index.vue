<template>
  <el-container>
    <el-aside v-if="!isIframe" width="180px">
      <h1 class="logo">XX系统</h1>
      <AppMenu :routes="routes[0].children[1].children" />
    </el-aside>
    <el-container>
      <el-header v-if="!isIframe" height="50px">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(crumb, index) in crumbs" :key="index">
              <router-link v-if="crumb.path" :to="crumb.path">
                {{ crumb.title }}
              </router-link>
              <span v-else>{{ crumb.title }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="avatar" :src="userInfo" />
            用户名
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <!-- <router-link tag="div" to="/login">退出登录</router-link> -->
              <div @click="loginOut">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main :class="{ 'el-main-iframe': isIframe }">
        <div class="main-content" id="mainIframe">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMenu from './Menu';
import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  components: {
    AppMenu
  },
  data() {
    return {
      crumbs: [],
      isIframe: false // 工程以iframe引入时可以去除头部和导航栏（false不去除，true去除）
    };
  },
  watch: {
    $route() {
      // console.log(this.routes)
      this.getBreadcrumb();
    }
  },
  computed: {
    ...mapGetters(['routes', 'token', 'userInfo'])
  },
  created() {
    const { isIframe = false } = this.$route.query;
    this.isIframe = JSON.parse(isIframe) === true ? true : false;
  },
  mounted() {
    this.getBreadcrumb();
    // window.addEventListener('popstate', this.routeChange, false);
  },
  methods: {
    loginOut() {
      // 退出
      this.$router.push('/login');
    },
    getBreadcrumb() {
      // 生成面包屑
      const curPath = this.$route.path;
      this.crumbs = [];
      if (curPath !== '/healthCase/user') {
        this.$route.matched.forEach(item => {
          const title = item.meta.title;
          if (title) {
            this.crumbs.push({ title: title });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.el-container {
  .el-header,
  .el-aside,
  .el-main {
    position: fixed;
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 180px;
    right: 0;
    line-height: 50px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 #ddd, 0 0 3px 0 #ddd;
    background-color: #fff;

    .breadcrumb {
      display: flex;
      align-items: center;

      .toggle {
        width: 20px;
        height: 20px;
        background-image: url(./images/menu.svg);
        margin-right: 12px;
        cursor: pointer;
        color: #505050;
      }
    }

    .el-dropdown {
      cursor: pointer;

      .avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
  }

  .el-aside {
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    color: #bfcbd9;
    background-color: #304156;

    .logo {
      padding-left: 20px;
      font-size: 20px;
      color: #e5eaf0;
    }

    a {
      text-decoration-line: none;
    }

    .el-menu {
      border-right: none;

      .el-submenu .el-menu-item {
        padding-left: 53px !important;
        min-width: 180px;

        .el-submenu__title {
          i {
            color: #bfcbd9;
          }

          &.is-active i {
            color: #409eff;
          }
        }
      }
    }
  }

  .el-main {
    top: 50px;
    right: 0;
    bottom: 0;
    left: 180px;
    overflow-y: auto;
  }

  .el-main-iframe {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
  }
}
</style>
