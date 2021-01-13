// 用户模块
import http from './http'

export default {
  getMemberDetail,
  getMemberCourses
}

// 获取用户信息
function getMemberDetail () {
  return http.get('/member/detail')
}

// 获取用户课程
function getMemberCourses (parmas) {
  return http.get('/member/courses', parmas)
}