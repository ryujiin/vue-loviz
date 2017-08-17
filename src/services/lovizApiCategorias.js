import lovizApiService from './lovizapi'

const lovizCagoriasService = {}

lovizCagoriasService.getListaCategorias = function () {
	return lovizApiService.get('/api/categoria/')
	.then(res => res.data)
}

//trackService.getByid = function (id) {
	//return platziMusicService.get(`/tracks/${id}`)
	//.then(res => res.data)
//}

export default lovizCagoriasService