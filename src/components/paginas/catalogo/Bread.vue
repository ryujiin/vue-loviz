<template lang="pug">
	nav.breadcrumb
		ul
			li
				router-link.nav-item(:to={name:'home'}) Inicio			
			li(v-for="bread in breadReverse")
				a(:src="bread.slug") {{bread.nombre}}
</template>

<script>

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  computed:{
    ...mapGetters(['getCategorias','getSelectedCategoria']),
    breadReverse(){
    	return this.breadcategorias.reverse();
    }
  },
  data () {
    return {
      breadcategorias: [],
    }
  },
  methods:{
  	ordenarBread(cate){
  		const self = this;
  		let categoria = {};
  		if (this.breadcategorias.length===0) {
  			categoria = this.getSelectedCategoria;
  		}else{
  			categoria = cate
  		}
  		this.breadcategorias.push(categoria);
  		if (categoria.padre) {
  			this.getCategorias.forEach(function (valor) {
  				if (categoria.padre===valor.slug) {
  					self.ordenarBread(valor)
  				}
  			})
  		}else{
  			console.log(this.breadcategorias)
  		}
  	}
  },
  watch: {
  	'getSelectedCategoria':'ordenarBread'
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb{
	margin-bottom: 2px;
	color: #111;
}
</style>