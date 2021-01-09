// 统一分发接口
import auth from './auth'
import user from './user'
import course from './course'

export default {
  ...auth,
  ...user,
  ...course
}