// 用户模块
import http from './http'

export default {
  getMemberDetail,
  getMemberCourses,
  getMemberLikeCourses,
  getMemberScore,
  getMemberMsgList,
	msgRead,
	msgAllRead,
  getMemberOrders,
  inviteUsers,
  promoCode
  // getMemberMistake
}

// 获取用户信息
function getMemberDetail () {
  return http.get('/member/detail')
}

// 获取用户课程
function getMemberCourses (parmas) {
  return http.get('/member/courses', parmas)
}

// 获取用户收藏课程
function getMemberLikeCourses (parmas) {
  return http.get('/member/courses/like', parmas)
}

// 获取用户错题收藏
// function getMemberMistake (parmas) {
//   return http.get('/member/courses/xxx', parmas)
// }

// 获取用户积分信息
function getMemberScore () {
  return http.get('/member/credit1Records')
}
// 获取用户订单信息
function getMemberOrders (parmas) {
  return http.get('/member/orders', parmas)
}
// *****用户信息中心*******
// 获取用户未读消息数量
function getMemberMsgList () {
  return http.get('/member/messages')
}

// 消息标记已读
function msgRead (notificationId) {
  return http.get(`/member/notificationMarkAsRead/${notificationId}`)
}

// 消息全部标记已读
function msgAllRead () {
  return http.get('/member/notificationMarkAllAsRead')
}

// 我的邀请用户
function inviteUsers () {
  return http.get('/member/inviteUsers', {
    page: 1,
    page_size: 100
  })
}

// 生成邀请码
function promoCode () {
  return http.get('/member/promoCode')
}