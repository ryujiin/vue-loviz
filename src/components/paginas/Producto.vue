<template lang="pug">
	section.main-content
		.container.productoSingle(v-if="getproductoActual")
			.columns.is-multiline
				.column.is-8.imagen-producto
					.galeria-full
						.thums
							ul
								li(v-for="img in getproductoActual.imagenes_producto")
									img(:src="img.imagen_thum",@click="cambiarImagen(img.orden)")
						lv-zoom-producto(:primera_imagen="primera_imagen")
				.column.is-4.producto
					.producto-name
						span.texto-impacto.texto-2 Hombre
						h1.title {{getproductoActual.nombre}}
					.producto-categoria
						.cates(v-for="cate in getproductoActual.categorias")
							router-link.texto-impacto.texto-2.texto-2.button.is-small(:to="`/catalogo/${cate.slug}`") {{cate.nombre}}
					.producto-precios
						.producto-precios-variacion
							.precio-old.has-text-danger S/. {{getproductoActual.precio}}
							.precio-venta.has-text-black-bis S/. {{getproductoActual.precio_venta}}
					.producto-review
						.producto-estrellas.has-text-primary
							span(v-for="star in this.stars")
								i.icon-star-full(v-if="star<=getproductoActual.sort_valoracion")
								i.icon-star-empty(v-else)
						.producto-leer-escribir(@click="verComentario(true)")
							span.ratio {{getproductoActual.valoracion}}
							span.num-coments ({{getproductoActual.num_comentarios}})
							span.texto-impacto.texto-2 Danos tu Opinion
					.producto-variaciones
						.variacion-seleccion
							.titulo-seleccion.texto-impacto.texto-2 Seleccionado:
							.valor-seleccion {{getproductoActual.color}}
							.opciones-seleccion
								ul
									li.selecionado
										figure
											a(href="/")
												img(:src="getproductoActual.thum")
									li(v-for="relacion in getproductoActual.relaciones")
										figure
											router-link(:to="`/producto/${relacion.slug}`")
												img(:src="relacion.thum")
						.variacion-talla
							.titulo-seleccion.texto-impacto.texto-2 Tallas Disponibles: {{this.getTallaSeleccionada.talla}}
							.opciones-seleccion.talla-opciones
								.talla-opcion(
									v-for="varia in getproductoActual.variaciones",
									@click="selecionTalla(varia)",
									:class="{'activo' : getTallaSeleccionada == varia}") {{varia.talla}}
					lv-add-to-cart
				.column.is-12.datos
					lv-coment(:producto="getproductoActual")
		.productos-more
			.titulo.has-text-centered
				small Otros Productos
				h1 Que Tambien te Gustara
			.productos
				carousel(:perPage="4" :paginationEnabled="false")
					slide(v-for="p in productos" :key="p.slug")
						.column
							lv-producto-lista(:producto="p")
		lv-section-review(:producto="getproductoActual")
</template>

<script>

import {mapGetters,mapState,mapMutations} from 'vuex'
import { Carousel, Slide } from 'vue-carousel';

import lovizProductosService from '@/services/lovizapiProductos'

import lvAddToCart from '@/components/cart/addToCart.vue'
import lvZoomProducto from '@/components/paginas/producto/zoomProducto.vue'
import lvComent from '@/components/paginas/producto/FormComentario.vue'
import LvProductoLista from '@/components/paginas/catalogo/ProductoLista.vue'
import lvSectionReview from '@/components/paginas/producto/sectionReview.vue'


export default {
		data: function () {
			return {
				productoSlug:'',
				stars :[1,2,3,4,5],
				imagenSelecionada:'',
				zoom:false,
				productos:{},
			}
		},
		components:{
			lvAddToCart,lvZoomProducto,lvComent,LvProductoLista,Carousel,Slide,lvSectionReview
		},
		created(){
			this.changeProductoSlug(this.$route.params.slug);
		},
		computed:{
			...mapGetters(['getproductoActual','getTallaSeleccionada','getFormComent']),
			primera_imagen(){
				if (!this.getproductoActual.id) {
					return
				};
				if (this.imagenSelecionada!=='') {
					return this.imagenSelecionada
				}else{
					return this.getproductoActual.imagenes_producto[0].imagen
				}
			},
			estilo_img(){
				return {
					backgroundImage:`url(${this.primera_imagen})`
				}
			}
		},
		methods:{
			...mapMutations(['buscarProducto','selecionTalla','cambiarImagen','verComentario']),
			changeProductoSlug(){
				this.tallaSeleccionada = {};
				this.imagenSelecionada = '';
				this.productoSlug = this.$route.params.slug;
			},
			buscarProductoSlug(){
				this.buscarProducto(this.productoSlug)
				lovizProductosService.getListaProductos({categoria:'mujer'})
				.then(res =>{
					this.productos = res
				});
			},
			cambiarImagen(orden){
				const self = this;
				this.getproductoActual.imagenes_producto.forEach(function (valor) {
					if (valor.orden===orden) {
						self.imagenSelecionada = valor.imagen
					};
				})
			},
		},
		watch:{
			'$route':'changeProductoSlug',
			'productoSlug':'buscarProductoSlug',
		}
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.main-content{
	padding-top: 80px;
	background-color: #fff
}
.producto{
	.producto-categoria{
		.cates{
			display: inline-block;
			margin: 2px 5px;
			a{
				border-radius: 0px;
			}
		}
	}
	.producto-precios{
		.producto-precios-variacion{
			font-size: 2em;
			div{
				display: inline-block;
			}
			.precio-old{
				text-decoration: line-through;
				font-size: 0.5em;
				margin: 0 10px 0 0;
			}
		}
	}
	.producto-review{
		color: #111;
		.producto-estrellas,.producto-leer-escribir{
			display: inline-block;
		}
		.ratio{
			text-decoration: underline;
			margin: 0 5px 0 10px;
		}
		.num-coments{
			margin: 0 10px;
		}
		.texto-impacto.texto-2{
			cursor: pointer;
			text-decoration: underline;
		}
		.modal{
			.modal-content{
				background-color: #fff;
			}
		}
	}
	.producto-variaciones{
		margin: 20px 0;
		.variacion-seleccion{
			.titulo-seleccion,.valor-seleccion{
				display: inline-block;
			}
			.valor-seleccion{
				margin: 10px;
			}
			.opciones-seleccion{
				ul{
					li{
						display: inline-block;
						width: 80px;
						margin: 0 10px 0 0;
						&.selecionado,&:hover{
							border-bottom: 2px solid #111
						}
					}
				}
			}
		}
		.variacion-talla{
			.talla-opciones{
				.talla-opcion{
					display: inline-block;
					border: 1px solid #ccc;
					margin: 0 10px 0 0;
					color: #111;
					padding: 5px;
					cursor: pointer;
					&:hover,&.activo{
						border-color: #111
					}
				}
			}
		}
	}
}
.galeria-full{
	background-color: #fff;
	.thums{
		width: 12%;
		display: inline-block;
		float: left;
		ul{
			li{
				cursor: pointer;
				border: 1px solid #fff;
				border-radius: 5px;
				padding: 4px 4px 0;
				&:hover{
					border-color: #ccc;
				}
			}
		}
	}
}
</style>