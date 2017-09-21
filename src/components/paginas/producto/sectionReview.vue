<template lang="pug">
.producto-review
	h1.title.has-text-centered Opiniones ({{producto.num_comentarios}})
		p
			a.button.is-black(@click="verComentario(true)") Danos tu Opinion
	.container(v-if="producto.num_comentarios>0")
		.columns.is-multiline
			.column.is-4
				lv-promedio(:comentarios="comentarios" :producto="producto")
			.column.is-8
				.columns.is-multiline
					.column.is-6(v-for="coment in comentarios")
						.card
							.card-image(v-if="coment.imagenes")
								figure.image.is-4by3
									img(src='http://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
							.card-content
								.media
									.media-left
										figure.image.is-48x48
											img(src='http://bulma.io/images/placeholders/96x96.png', alt='Imagen de Perfil')
									.media-content
										p.title.is-4 {{coment.nombre}}
										p.subtitle.is-6
											span.icon-star-full.has-text-warning(v-for="s in coment.valoracion")
								.content
									p {{coment.comentario}}
									p.redes-sociales(v-if="redes")
										a @lovizDC
										| .
										a(href='#') #cute
										a(href='#') #evangelion
									br
									time(datetime='2016-1-1') Hace {{coment.creado}}
</template>

<script>
import {mapMutations} from 'vuex'

import lovizProductosService from '@/services/lovizapiProductos'

import lvPromedio from '@/components/paginas/producto/comentarios/promedio.vue'


export default {
	components:{
		lvPromedio
	},
	props: [
		'producto'
	],
	data(){
		return{
			comentarios:[],
			redes:false,
		}
	},
	methods:{
		...mapMutations(['verComentario']),
		update(){
			lovizProductosService.getComentarioProducto(this.producto.id)
			.then(res =>{
			  this.comentarios=res
			});		
		}
	},
	watch:{
		producto:'update'
	}
}

</script>

<style lang="scss" scoped>
	.producto-review{
		background: #f2f2f2;
		margin-top: 30px;
		padding-top: 10px;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.8);
		padding-bottom: 30px;
	}
</style>