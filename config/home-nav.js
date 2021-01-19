const imgFile = (url) => require(`@/static/index/${url}`)

const config = [
  [ '/pages/listen/listen', imgFile('listen.png'), '听', '听名师示范' ],
  [ '/pages/SpeakDetail/SpeakDetail', imgFile('speak.png'), '说', '标准普通话' ],
  [ '/pages/Course/Course?id=1&type=read', imgFile('read.png'), '读', '世界名著' ],
  [ '/pages/Course/Course?id=2&type=write', imgFile('write.png'), '写', '文章意境' ]
]

export default config