<template lang="pug">
	.main-content
		h1.title.has-text-centered Mi Cuenta
		h2.subtitulo.has-text-centered.has-text-black-ter Hola, Enrique Lopez! Encuentra toda la informacion de tus compras y edite su informacion personal.
		.informacion
			.tabs
				ul
					li.is-active
						a Resumen
					li
						a Detalles Personales
					li
						a Direcciones
					li
						a Mis Ordenes
					li
						a Devoluciones
					li
						a(@click="logoutUser") Salir
</template>

<style lang="scss">
.main-content{
	background-color: #f1ebe7;
	padding-top: 120px;
}
.informacion{
	max-width: 800px;
	margin: 20px auto 0;
}
</style>

<script>
import LvCartServeMerge from '@/components/cart/CartServeMerge.vue'

import {mapGetters,mapMutations} from 'vuex'

export default {
	components:{
		LvCartServeMerge,
	},
	computed:{
		...mapGetters(['getuserPerfil'])
	},
	methods:{
   		...mapMutations(['eliminarSession']),
   		logoutUser(){
   			this.eliminarSession();
   			this.$router.push({name:'home'})
   		}
	},
	created(){
		document.title="Mi Cuenta | Loviz DelCarpio";
		if (!this.getuserPerfil.id) {			
			this.$router.push({name:'home'})
		};
	},
}
</script>