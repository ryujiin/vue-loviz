import lovizApiService from './../lovizapi'

const lovizApiCartServices = {}

lovizApiCartServices.getCartCookie = function (cookie) {
	return lovizApiService.get('/api/carro/',{
		params:{
			session:cookie
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiCartServices.createCart = function () {
	return lovizApiService.post('/api/carro/',{
	})
	.then(res => res.data)
	.catch(err => err.data)
}

lovizApiCartServices.getCartServer = function (carro) {
	const token = localStorage.getItem('token');
	if (!carro) {
		carro = 0
	};
	return lovizApiService.get('/api/carro/',{
		params:{
			carro_fronted:carro
		},
		headers:{
			'Authorization':'JWT '+token
		}
	})
}

lovizApiCartServices.updateCart = function (id) {
	return lovizApiService.get(`/api/carro/${id}/`)
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiCartServices.updateLineas = function (id) {
	return lovizApiService.get('/api/carro/lineas/',{
		params:{
			carro:id
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiCartServices.addLineaCart = function (linea) {
	return lovizApiService.post('/api/carro/lineas/',linea)
	.then(res => res.data)
	.catch(err => err.data)	
}

lovizApiCartServices.deleteLinea = function (linea) {
	return lovizApiService.delete(`/api/carro/lineas/${linea}/`)
	.then(res => res.data)
	.catch(err => err.data)	
}

export default lovizApiCartServices