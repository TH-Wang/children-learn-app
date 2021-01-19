import http from './http'

export default {
  getVideoDetail,
  getVideoResource,
  videoRecord
}

// 获取视频详细信息
function getVideoDetail (id) {
  return http.get(`/video/${id}`)
}

// 获取视频播放地址
function getVideoResource (id) {
  return http.get(`/video/${id}/playinfo`)
}

// 上传视频观看时长
function videoRecord (id, duration) {
  return http.post(`/video/${id}/record`, { duration })
}