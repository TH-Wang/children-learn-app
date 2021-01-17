const token = localStorage.getItem('token')

export default {
  state: {
    token: token || ''
  },

  mutations: {
    setToken (state, data) {
      state.token = data
      localStorage.setItem('token', data)
    }
  },
 getters: {
		token: (state,data) => {
			return data
		}
	}
}