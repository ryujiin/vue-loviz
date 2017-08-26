<template lang="pug">
.contenido-general.box.direccion
	.titulo Opciones de Pago
	.content
		p(v-if="!getPedido.metodoenvio") Tiene que elegir una Metodo de envio
		.metodos_pago(v-else :class="{'elegiendo': formMetodo}")
			.metodo_pago.columns.is-multiline(v-for="metodo in metodosPago" 
				@click="seleccionarMetodo(metodo.id)" 
				:class="{'activo': metodo.id == formMetodo}")
				.contenido.column.is-10
					.titulo {{metodo.titulo}}
					.help {{metodo.descripcion}}
				.imagen.column.is-2
					img(:src="metodo.img")
				transition(name="bounce")
					.pago(v-if="metodo.id == formMetodo")
						lv-pago-stripe(v-if="metodo.nombre == 'Stripe'")
						lv-pago-contra-entrega(v-if="metodo.nombre == 'Contra entrega'")
						lv-pago-mercado-pago(v-if="metodo.nombre == 'Mercado Pago'")
						lv-pago-paypal(v-if="metodo.nombre == 'Paypal'")
</template>

<script>
import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

import LvPagoStripe from '@/components/paginas/checkout/PagoStripe.vue'
import LvPagoContraEntrega from '@/components/paginas/checkout/PagoContraentrega.vue'
import LvPagoMercadoPago from '@/components/paginas/checkout/PagoMercadopago.vue'
import LvPagoPaypal from '@/components/paginas/checkout/PagoPaypal.vue'

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
	components:{
		LvPagoStripe,LvPagoContraEntrega,LvPagoMercadoPago,LvPagoPaypal
	},
	data () {
	  return {
	  		metodosPago:{},
	  		formMetodo:null,
	 	}
  },
  computed:{
		...mapGetters(['getPedido']),
  },
  methods:{
  	...mapActions(['editarPedido']),
  	seleccionarMetodo(id){
  		this.formMetodo = id
  	}
  },
  mounted(){
  	lovizApiPedidoService.getMetodoPago()
  	.then(res =>{
	  	this.metodosPago = res
		})
  },
}
</script>

<style lang="scss" scoped>
.metodos_pago{
	&.elegiendo{
		.metodo_pago{
			&.activo{
				.imagen,.help{
					display: block;
				}
			}
			.imagen,.help{
				display: none;
			}
		}
	}
	.metodo_pago{
		cursor: pointer;
		border: 1px solid #ccc;
		border-radius: 8px;
		display: flex;
		padding: 10px;
		margin: 10px;
		&:hover{
			border-color: #3273dc;
		}
		&.activo{
			box-shadow: 1px 1px 5px #3273dc;
			border-color: #3273dc;
			background-color: #E6EBF1;
		}
		.contenido{			
			.titulo{
				color: #111;
				font-size: 0.9em;
				font-weight: bold;
				margin-bottom: 0px
			}
		}
		.pago{
			width: 100%
		}
	}	
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>