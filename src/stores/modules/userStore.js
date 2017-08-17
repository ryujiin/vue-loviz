import lovizApiUserService from '@/services/user/lovizApiUser'

const state = {
	userToken:'',
	userPerfil:{
		id:0
	},
}

const mutations = {
	setUserToken(state,token){
		state.userToken = token
	},
	setUsuarioPerfil(state,userPerfil){
		state.userPerfil = userPerfil
	},
	eliminarSession(state){
		localStorage.removeItem('token');
		state.userPerfil = {id:0};
		state.userToken = '';
	}
}

const getters={
	getuserToken: state => state.userToken,
	getuserPerfil: state => state.userPerfil,
}

const actions={
}

export default{
	state,
	mutations,
	getters,
	actions,
}