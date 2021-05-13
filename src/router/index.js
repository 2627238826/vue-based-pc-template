import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/views/Main';
import Login from '@/views/Login';
import Home from '@/views/Home';

Vue.use(Router);

// 业务路由(动态添加,后期可以通过获取用户权限控制路由)
// meta.mainMenu字段作为判断是否是一级菜单的标识
// meta.subMenu字段作为判断是否是二级菜单的标识

export const constantRouterMap = [
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/app',
        name: 'app',
        component: Main,
        redirect: '/app/home',
        meta: {
          icon: 'el-icon-setting',
          title: '首页'
        },
        children: [
          {
            path: 'home',
            name: 'home',
            component: Home,
            meta: {
              icon: 'align-justify',
              title: '主页',
              mainMenu: true
            }
          }
        ]
      }
    ]
  }
];

const router = new Router({
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
  // 统一路由拦截处
  next();
});

export default router;
