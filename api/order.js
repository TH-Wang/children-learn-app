import http from './http'

export default {
  createCourseOrder,
  createRoleOrder,
  createVideoOrder,
  getPayments,
  payRedirect,
  promoCodeCheck
}

// 创建课程订单
function createCourseOrder (data) {
  return http.post('/order/course', data)
}

// 创建会员订单
function createRoleOrder (data) {
  return http.post('/order/role', data)
}

// 创建视频订单
function createVideoOrder (data) {
  return http.post('/order/video', data)
}

// 获取支付网关
function getPayments (scene) {
  return http.get('/order/payments?scene=' + scene)
}

// 跳转支付
function payRedirect () {
  return http.get('/order/pay/redirect', {
    payment_scene: 'h5',
    payment: 'alipay',
    order_id: '216064983'
  })
}

// 检测优惠码
function promoCodeCheck (code) {
  return http.get(`/promoCode/${code}/check`)
}