<template lang="pug">
	.header-cart(@click="mostrarCartSlide")
		span.icon-shopping_cart
		.num-cart.is-primary.texto-impacto.texto-2 {{getCartNow.num_lineas}}
</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'

export default {
	computed:{
  	...mapGetters(['getCarts','getCartNow','getuserPerfil'])
	},
  methods:{
    ...mapMutations(['assignarCart','mostrarCartSlide']),
  	...mapActions(['updateLineas']),
  	verificarUser(){
  		if (getuserPerfil.id!==0) {
        console.log('hay yser');
      };
  	}
  },
  created() {
  	const carroCookie = this.$cookie.get('sesion_carro');
  	const self = this;
  	if (carroCookie) {
  		lovizApiCartServices.getCartCookie(carroCookie)
  		.then(res =>{
  			if (res.detail) {
  				this.$cookie.delete('sesion_carro');
  			}else{
          self.assignarCart(res)
  				self.updateLineas(res)
  			}
	  	});
  	};

  },
  watch:{
  	'getuserPerfil':'verificarUser'
  }
}
	
</script>

<style lang="scss" scoped>
.header-cart{
	color: #111;
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