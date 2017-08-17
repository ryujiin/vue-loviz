<template lang="pug">
div(v-if="getLineas")
	.lista-cart(v-for="linea in getLineas")
		.img_linea
			img(:src="linea.thum")
		.descripcion_linea.texto-impacto
			.name_price 
				.name {{linea.full_name}}
				.precio S/. {{linea.precio}}
			.variante
				.item Talla / {{linea.talla}}
				.item_cantidad Cant : {{linea.cantidad}}
				.item_remove.has-text-grey(@click="removeLinea(linea.id)") Remover
</template>

<script>

import {mapGetters, mapActions } from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'


export default {
	computed:{
		...mapGetters(['getLineas'])
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
.lista-cart{
	border-bottom: 1px solid #ccc;
	padding-bottom: 10px;
	.img_linea{
		width: 50%;
		display: inline-block;
		padding: 0 20px 0 0;
	}
	.descripcion_linea{
		text-align: left;
		width: 50%;
		display: inline-block;
		font-size: 12px;
		font-weight: 600;
		padding-left: 10px;
		.name_price{
			margin-bottom: 20px;
		}
		.name{
			font-size: 1.2em;
		}
		.variante{
			.item_remove{
				font-size: 0.8em;
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
}
</style>