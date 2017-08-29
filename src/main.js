import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import ComponenteHijo from './ComponentHijo.vue'

import routes from '@/routers'
import store from '@/stores/store'

import VueCookie from 'vue-cookie'
import VueProgressBar from 'vue-progressbar'

//Progress bar
const options = {
  color: '#23d160',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(VueRouter)
Vue.use(VueCookie)

//Router
const router = new VueRouter({ 
	routes,
	mode: 'history'
 })

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
