import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: 'Children Learn App'
	},
	
	mutations: {},
	
	actions: {},
	
	modules: {
    auth
  }
})