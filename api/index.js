// 统一分发接口
import auth from './auth'
import user from './user'
import course from './course'
import video from './video'
import other from './other'
import role from './role'

export default {
  ...auth,
  ...user,
  ...course,
  ...video,
  ...other,
  ...role
}