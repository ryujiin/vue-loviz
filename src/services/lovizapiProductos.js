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
//trackService.getByid = function (id) {
	//return platziMusicService.get(`/tracks/${id}`)
	//.then(res => res.data)
//}

export default lovizProductosService