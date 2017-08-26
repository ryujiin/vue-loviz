import lovizApiService from './lovizapi'

const lovizCmsService = {}

lovizCmsService.getHeroHome = function (q) {
	return lovizApiService.get('/api/cms/hero_home',{})
	.then(res => res.data)
}

lovizCmsService.getCrsfToken = function (q) {
	return lovizApiService.get('/get_token/')
	.then(res => res.data)
}
//trackService.getByid = function (id) {
	//return platziMusicService.get(`/tracks/${id}`)
	//.then(res => res.data)
//}

export default lovizCmsService