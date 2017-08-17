import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import ComponenteHijo from './ComponentHijo.vue'

import routes from '@/routers'
import store from '@/stores/store'

import VueCookie from 'vue-cookie'

Vue.component('hijo', ComponenteHijo)
Vue.use(VueRouter)
Vue.use(VueCookie)

const router = new VueRouter({ 
	routes,
	mode: 'history'
 })

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
