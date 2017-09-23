import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'

const state = {
	pedido:{
		direccion_envio:null
	},
	desing:{
		procesando:false,
	},
	estado:''
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
	},
	changeEstadoPedido(state,valor){
		state.estado=valor
	}
}

const getters={
	getPedido: state => state.pedido,	
	getPedidoDesing: state => state.desing,	
	getEstadoPedido: state => state.estado,
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
	  			context.commit('changeEstadoPedido','')
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