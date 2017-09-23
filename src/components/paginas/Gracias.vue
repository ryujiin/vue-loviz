<template lang="pug">
	.gracias
		.backgrounOver
			header
				h1.title.has-text-centered.texto-1 Gracias Por tu Compra!!!
			.contenido
				.columns.is-multiline
					.column.is-6
						.marco
							.content
								h2.subtitle Detalles de la compra.
								.detalles
									p
										label Codigo de Pedido:
										span {{pedido.numero_pedido}}
									p
										label Fecha de compra:
										span {{pedido.fecha_compra}}
									p
										label Metodo de pago:
										span {{pedido.tipo_pago}}
									p
										label Total : 
										span S/.{{pedido.total}}
					.column.is-6
						.marco
							.content.has-text-centered
								.icono.has-text-success
									.icon-check-circle
								h2.subtitle Felicidades, todo salio correcto.
								p.has-text-centered
									button.button.is-primary Ver mi Pedido
</template>

<script>

import {mapGetters,mapActions,mapMutations} from 'vuex'
import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

export default {
	data () {
    return {
    	pedido:{},
    	contador:0
    }
  },
  computed:{
  	...mapGetters(['getCartNow'])
  },
  methods:{
  	...mapMutations(['assignarPedido','setCartInitialData']),
  	...mapActions(['updateCart']),
  	buscar_pedido(pedido){
  		lovizApiPedidoService.pedidoActual(pedido)
  		.then(res =>{
  			this.pedido = res
  			this.assignarPedido({})
  		})
  	},
  	observarCarro(){
  		this.contador++
  		console.log(this.contador)
  		if (this.contador==2) {
  			if (this.getCartNow.estado=="Abierto") {
  				this.setCartInitialData();
  			}
  		};
  	}
  },
	created(){
		this.buscar_pedido(this.$route.params.pedido);
	},
	watch:{
		//'getCartNow':'observarCarro'
	}
}
</script>

<style lang="scss" scoped>
.gracias{
	padding-top: 100px;
	background-image: url('https://images8.alphacoders.com/408/408951.jpg');
	background-position: top right;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size:100%;
	min-height:560px;
	position: relative;
	.backgrounOver{
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.4);
		position: absolute;
		.contenido{
			max-width: 800px;
			margin: 0 auto;
			.marco{
				background: rgba(0,0,0,0.7);
				border-radius: 5px;
				color: #fff;
				padding:15px;
				.icono{
					font-size: 5em;
				}
				.subtitle{
					color: #fff
				}
				.detalles{
					label{
						width: 180px;
						display: inline-block;
					}
				}
			}
		}
	}
	header{
		padding-top: 100px;
		margin-bottom: 30px;
		.title{
			color: #fff;
		}
	}
}
</style>