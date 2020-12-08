// 登录、注册、认证模块
import http from './http'

export default {loginByPassword, registerBySms}

// 通过密码登录
function loginByPassword (data) {
  return http.post('/login/password', data)
}

// 短信注册
function registerBySms (data) {
  return http.post('/register/sms', data)
}