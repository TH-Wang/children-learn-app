import http from './http'

export default {
  getRolesList
}

// 获取会员列表
function getRolesList () {
  return http.get('/roles')
}