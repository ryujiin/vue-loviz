import lovizApiService from './lovizapi'

const lovizProductosService = {}

lovizProductosService.getListaProductos = function (q) {
	return lovizApiService.get('/api/productos/',{
		params:q
	})
	.then(res => res.data)
}

lovizProductosService.getProductoSlug = function (q) {
	if (!q) {
		return
	};
	return lovizApiService.get('/api/productos/',{
		params:q
	})
	.then(res => res.data)
}

lovizProductosService.getComentarioProducto = function (p) {
	return lovizApiService.get('/api/comentarios/',{
		params:{
			producto:p
		}
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizProductosService.createComentarioProducto = function (comentario) {
	const token = localStorage.getItem('token');	

	return lovizApiService.post('/api/comentarios/',comentario)
	.then(res => res.data)
	.catch(err => err.data);
}

lovizProductosService.updateComentarioProducto = function (comentario) {
	const token = localStorage.getItem('token');	

	return lovizApiService.put(`/api/comentarios/${comentario.id}/`,comentario)
	.then(res => res.data)
	.catch(err => err.data);
}

//trackService.getByid = function (id) {
	//return platziMusicService.get(`/tracks/${id}`)
	//.then(res => res.data)
//}

export default lovizProductosService