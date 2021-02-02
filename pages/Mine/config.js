const getImage = (path) => require(`@/static/mine/${path}`)

export const grid = [
  ['/pages/Myorder/Myorder', getImage('order.png'), '我的订单'],
  ['/pages/MyCollect/MyCollect', getImage('favorite.png'), '我的收藏'],
  ['/pages/MsgCenter/MsgCenter', getImage('message.png'), '消息中心']
]

export const list = [
  ['', getImage('my-wrong.png'), '错题库'],
  ['/pages/Myclass/Myclass', getImage('my-class.png'), '我的课程'],
  ['', getImage('my-class.png'), '个人资料'],
  ['/pages/MyIntegral/MyIntegral', getImage('my-integral.png'), '我的积分'],
  ['/pages/MyInvite/MyInvite', getImage('my-invitation.png'), '我的邀请'],
  ['/pages/MyShare/MyShare', getImage('my-invitation.png'), '我的推广'],
  ['/pages/ExchangeCode/ExchangeCode', getImage('my-invitation.png'), '兑换码']
]