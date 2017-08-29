<template lang="pug">
	.header-cart(@click="mostrarCartSlide")
		span.icon-shopping_cart
		.num-cart.texto-impacto.texto-2 {{getCartNow.num_lineas}}
</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'

export default {
	computed:{
  	...mapGetters(['getCartNow','getPerfil'])
	},
  methods:{
    ...mapMutations(['assignarCart','mostrarCartSlide']),
    ...mapActions(['updateServerCart']),
  },
  created() {
  	const carroCookie = this.$cookie.get('sesion_carro');
  	const self = this;
  	if (carroCookie) {
  		lovizApiCartServices.createCartCookie(carroCookie)
  		.then(res =>{
  			if (res.detail) {
  				this.$cookie.delete('sesion_carro');
  			}else{
          		self.assignarCart(res)
  			}
	  	});
  	};
  },
  watch:{
  	//'getCartNow.propietario':'updateServerCart'
  }
}
	
</script>

<style lang="scss" scoped>
.header-cart{
	font-size: 1.2em;
	position: relative;
	.num-cart{
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		font-size: 20px;
		position: absolute;
		background-color: #00d1b2;
		color: #fff;
		width: 28px;
		height: 28px;
		border-radius: 20px;
	}
}
</style>