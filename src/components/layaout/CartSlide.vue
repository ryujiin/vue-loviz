<template lang="pug">
	.slideCart.card(:class="{ activo: getCartSlide }")
		.slideCart-header.card-header
			h2.has-text-centered.texto-impacto(v-if="getCartNow.num_lineas") Su Bolsa 
				span.num-lineas {{getCartNow.num_lineas}}
			.slideCart-hader-close(@click="ocultarCartSlide")
				span.icon-x
		.slideCart-body.card-content
			.cartSlide_empty(v-if="!getCartNow.num_lineas")
				span.icon-shopping_cart
				p 
					strong Su bolsa de compra esta vacia
				.menu-cart(@click="ocultarCartSlide")
					router-link.nav-item(:to={name:'catalogo',params:{categoria:'mujer'}})  Damas
					router-link.nav-item(:to={name:'catalogo',params:{categoria:'hombre'}})  Caballeros
					router-link.nav-item(:to={name:'catalogo',params:{categoria:'kids'}})  Kids
					router-link.nav-item(:to={name:'catalogo',params:{categoria:'mujer'}}) Perzonaliza
			.cartSlideContenido(v-else)
				lv-linea-cart
				.cart-subtotal.texto-impacto
					p Subtotal  S/.40.00
					button.button.checkoutButton.is-black.texto-impacto Procesar Compra


</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import LvLineaCart from '@/components/cart/LineasCart.vue'

export default {
	components:{
		LvLineaCart
  },
	computed:{
		...mapGetters(['getCartSlide','getCartNow']),
	},
	methods:{
		...mapMutations(['ocultarCartSlide'])		
	}
}
</script>

<style lang="scss">
.slideCart {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 200; /* Stay on top */
    top: 0;
    right: 0;
    background-color: #fff;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 35px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    &.activo{
    	width: 400px;
    }
}
.slideCart{
	color: #111;
	text-align: center;
	.slideCart-header{
		position: relative;
		h2{
			width: 100%;
			font-size: 1.4em;
			margin: 20px 0

		}
		.num-lineas{
			background: #111;
			color: #fff;
			width: 30px;
			height: 30px;
			display: inline-block;
			border-radius: 20px;
		}
		.slideCart-hader-close{
			font-size: 2em;
			cursor: pointer;
			position: absolute;
			top: 5px;
			right:15px;
		}
	}
	.slideCart-body{
		.cartSlide_empty{
			.icon-shopping_cart{
				font-size: 4em;
				color: #ccc;
			}
			p{
				margin: 10px 0;
				font-size: 0.85em
			}
			.menu-cart{
				margin-top: 30px;
				a{
					text-transform: uppercase;
					color: #111;
					font-weight: 600;
					font-size: .9em;
					margin:20px 40px;
					position: relative;
					&:hover{
						&:before{
							width: 100px;
						}
					}
					&:before{
						content: '';
						position: absolute;
						height: 2px;
						background: #111;
						bottom: 0;
						width: 100%;
						transition:width 300ms ease;
					}
				}
			}
		}

	}
}
.cartSlideContenido{	
	.cart-subtotal{
		padding-top: 30px;
		font-weight: 600;
		font-size: 0.8em;
	}
	.checkoutButton{
		margin-top: 10px;
		width: 100%;
		padding-top: 15px;
		padding-bottom: 35px;
	}
}

</style>