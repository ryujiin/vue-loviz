import lovizApiService from './../lovizapi'

const lovizApiUserService = {}

lovizApiUserService.getTokenUser = function (user,pass) {
	return lovizApiService.post('/api-token-auth/',{
		username:user,
		password:pass,
	})
	.then(res => res.data)
	.catch(err => err.data);
}

lovizApiUserService.getPerfil = function (token) {
	return lovizApiService.get('/api/user/perfil/',{
		headers:{
			'Authorization':'JWT '+token
		}
	})
	.then(res => res.data)
	.catch(err => err.data)
}

export default lovizApiUserService