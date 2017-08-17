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
			.column.is-3.producto(v-for="p in productos")
				router-link(:to="`/producto/${p.slug}`")
				img.producto-imagen(:src="p.thum")
				.produto-titulo
					p.producto-nombre {{p.nombre}}
					.producto-precio
						.precio-old.precio.has-text-danger(v-if="p.en_oferta") S/. {{p.precio}}
						.precio-new.precio S/. {{p.precio_venta}}

</template>

<script>
import lovizProductosService from '@/services/lovizapiProductos'
import lovizCategoriasService from '@/services/lovizApiCategorias'

export default {
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
	background-color: #fff;
}
.producto{
	position: relative;
	text-align: center;
	min-height: 370px;
	transition:background 0.3s ease;
	&:hover{
		.produto-titulo{
			opacity:1;
			transform:translateY(0);
		}
		.producto-imagen{
			transform:translateY(-70%);
		}
	}
	.producto-imagen{
		height: auto;
		left: 0px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: auto;
		transition: all 1s cubic-bezier(0.2, 0.6, 0.3, 1);
	}
	.produto-titulo{
		transition:all 1s cubic-bezier(0.2,0.6,0.3,1);
		transform:translateY(20px);
		text-transform: uppercase;
		position: absolute;
		font-family: 'Yanone Kaffeesatz', sans-serif;
		width: 100%;
		color: #111;
		bottom: 40px;
		opacity: 0;
		font-size: 1.6em;
		.producto-precio{
			font-size: 16px;
			.precio-old{
				text-decoration: line-through;
				font-size: 0.8em
			}
		}
	}
	.precio{
		display: inline-block;
		margin: 0 10px
	}
	a{
		height: 100%;
		left: 0px;
		position:absolute;
		top: 0px;
		width: 100%;
		z-index: 5;
	}
}
</style>