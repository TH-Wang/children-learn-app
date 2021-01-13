import http from './http'

export default {
  getVideoDetail,
  getVideoResource
}

// 获取视频详细信息
function getVideoDetail (id) {
  return http.get(`/video/${id}`)
}

// 获取视频播放地址
function getVideoResource (id) {
  return http.get(`/video/${id}/playinfo`)
}