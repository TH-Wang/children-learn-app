// 统一分发接口
import auth from './auth'
import user from './user'

export default {
  ...auth,
  ...user
}