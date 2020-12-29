// 用户模块
import http from './http'

export default {
  getMemberDetail
}

// 获取用户信息
function getMemberDetail () {
  return http.get('/member/detail')
}