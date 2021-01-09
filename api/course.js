// 课程模块
import http from './http'

export default {
  getCourseCategories,
  getCoursesList,
  getCourseDetail
}

// 课程分类
function getCourseCategories () {
  return http.get('/course_categories')
}

// 课程列表
function getCoursesList (params) {
  return http.get('/courses', params)
}

// 课程信息，课程章节列表，课程视频列表
function getCourseDetail (id) {
  return http.get(`/course/${id}`)
}