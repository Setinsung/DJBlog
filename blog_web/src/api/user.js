import service from '../utils/request'

//登录
export async function login (data) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}
//登出
export async function logout () {
  return service({
    url: '/user/logout',
    method: 'post',
  })
}