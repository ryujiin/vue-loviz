<template lang="pug">
section.main-content
	.categoria-top(v-if="Selectcategoria.imagen")
		img(:src="Selectcategoria.imagen")
	.container
		nav.breadcrumb
			ul
				li
					a(src="/Prueba") Prueba
				li
					a(src="Prjifhnw") Pruba 2
		.columns
			.categoria-nombre.column
				h1.titulo-categoria
					span {{Selectcategoria.nombre}}
			.column
				span Refinar
		.columns.productos.is-multiline
			.column.is-one-quarter(v-for="producto in productos")
				lv-producto-lista(:producto="producto")

</template>

<script>
import lovizProductosService from '@/services/lovizapiProductos'
import lovizCategoriasService from '@/services/lovizApiCategorias'

import LvProductoLista from '@/components/paginas/catalogo/ProductoLista.vue'

export default {
	components:{
		LvProductoLista
	},
  data () {
    return {
    	slugCategoria:'',
      productos: {},
      categorias:[],
      Selectcategoria:{},
    }
  },
  created(){
  	this.changeSlugCategoria();
  },
  updated(){
  	document.title=`${this.Selectcategoria.full_name} | Loviz DelCarpio® Oficial`;
  },
  methods:{
  	getLink(slug){
  		console.log(slug)
  	},
  	buscarProductosCategoria(){
  		if (!this.slugCategoria) {
  			return
  		};
	  	lovizProductosService.getListaProductos({categoria:this.slugCategoria})
	  		.then(res =>{
	  			this.productos = res
	  		});
  	},
  	buscarCategorias(){
  		const self = this;

  		if (this.categorias.length===0) {
  			lovizCategoriasService.getListaCategorias()
	  		.then(res =>{
	  			this.categorias = res;
	  			this.buscarCategorias();
	  		});
  		};
  		this.categorias.forEach(function (valor) {
  			if (self.slugCategoria===valor.slug) {
  				self.Selectcategoria=valor;
  			};
  		})
    		
  	},
  	changeSlugCategoria(){
  		if (this.slugCategoria!==this.$route.params.categoria) {
  			this.slugCategoria = this.$route.params.categoria
  		};
  	}
  },
  watch: {
    // ejecuta nuevamente el método si la ruta cambia
    '$route': 'changeSlugCategoria',
    'slugCategoria':'buscarCategorias',
    'Selectcategoria':'buscarProductosCategoria'
  },
}

</script>

<style lang="scss" scoped>
.main-content{
	padding-top: 70px;
}
</style>