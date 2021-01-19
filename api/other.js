import http from './http'

export default {
  getSliderList
}

// 首页banner
function getSliderList () {
  return http.get('/sliders')
}
