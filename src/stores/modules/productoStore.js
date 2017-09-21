import lovizProductoService from '@/services/lovizapiProductos'

const state = {
	productoActual: {},
	productos:[],
	tallaSelecionada:{},
	formComent:false,
}

const getters={
	getproductoActual: state => state.productoActual,
	getTallaSeleccionada: state => state.tallaSelecionada,
	getFormComent: state => state.formComent,
}

const mutations = {
	buscarProducto(state,slug){
		const self = this;
		state.tallaSelecionada={}
		lovizProductoService.getProductoSlug({'slug':slug})
  		.then(res =>{			
  			state.productoActual=res[0];
  			document.title = `${state.productoActual.nombre} (${state.productoActual.color}) | Loviz DelCarpio® Oficial`;
	  	});
	},
	selecionTalla(state,talla){
		state.tallaSelecionada=talla
	},
	verComentario(state,valor){
		state.formComent=valor;
	}
}

const actions= {
}

export default{
	state,
	mutations,
	getters,
	actions,
}