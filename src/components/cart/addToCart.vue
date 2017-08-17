<template lang="pug">
	.add-to-cart
		a.button.is-black(v-if="!getTallaSeleccionada.id" ,disabled) Selecciona una Talla
		a.button.is-danger(v-else,@click="addToCart") 
			.loader(v-if="getCartSpiner")
			span Agregar al carro


</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'


export default {
		computed:{
			...mapGetters(['getCartNow','getproductoActual','getCartSpiner','getTallaSeleccionada'])
		},
		methods:{
			...mapMutations(['assignarCart','mostrarcartSpiner','mostrarCartSlide','selecionTalla']),
			...mapActions(['updateCart','updateLineas']),
			addToCart(){
				this.mostrarcartSpiner();
				const self = this;
				//Verifico si existe un carro en el Store
				if (this.getCartNow.id) {
					let cookie = 'no hay'
					//si no hay carro en el Store reviso si existe un carro en las cookies
					if (this.$cookie.get('sesion_carro')) {
						cookie = this.$cookie.get('sesion_carro');
					};
					//Creo el Objeto carro que se grabara en el server
					const linea_actual = {
						sesion_carro :cookie,
						carro:this.getCartNow.id,
						producto:this.getproductoActual.id,
						variacion:this.getTallaSeleccionada.id,
						cantidad:1,
					}
					lovizApiCartServices.addLineaCart(linea_actual)
					.then(res =>{
						this.$store.dispatch('updateCart');
						this.$store.dispatch('updateLineas');
						this.$store.commit('mostrarCartSlide');
						this.$store.commit('selecionTalla',{});
			  	});
				}else{
					//Creo el carro
					this.create_cart();
				}
			},
			create_cart(){
				const self = this;
				lovizApiCartServices.createCart()
				.then(res =>{
					//Coloco el Cookie de la sesion
					self.$cookie.set('sesion_carro',res.sesion_carro,{ expires: '7d' });
					this.assignarCart(res);
					this.addToCart();
	  		})				
			},
		}
	}
</script>

<style lang="scss">
.add-to-cart{
	a.button{
		width: 240px;
		text-transform: uppercase;
	}
}
.loader {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 0 10px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>