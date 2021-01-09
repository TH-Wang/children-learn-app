const category = localStorage.getItem('category') || null

export default {
  state: {
    category: category,
    categories: [],
    courseList: []
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
    }
  }
}