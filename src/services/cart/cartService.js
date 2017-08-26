import lovizApiService from './../lovizapi'

const lovizApiCartServices = {}

//Url para crear o obtener carrito por primera vez
lovizApiCartServices.createCart = function (carroObject) {
	return lovizApiService.post('/api/carro/',{
		params:carroObject
	})
	.then(res => res.data)
	.catch(err => err.data);
}


lovizApiCartServices.createCartCookie = function (cookie) {
	return lovizApiService.get('/api/carro/',{
		params:{
			session:cookie
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiCartServices.BuscarCartlogin = function () {
	const token = localStorage.getItem('token');

	return lovizApiService.get('/api/carro/',{
		headers:{
			'Authorization':'JWT '+ token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

//Url para cuando ya tengo la ID del carro  Actualizarlo 
function getAutorizacion () {
	const token = localStorage.getItem('token');
	let autorizacion={}
	if (token) {
		autorizacion = {
			'Authorization':'JWT '+token
		}
	};
	return autorizacion
}
lovizApiCartServices.getCartServer = function (id) {
	const auth = getAutorizacion();
	
	return lovizApiService.get(`/api/carro/${id}/`,{
		headers:auth
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiCartServices.editarCartServer = function (carroObject) {
	const token = localStorage.getItem('token');
	console.log(carroObject)
	if (!carroObject.propietario) {
		return
	};
	return lovizApiService.put(`/api/carro/${carroObject.id}/`,carroObject, {
		headers:{
			'Authorization':'JWT '+ token
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

export default lovizApiCartServices