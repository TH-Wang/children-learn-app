const category = localStorage.getItem('category') || null

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
          localStorage.setItem(key, obj[key])
        }
      }
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
    // vip身份
    vipType (state) {
      const role = state.rolesList.find(i => i.id === state.userInfo.role_id)
      return role ? role.name : '普通用户'
    }
  }
}