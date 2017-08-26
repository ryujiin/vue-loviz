<template lang="pug">
	.main-content
		.checkout
			h1.title.has-text-centered Procesar Compra
			.columns.is-multiline
				.column.is-8
					p Si tienes cualquier problema porfavor contactanos a nuestro soporte
				.column.is-4.has-text-right
					span.icon-mobile 986-960-767
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
							label Total
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
		...mapGetters(['getCartNow','getPerfil','getPedido']),
	},
	methods:{
		...mapActions(['buscarPedido']),
		...mapMutations(['asiganrDireccion']),
		activarModalDireccion(){
			this.direcionModal = true;
		},
	},
	created(){
		if (this.getPerfil.id) {
			if (this.getCartNow.pedido) {
		    this.buscarPedido(this.getCartNow.pedido);
		  };	
		}else{
  		this.$router.push({name:'home'})			
		}
	  
	},
	watch:{
	}
}
</script>

<style lang="scss">
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
</style>