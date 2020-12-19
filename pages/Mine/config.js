const getImage = (path) => require(`@/static/mine/${path}`)

export const grid = [
  ['', getImage('order.png'), '我的订单'],
  ['', getImage('favorite.png'), '我的收藏'],
  ['', getImage('message.png'), '我的消息']
]

export const list = [
  ['', getImage('my-wrong.png'), '错题库'],
  ['', getImage('my-class.png'), '我的课程'],
  ['', getImage('my-invitation.png'), '我的邀请'],
  ['', getImage('my-integral.png'), '我的积分']
]