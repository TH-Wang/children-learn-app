const imgFile = (url) => require(`@/static/index/${url}`)

const config = [
  [ '/pages/SpecialCourse/SpecialCourse?keyword=听', imgFile('listen.png'), '听', '听名师示范' ],
  [ '/pages/SpecialCourse/SpecialCourse?keyword=说', imgFile('speak.png'), '说', '标准普通话' ],
  [ '/pages/SpecialCourse/SpecialCourse?keyword=读', imgFile('read.png'), '读', '世界名著' ],
  [ '/pages/SpecialCourse/SpecialCourse?keyword=写', imgFile('write.png'), '写', '文章意境' ]
]

export default config