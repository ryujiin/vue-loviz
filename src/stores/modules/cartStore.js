import lovizApiCartServices from '@/services/cart/cartService'

const state = {
	carts:{},
	cartNow:{
		sesion_carro:'',
		num_lineas:0
	},
	lineas:[],
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
	}
}

const getters={
	getCarts: state => state.carts,
	getCartNow: state => state.cartNow,
	getCartSlide: state => state.cartSlide,
	getCartSpiner: state => state.cartSpiner,
	getLineas: state => state.lineas,
	getCartServer: state => state.cartServer,
}

const actions={
	updateCart(context){
		if (context.state.cartNow.id) {
			lovizApiCartServices.updateCart(context.state.cartNow.id)
			.then(res =>{
				context.state.cartNow=res;
				context.state.cartSpiner=false;
			})
		};
	},
	updateLineas(context){
		lovizApiCartServices.updateLineas(context.state.cartNow.id)
		.then(res =>{
			context.state.lineas=res;
		})
	},
	getCartServer(context){
		if (localStorage.getItem('token')) {
			console.log('Si hay token')
			lovizApiCartServices.getCartServer()
			.then(res =>{
				context.state.cartServer = res;
			})	
		};
	},
	createCart(context){}
}

export default{
	state,
	mutations,
	getters,
	actions,
}