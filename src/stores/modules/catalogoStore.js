import lovizCategoriasService from '@/services/lovizApiCategorias'

const state = {
	categorias:[],
	selectedCategoria:{},
	slugCategoria:'',
}

const mutations = {
	asignarSlugCategoria(state,valor){
		state.slugCategoria = valor;				
	},
	asignarSelectedCategoria(state,valor){
		state.selectedCategoria={};
		state.categorias.forEach(function (valor) {
	  		if (state.slugCategoria===valor.slug) {
	  			state.selectedCategoria=valor;
      			document.title=`${state.selectedCategoria.full_name} | Loviz DelCarpio® Oficial`;
	  		};
	  	})
	}
}

const getters={
	getCategorias: state => state.categorias,	
	getslugCategoria: state => state.slugCategoria,	
	getSelectedCategoria: state => state.selectedCategoria,		
}

const actions= {
	buscarCategorias(context){
		if (context.state.categorias.length===0) {
			lovizCategoriasService.getListaCategorias()
		  	.then(res =>{
		  		context.state.categorias = res;
				context.commit('asignarSelectedCategoria')
		  	});	
		}else{
			context.commit('asignarSelectedCategoria')
		}
	}
}

export default{
	state,
	mutations,
	getters,
	actions,
}