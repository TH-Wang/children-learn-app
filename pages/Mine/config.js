const getImage = (path) => require(`@/static/mine/${path}`)

export const grid = [
  ['', getImage('order.png'), '我的订单'],
  ['/pages/MyCollect/MyCollect', getImage('favorite.png'), '我的收藏'],
  ['/pages/MsgCenter/MsgCenter', getImage('message.png'), '消息中心']
]

export const list = [
  ['/pages/Mistakes/Mistakes', getImage('my-wrong.png'), '错题库'],
  ['/pages/Myclass/Myclass', getImage('my-class.png'), '我的课程'],
  ['/pages/MyInvite/MyInvite', getImage('my-invitation.png'), '我的邀请'],
  ['/pages/MyIntegral/MyIntegral', getImage('my-integral.png'), '我的积分']
]