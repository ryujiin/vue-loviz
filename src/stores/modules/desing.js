const state = {
	desing:{
		isHome:false
	},
}

const mutations = {
	changeCssHome(state,valor){
		state.desing.isHome = valor
	},
}

const getters={
	getDesing: state => state.desing,	
}

const actions={
}

export default{
	state,
	mutations,
	getters,
	actions,
}