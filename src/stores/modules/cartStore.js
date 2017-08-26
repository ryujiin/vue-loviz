import lovizApiCartServices from '@/services/cart/cartService'
import lovizApiLineaServices from '@/services/cart/LineService'

const state = {
	cartNow:{
		sesion_carro:'',
		num_lineas:0,
		propietario:null,
	},
	cartSpiner:false,
	cartSlide:false,
	cartServer:{}
}

const mutations = {
	assignarCart(state,cart){
		state.cartNow = cart;		
	},
	mostrarCartSlide(state){
		state.cartSlide = true;
	},
	ocultarCartSlide(state){
		state.cartSlide = false;
	},
	mostrarcartSpiner(state){
		state.cartSpiner = true;
	},
	setPropietarioCart(state,idPropietario){
		state.cartNow.propietario = idPropietario;
	},
	setCartInitialData(state){
		state.cartNow ={
			sesion_carro:'',
			num_lineas:0,
			propietario:null,
		}
	}
}

const getters={
	getCartNow: state => state.cartNow,
	getCartSlide: state => state.cartSlide,
	getCartSpiner: state => state.cartSpiner,
	getCartServer: state => state.cartServer,
}

const actions={
	updateCart(context){
		if (context.state.cartNow.id) {
			lovizApiCartServices.getCartServer(context.state.cartNow.id)
			.then(res =>{
				context.state.cartNow=res;
				context.state.cartSpiner=false;
			})
		};
	},
	updateServerCart(context){
		const carro ={
			id:context.state.cartNow.id,
			propietario:context.state.cartNow.propietario
		}
		if (context.state.cartNow.id) {
			lovizApiCartServices.editarCartServer(carro)
			.then(res =>{
				context.state.cartNow=res;
				context.state.cartSpiner=false;
			})	
		};		
	},
	buscarCartServerUser(context){
		lovizApiCartServices.BuscarCartlogin()
		.then(res =>{
			if (!res.detail) {
				if (context.state.cartNow.id) {
					//tengo un carrito en local y uno en server')
					context.state.cartServer = res;
					context.dispatch('updateServerCart')
				}else{
					context.state.cartNow = res;
					context.dispatch('updateServerCart')
				}
			}else{
				//No se encontro carro en el server pero si hay un carro se Update
				context.dispatch('updateServerCart')				
			}
		})
	}

}

export default{
	state,
	mutations,
	getters,
	actions,
}