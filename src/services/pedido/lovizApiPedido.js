import lovizApiService from './../lovizapi'

const lovizApiPedidoService = {}

lovizApiPedidoService.updatePedido = function (pedido) {
	const token = localStorage.getItem('token');
	return lovizApiService.get(`/api/pedidos/${pedido}/`,{
		headers:{
			'Authorization':'JWT '+token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);	
}
lovizApiPedidoService.editarPedido = function (pedido) {
	const token = localStorage.getItem('token');
	return lovizApiService.put(`/api/pedidos/${pedido.id}/`,pedido,{
		headers:{
			'Authorization':'JWT '+token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);	
}
//Pago Stripe
lovizApiPedidoService.pagoStripe = function (pago) {
	const token = localStorage.getItem('token');

	return lovizApiService.post('/pago/stripe/',{
		carro:pago.carro,
		stripeToken:pago.stripeToken
	},)
	.then(res => res.data)
	.catch(err => err.data);	
}

//Ubigeo
lovizApiPedidoService.getUbigeoDepartamento = function () {
	return lovizApiService.get('/api/ubigeo/')
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiPedidoService.getUbigeoProvincia = function (depa) {
	return lovizApiService.get('/api/ubigeo/',{
		params:{
			region:depa
		}
	})
	.then(res => res.data)
	.catch(err => err.data);	
}
//Metodos de envio
lovizApiPedidoService.getMetodoEnvio = function () {
	const token = localStorage.getItem('token');

	return lovizApiService.get('/api/metodos_envio/',{
		headers:{
			'Authorization':'JWT '+token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);		
}

//MEtodos de Pago
lovizApiPedidoService.getMetodoPago = function () {
	const token = localStorage.getItem('token');

	return lovizApiService.get('/api/metodos_pago/',{
		headers:{
			'Authorization':'JWT '+token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);		
}
export default lovizApiPedidoService