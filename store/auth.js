const token = uni.getStorageSync('token')

export default {
  state: {
    token: token || ''
  },

  mutations: {
    setToken (state, data) {
      state.token = data
      uni.setStorageSync('token', data)
    }
  },

  getters: {
    isLogin (state) {
      return state.token ? true : false
    },
		token: (state,data) => {
			return data
		}
  }
}