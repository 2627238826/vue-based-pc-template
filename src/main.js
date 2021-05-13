import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/index.scss';
import 'filters';
import 'directives';
import router from 'router';
import store from 'store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.component('icon', Icon);
Vue.use(ElementUI);

const isDev = process.env.NODE_ENV === 'development';
Vue.config.productionTip = false;
Vue.config.performance = isDev;
window.App = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
