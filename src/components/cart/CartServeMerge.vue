<template lang="pug">
	.cartServer
		.card
			.card-header
				p.card-header-title Usted tiene una Bolsa Anterior
				.card-header-icon
					span.icon-chevron-thin-down
			.card-content
				.content
					lv-linea-cart
				p ¿Que desea hacer con estos producto?				
			.card-footer
				.card-footer-item Agregar a mi bolsa
				.card-footer-item Eliminar estos productos

				
</template>

<script>

import {mapGetters, mapActions } from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'
import LvLineaCart from '@/components/cart/LineasCart.vue'


export default {
	computed:{
		...mapGetters(['getLineas'])
	},
	components:{
		LvLineaCart
  },
	methods:{
		...mapActions(['updateLineas','updateCart']),
		removeLinea(linea){
			lovizApiCartServices.deleteLinea(linea)
			.then(res =>{
				this.updateLineas();
				this.updateCart();
			})
		}
	}
}

</script>

<style lang="scss">
.cartServer{
	width: 500px;
	margin: 30px auto;	

}
</style>