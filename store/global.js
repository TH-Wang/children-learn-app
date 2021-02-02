const category = uni.getStorageSync('category') || null

export default {
  state: {
    userInfo: {},
    category: category,
    categories: [],
    courseList: [],
    rolesList: []
  },

  mutations: {
    setGlobalData (state, obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          state[key] = obj[key]
        }
      }
    },
    setLocalStorage (state, obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (!obj[key]) {
            console.warn(`setLocalStorage value is empty "${key}"`)
            continue
          }
          state[key] = obj[key]
          uni.setStorageSync(key, obj[key])
        }
      }
    },
    clearLocalStorage (state, type) {
      state[type] = null
      uni.removeStorageSync(type)
    }
  },

  getters: {
    courseId: (state) => (type) => {
      const course = {
        read: { id: 1, like: '读' },
        write: { id: 2, like: '写' }
      }
      const el = course[type]
      const result = state.categories.find(
        i => i.id === el.id || new RegExp(el.like, 'g').test(i.title)
      )
      return result ? result.id : null
    },
    // 是否是vip
    isVip (state) {
      if (!state.userInfo) return false
      if (!state.userInfo.role) return false
      return true
    },
    // vip身份
    vipType (state) {
      if (!state.userInfo) return '普通用户'
      const role = state.rolesList.find(i => i.id === state.userInfo.role_id)
      return role ? role.name : '普通用户'
    }
  }
}