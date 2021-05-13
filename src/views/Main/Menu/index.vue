<template>
  <el-menu
    :default-active="heighLigntMenu"
    class="el-menu"
    background-color="#304156"
    text-color="#BFCBD9"
    active-text-color="#409EFF"
    @select="handleSelect"
    :unique-opened="true"
  >
    <template v-for="item in routes">
      <!-- 外链地址 -->
      <a v-if="item.meta.url" @click="outLinkParams(item.meta.url)" target="_blank" :key="item.name">
        <el-menu-item :index="item.name">
          <icon :name="item.meta.icon || defaultIcon"></icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </a>

      <!-- 一级菜单 -->
      <router-link v-else-if="showMainRoute(item)" :to="{ name: item.name }" :key="item.name">
        <el-menu-item :index="`/app/${item.path}`" v-if="item.meta.title">
          <icon :name="item.meta.icon || defaultIcon"></icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>

      <!-- 二级菜单 -->
      <el-submenu v-else :index="item.path" :key="item.name">
        <template slot="title">
          <icon :name="item.meta.icon || defaultIcon"></icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <!-- 二级外链地址 -->
          <a v-if="child.meta.url" @click="outLinkParams(child.meta.url)" target="_blank" :key="child.name">
            <el-menu-item :index="child.name">
              {{ child.meta.title }}
            </el-menu-item>
          </a>
          <router-link :to="{ name: child.name }" :key="child.name" v-if="showChildMenu(child)">
            <el-menu-item :index="child.name">
              {{ child.meta.title }}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      defaultIcon: 'list',
      heighLigntMenu: '/'
    };
  },
  created() {
    let route = this.$route.path.split('/');
    this.heighLigntMenu = `/${route[1]}/${route[2]}`;
  },
  methods: {
    // 判断二级菜单
    showChildMenu(child) {
      return child.meta && child.meta.title && child.meta.subMenu;
    },
    // 判断一级菜单
    showMainRoute(route) {
      return route.meta.mainMenu;
    },
    handleSelect(item) {
      this.heighLigntMenu = item;
      // console.log(item)
    },
    outLinkParams(_url) {
      // 统一处理外链参数
      window.open(_url);
    }
  }
};
</script>
