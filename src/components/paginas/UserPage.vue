<template lang="pug">
	.main-content
		h1.title.has-text-centered Mi Cuenta
		h2.subtitulo.has-text-centered.has-text-black-ter Hola, Enrique Lopez! Encuentra toda la informacion de tus compras y edite su informacion personal.
		.informacion
			.carros_old(v-if="!getCartServer")
				h3.has-text-centered.has-text-black Tiene productos antiguos, que desea hacer con ellos?
				.card(v-for="linea in getCartServer.lineas")
					.card-image
						figure.image
							img(:src="linea.thum")
							.text-over
								.titulo {{linea.nombre}}
								.subtitulo talla: {{linea.talla}} | cantidad: {{linea.cantidad}}
					footer.card-footer
							.card-footer-item.add Agregar al carro
							.card-footer-item.remove Eliminar
			.tabs
				ul
					li(:class="{'is-active': getUserTabs.resumen}" @click="changeValor('resumen')")
						a Resumen
					li(:class="{'is-active': getUserTabs.personal}" @click="changeValor('personal')")
						a Detalles Personales
					li(:class="{'is-active': getUserTabs.direcciones}" @click="changeValor('direcciones')")
						a Direcciones
					li(:class="{'is-active': getUserTabs.ordenes}" @click="changeValor('ordenes')")
						a Mis Ordenes
					li(:class="{'is-active': getUserTabs.devoluciones}" @click="changeValor('devoluciones')")
						a Devoluciones
					li
						a.text-underline(@click="logoutUser") Salir
			lv-user-resumen(v-if="getUserTabs.resumen")
			lv-user-personal(v-if="getUserTabs.personal")
			lv-user-direcciones(v-if="getUserTabs.direcciones")
			lv-user-ordenes(v-if="getUserTabs.ordenes")
			lv-user-devoluciones(v-if="getUserTabs.devoluciones")
</template>

<script>
import LvCartServeMerge from '@/components/cart/CartServeMerge.vue'
import lvUserPersonal from '@/components/user/componentPage/UserPersonal.vue'
import lvUserResumen from '@/components/user/componentPage/UserResumen.vue'
import lvUserDirecciones from '@/components/user/componentPage/UserDirecciones.vue'
import lvUserOrdenes from '@/components/user/componentPage/UserOrdenes.vue'
import lvUserDevoluciones from '@/components/user/componentPage/UserDevoluciones.vue'

import {mapGetters,mapMutations} from 'vuex'

import userPageMixin from '@/mixins/userPage/userPage'

export default {
  mixins:[ userPageMixin ],
	components:{
		LvCartServeMerge,lvUserPersonal,lvUserResumen,lvUserDirecciones,lvUserOrdenes,lvUserDevoluciones
	},
	computed:{
		...mapGetters(['getPerfil','getUserTabs','getCartServer'])
	},
	methods:{
  	...mapMutations(['eliminarSession','setCartInitialData','changeValor']),
  	logoutUser(){
  		this.setCartInitialData();
  		this.$router.push({name:'home'})
  		this.eliminarSession();
  	}
  },
	created(){
		document.title="Mi Cuenta | Loviz DelCarpio";
		if (!this.getPerfil.id) {			
			this.$router.push({name:'home'})
		};
	},
}
</script>

<style lang="scss">
.main-content{
	background-color: #f1ebe7;
	padding-top: 120px;
}
.informacion{
	max-width: 800px;
	margin: 20px auto 0;
	padding-bottom: 30px;
	min-height: 300px;
	.box{
		font-size: 14px;
		.subtitle{
			font-weight: bold;
		}
		h3{
			font-size: 1.3em;
			font-weight: bold;
		}
		.accion{
			font-weight: bold;
			cursor: pointer;
			color: #111;
		}
		.manage{
			font-size: 0.7em;
			float: right;
		}
	}
}
.carros_old{
	.card{
		width: 300px;
		margin: 0 auto;
		.text-over{
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,0.6);
			padding: 10px;
			color:  #fff !important;
			width:100%;
			.titulo{
				font-size: 1.2em;
				font-weight: bold;
			}
		}
		.add{
			background-color: #00d1b2;
		}
		.remove{
			background-color: #ff3860;
		}
		.card-footer-item{
			cursor: pointer;			
			color: #fff;
			&:hover{
				text-shadow: 1px 1px 1px #000
			}
		}
	}
}
</style>
