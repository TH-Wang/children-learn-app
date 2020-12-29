import Vue from 'vue'
import App from './App'
import store from './store'
import Toast from './wxcomponents/vant/toast/toast'
import asyncUni from './utils/asyncUni'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$toast = Toast
Vue.prototype.$uni = asyncUni
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
