import lovizApiUserService from '@/services/user/lovizApiUser'

const state = {
	userToken:'',
	userPerfil:{
		id:0
	},
	pageTabs:{
		resumen:true,
		direcciones:false,
		personal:false,
		ordenes:false,
		devoluciones:false,
	}
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
		state.userPerfil = {};
		state.userToken = '';		
	},
	changeValor(state,valor){
   		for(var index in state.pageTabs) { 
   			if (valor == index) {
   				state.pageTabs[index] = true;
   			}else{
				state.pageTabs[index] = false;   					
   			}
		}
   	},
}

const getters={
	getToken: state => state.userToken,
	getPerfil: state => state.userPerfil,
	getUserTabs: state => state.pageTabs,
}

const actions={
	buscarToken(context,datos){
		const promise = new Promise(function (resolve,reject) {
			lovizApiUserService.getTokenUser(datos.user,datos.pass)
			.then(res =>{
				resolve(res);
				if (res.token) {
					localStorage.setItem('token',res.token);
					context.commit('setUserToken',res.token);
				}
			})			
		})
		return promise		
	},
	getUserPerfil(context){
		const promise = new Promise(function (resolve,reject) {
			lovizApiUserService.getPerfil(context.state.userToken)
			.then(res =>{
				if (res.detail) {
					context.commit('eliminarSession');
				}else{
					context.commit('setUsuarioPerfil',res);
				}
				resolve(res)
			})
		})
		return promise
	},
}

export default{
	state,
	mutations,
	getters,
	actions,
}