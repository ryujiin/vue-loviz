<template lang="pug">
.mercado_pago
	p.has-text-centered
		a.button.is-primary(:href="enlaceMercadoPago" v-if="enlaceMercadoPago")
			span Total a Pagar
			span.icon-keyboard_arrow_right
			strong  S/. {{getCartNow.total}}
		a.button.is-primary(v-else disabled)
			.loader
			span Total a Pagar
			span.icon-keyboard_arrow_right
			strong  S/. {{getCartNow.total}}
</template>

<script>

import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
	computed:{
		...mapGetters(['getCartNow','getPedido'])
	},
	data () {
		return {		
			enlaceMercadoPago:'',
		}
	},
	methods:{
		goMercadoPago(){

		}
	},
	created(){
		console.log(this.getCartNow.id)
		lovizApiPedidoService.getpagoMercadoPago(this.getCartNow.id)
		.then(res =>{	
			console.log(res)
			this.enlaceMercadoPago=res.response.init_point
	  });		
	}
}
</script>

