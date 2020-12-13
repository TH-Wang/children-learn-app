// 登录、注册、认证模块
import http from './http'

export default {
  loginByPassword,
  loginByMobile,
  registerBySms,
  captchaImage,
  captchaSms
}

// 通过密码登录
function loginByPassword (data) {
  return http.post('/login/password', data)
}

// 通过手机验证码登录
function loginByMobile (data) {
  return http.post('/login/mobile', data)
}

// 短信注册
function registerBySms (data) {
  return http.post('/register/sms', data)
}

// 获取图形验证码
function captchaImage () {
  return http.post('/captcha/image')
}

// 获取短信验证码
function captchaSms (data) {
  return http.post('/captcha/sms', data)
}