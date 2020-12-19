export const classList = [
  {
    id: 0,
    isVip: true,
    type: 1,
    beginTime: '9:30',
    distanceTime: '3分17秒',
    teacher: '杨超越老师',
    address: '巴黎圣母院',
    timeLength: '50分钟'
  },
  {
    id: 2,
    isVip: false,
    type: 2,
    beginTime: '18:30',
    distanceTime: '3分17秒',
    teacher: '杨超越老师',
    address: '巴黎圣母院',
    timeLength: '50分钟'
  },
  {
    id: 3,
    isVip: false,
    type: 3,
    beginTime: '14:30',
    distanceTime: '3分17秒',
    teacher: '杨超越老师',
    address: '巴黎圣母院',
    timeLength: '50分钟'
  }
]

export const taskList = [
  {
    isNewTask: true,
    taskName: '阅读课外必读书目p34 第三段',
    taskProgress: 50,
    needTime: 20
  },
  {
    isNewTask: true,
    taskName: '阅读课外必读书目p34 第三段',
    taskProgress: 100,
    needTime: 30
  },
  {
    isNewTask: false,
    taskName: '阅读淘气万历15年',
    taskProgress: 0,
    needTime: 20
  },
  {
    isNewTask: false,
    taskName: '完成本周练笔主题：写物：咏物抒情',
    taskProgress: 0,
    needTime: 20
  }
]

export const commonList = [
  {
    isTbx: false,
    className: '我和大树有个约定',
    teacher: '听列表',
  	sumNumber:10,
    finishNumber:0,
  	classTime:"20分32秒",
		img:''
  },
  {
    isTbx: true,
    className: '我和大叔有个约定',
    teacher: '同步学',
    progress:'100%',
    classTime:"15分32秒",
		img:''
  },
]

export const bookList = new Array(10).fill('').map((e, i) => ({id:i,name:'吹牛大王历险记',teacher:'叶老师'}))
