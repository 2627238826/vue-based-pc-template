import { setSessionStorage, getSessionStorage, removeSessionStorage } from '@/utils';
import { constantRouterMap } from '@/router/index';
let routesList = JSON.parse(JSON.stringify(constantRouterMap));
// 根store（注意本地数据存在sessionStorage）
export default {
  namespaced: false,
  state: {
    routes: routesList,
    token: getSessionStorage('token'),
    userInfo: getSessionStorage('userInfo')
  },
  getters: {
    routes: state => state.routes,
    token: state => state.token,
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_VALUE_BY_KEY(state, { key, value }) {
      state[key] = value;
      setSessionStorage(key, value);
    },
    REMOVE_STATE_BY_KEY(state, { key, value }) {
      state[key] = '';
      removeSessionStorage(key);
    }
  },
  actions: {
    logout({ commit, state }) {
      commit('REMOVE_STATE_BY_KEY', { key: 'token' });
      window.location.href = window.location.href.split('#/')[0];
    }
  }
};
