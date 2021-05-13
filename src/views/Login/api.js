// 接口
import http from '@/services/http';

// 密码账号登录
export function login(data) {
  return http({
    url: 'health/user/login',
    method: 'post',
    data,
    params: data
  });
}
// token获取用户信息
export function loginAuto(data) {
  return http({
    url: `health/user/login/auto?access_token=${data.token}&serial=web`,
    method: 'get',
    data,
    params: data
  });
}
// 获取企业信息
export function personCompanyList(data) {
  return http({
    url: 'sxt-facade/company/personCompanyList',
    method: 'get',
    data,
    params: data
  });
}
