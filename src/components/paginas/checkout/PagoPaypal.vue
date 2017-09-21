<template lang="pug">
.paypal
	h2.titulo Recuerda los siguientes pasos:
	.contenido
		p
			span.icon-check.has-text-success
			span El boton de "Pagar con Paypal", te rediccionara a la pagina de Paypal.
		p
			span.icon-check.has-text-success
			span Ingresa a tu cuenta de paypal o creala.
		p
			span.icon-check.has-text-success
			span Paga en una de las mayores y seguras webs de pagos online mediante tu tarjeta o tus fondos.
		p
			span.icon-check.has-text-success
			span Paypal te rediccionara la nuestra web de vuelta con el pago realizado.
		p
			span.icon-check.has-text-success
			span Lista ahora solo queda esperar el envio y a disfrutar.
		#formularioPaypal
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
		}
	},
	methods:{
		addForm(res){
			document.getElementById('formularioPaypal').innerHTML= res;
		},
		EnviarForm(){
			
		}
	},
	mounted(){
		const pedido = {
			carro:this.getCartNow.id,
			pedido:this.getPedido.numero_pedido,
		}
		lovizApiPedidoService.getpagoPaypal(pedido)
		.then(res =>{	
			this.addForm(res)
	  });
	}
}
</script>

<style lang="scss">
.paypal{
	font-size: 0.75em;
	.contenido{
		margin: 10px;
	}
	#formularioPaypal{
		form{
			text-align: center;
		}
	}
}
</style>