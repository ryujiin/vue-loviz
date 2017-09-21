<template lang="pug">
	.main-content
		.container
			lv-bread
			h1.categoria_titulo.hgroup.texto-impacto
				.small(v-if="subtitulo") {{subtitulo}}
				p {{titulo}}
			.refinamientos
				.refinamiento_destock
					.refinamiento_label
						span.contador.texto-1 108 Productos
					.dropdown
						.dropdown-trigger
							button.button(aria-haspopup='true', aria-controls='dropdown-menu')
								span Ordenado Por:
								span.icon.is-small
									i.icon-chevron-thin-down
						#dropdown-menu.dropdown-menu(role='menu')
							.dropdown-content
								a.dropdown-item(href='#')
									| Precio - Bajo a Alto
								a.dropdown-item
									| Precio - Alto a Bajo
								a.dropdown-item.is-active(href='#')
									| Mas Vendidos
								a.dropdown-item(href='#')
									| Ranking Consumidor
								hr.dropdown-divider
								a.dropdown-item(href='#')
									| Recomendados
			.clear
			.columns.is-multiline.is-mobile.productos
				.column.is-half-mobile.is-one-third-tablet.is-one-quarter-desktop(v-for="producto in productos")
					lv-producto-lista(:producto="producto")
</template>

<script>
import lovizProductosService from '@/services/lovizapiProductos'
import lovizCategoriasService from '@/services/lovizApiCategorias'

import LvProductoLista from '@/components/paginas/catalogo/ProductoLista.vue'
import LvBread from '@/components/paginas/catalogo/Bread.vue'

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
	components:{
		LvProductoLista,LvBread
	},
	data () {
		return {
			productos: {},
		}
	},
	computed:{
		...mapGetters(['getslugCategoria','getSelectedCategoria']),
		titulo(){
			var estetitulo = '';
			if (this.getSelectedCategoria) {
				estetitulo = this.getSelectedCategoria.nombre
			};
			return estetitulo
		},
		subtitulo(){
			var subti = false;
			if (this.getSelectedCategoria.padre) {
				return this.getSelectedCategoria.padre
			};
		}
	},
	created(){
		this.changeSlugCategoria();
	},
	methods:{
		...mapMutations(['asignarSlugCategoria','asignarSelectedCategoria']),
		...mapActions(['buscarCategorias']),
		buscarProductosCategoria(){
			lovizProductosService.getListaProductos({categoria:this.getslugCategoria})
				.then(res =>{
					this.productos = res
				});
		},
		changeSlugCategoria(){
			if (this.getslugCategoria!==this.$route.params.categoria) {
				this.asignarSlugCategoria(this.$route.params.categoria)
			}else{
				this.asignarSelectedCategoria()
			}
		},
	},
	watch: {
		// ejecuta nuevamente el método si la ruta cambia
		'$route': 'changeSlugCategoria',
		'getslugCategoria':'buscarCategorias',
		'getSelectedCategoria':'buscarProductosCategoria',
	},
}

</script>

<style lang="scss" scoped>
.main-content{
	padding-top: 90px;
}
.clear{
	clear: both;
}
h1.categoria_titulo{
	float: left;
	color: #111;
	font-size: 1.2em;
	.small{
		float: left;
		font-size: 0.7em
	}
	p{
		padding-top: 20px;
	}
}
.refinamientos{
	float: right;
	margin: 15px 0;
	.search{
		float: left;
		margin: 0 30px;
	}
	.contador{
		margin: 10px 30px;
	}
	.refinamiento_label{
		float: left;
		padding-top: 10px;
	}
}
.productos{
	margin: 0
}

</style>