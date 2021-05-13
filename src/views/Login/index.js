const login = r => require.ensure([], () => r(require('./login.vue')), 'login');

export default login;
