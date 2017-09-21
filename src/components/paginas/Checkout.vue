<template lang="pug">
	.main-content
		.capa_pagando(v-if="getPedidoDesing.procesando")
			.pagando
				.spinner
					.cube1
					.cube2
				p.has-text-black.has-text-centered Procesando Pago
		.checkout
			h1.title.has-text-centered Procesar Compra
			.columns.is-multiline
				.column.is-8
					p Si tienes cualquier problema porfavor contactanos a nuestro soporte
				.column.is-4.has-text-right
					span.icon-mobile
					span.text-impacto 986-960-767
				.column.is-7
					.contendio-general.box.cuenta
						.titulo Datos de la Cuenta
							span.icon-check.is-pulled-right.has-text-primary
						.content
							span {{getPerfil.first_name}} {{getPerfil.last_name}}
							p {{getPerfil.email}}
					lv-box-direccion
					lv-box-metodo-envio
					lv-box-metodo-pago
				.column.is-5
					.orden.box
						h2.titulo.texto-impacto Mi Orden
						lv-linea-cart
						.subtotal.celda
							span Subtotal
							span.is-pulled-right S/. {{getCartNow.subtotal}}
						.envio.celda
							span Envio
							span.is-pulled-right S/.{{getCartNow.envio}}
						.total.celda
							span Total
							span.is-pulled-right S/. {{getCartNow.total}}
</template>

<script>
import LvLineaCart from '@/components/cart/LineasCart.vue'
import LvBoxDireccion from '@/components/paginas/checkout/boxDireccion.vue'
import LvBoxMetodoEnvio from '@/components/paginas/checkout/boxMetodoEnvio.vue'
import LvBoxMetodoPago from '@/components/paginas/checkout/boxMetodoPago.vue'

import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
	data () {
    return {}
  },
	components:{
		LvLineaCart,LvBoxDireccion,LvBoxMetodoEnvio,LvBoxMetodoPago
	 },
	computed:{
		...mapGetters(['getCartNow','getPerfil','getPedido','getPedidoDesing']),
	},
	methods:{
		...mapActions(['buscarPedido','updateCart']),
		...mapMutations(['asiganrDireccion']),
		activarModalDireccion(){
			this.direcionModal = true;
		},
	},
	created(){
		if (this.getPerfil.id) {
			if (this.getCartNow.pedido) {
		    this.buscarPedido(this.getCartNow.pedido);
		  }else{
		  	this.updateCart();
		  }
		}else{
	  		this.$router.push({name:'home'})			
		}	  
	},
	watch:{
		'getPedido':'updateCart'
	}
}
</script>

<style lang="scss" scoped>
.capa_pagando{
	width: 100%;
	height: 100%;
	position: fixed;
	background-color: rgba(255,255,255,0.95);
	z-index: 999;
	top: 0;
	.pagando{
		position: absolute;
		top: 10%;
		left: 40%;
		width: 20%;
	}
}
.checkout{
	width: 1000px;
	margin: 0 auto;
	.direcciones-elegibles{
		.separador{
			border-bottom: 1px solid #ccc;
			padding: 10px 0px
		}
	}
	.titulo{
		margin-bottom: 10px;
		font-size: 1.3em;
	}
	.box{
		box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
		margin-bottom: 15px;
		&.activo{
			transform : scale(.5,0.5);
		}
		.editar{
			margin: 0 10px;
		}
	}
	.seccion{
		margin-bottom: 20px
	}
	.orden{
		.subtotal{
			margin-top: 10px
		}
		.celda{
			margin-bottom: 10px
		}
		.total{
			font-weight: bold;
			font-size: 1.3em
		}
	}
	.aparecer{
		font-size: 1px;
		visibility: hidden;
		opacity: 0;
		transition: all 0.5s linear;
		&.activo{
			font-size: inherit;
			visibility: visible;
			opacity: 1;
		}
	}
}

.spinner {
  margin: 100px auto 20px;
  width: 80px;
  height: 80px;
  position: relative;
}

.cube1, .cube2 {
  background-color: #3273dc;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>