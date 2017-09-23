<template lang="pug">
	.add-to-cart
		a.button.is-black(v-if="!getTallaSeleccionada.id" ,disabled) Selecciona una Talla
		a.button.is-success(v-else,@click="addToCart") 
			.loader(v-if="getCartSpiner")
			span Agregar al carro


</template>

<script>

import {mapGetters,mapMutations,mapActions} from 'vuex'
import lovizApiCartServices from '@/services/cart/cartService'
import lovizApiLineaServices from '@/services/cart/LineService'


export default {
		computed:{
			...mapGetters(['getCartNow','getproductoActual','getCartSpiner','getTallaSeleccionada','getPerfil'])
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
					lovizApiLineaServices.addLineaCart(linea_actual)
					.then(res =>{
						this.$store.dispatch('updateCart');
						this.$store.commit('mostrarCartSlide');
						this.$store.commit('selecionTalla',{});
			  	});
				}else{
					//Creo el carro
					this.create_cart();
				}
			},
			create_cart(){
				let carroObjet = {}
				if (this.getPerfil.id) {
					carroObjet.propietario=this.getPerfil.id
				};
				lovizApiCartServices.createCart(carroObjet)
				.then(res =>{
					//Coloco el Cookie de la sesion
					if (!res.propietario) {
						this.$cookie.set('sesion_carro',res.sesion_carro,{ expires: '7d' });
					};
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
</style>