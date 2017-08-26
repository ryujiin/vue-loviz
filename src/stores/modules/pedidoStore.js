import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

const state = {
	pedido:{
		direccion_envio:null
	},
}

const mutations = {
	assignarPedido(state,pedido){
		state.pedido = pedido;		
	},
	asiganrDireccion(state,direccion){
		state.pedido.direccion_envio = direccion
	},
}

const getters={
	getPedido: state => state.pedido,	
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