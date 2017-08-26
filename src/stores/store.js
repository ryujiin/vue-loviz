import Vue from 'vue'
import Vuex from 'vuex'

import VueLocalStorage from 'vue-localstorage'

import usuario from '@/stores/modules/userStore'
import carts from '@/stores/modules/cartStore'
import producto from '@/stores/modules/productoStore'
import pedido from '@/stores/modules/pedidoStore'

Vue.use(VueLocalStorage)
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		usuario,
		carts,
		producto,
		pedido
	}
})

export default store