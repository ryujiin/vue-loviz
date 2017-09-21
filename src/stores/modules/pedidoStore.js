import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

const state = {
	pedido:{
		direccion_envio:null
	},
	desing:{
		procesando:false,
	}
}

const mutations = {
	assignarPedido(state,pedido){
		state.pedido = pedido;		
	},
	asiganrDireccion(state,direccion){
		state.pedido.direccion_envio = direccion
	},
	changePedidoProcesando(state,valor){
		state.desing.procesando=valor
	}
}

const getters={
	getPedido: state => state.pedido,	
	getPedidoDesing: state => state.desing,	
}

const actions={
	buscarPedido(context,pedido){
		lovizApiPedidoService.updatePedido(pedido)
		.then(res =>{			
  			context.commit('assignarPedido',res)
	  	});
	},
	editarPedido(context,pedido){
		if (pedido.id == context.state.pedido.id) {
			lovizApiPedidoService.editarPedido(pedido)
			.then(res =>{
	  			context.commit('assignarPedido',res)			
			})
		};
	}
}

export default{
	state,
	mutations,
	getters,
	actions,
}