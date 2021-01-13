const courseList = [
  { id: 1, title: '读', url: '/pages/Course/Course' },
  { id: 2, title: '写', url: '/pages/Course/Course' }
]

export default function (id, title) {
  const c = courseList.find(
    item => item.id == id || new RegExp(title, 'g').test(item.title)
  )
  return c ? c.url : '/'
}