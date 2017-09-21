<template lang="pug">
.producto
	router-link(:to="`/producto/${producto.slug}`")
		.triangulo
		figure
			img.producto-imagen(:src="producto.thum")
		.producto-titulo.texto-impacto
			p.producto-nombre
				.estrellas.has-text-primary
					span(v-for="star in this.stars")
								i.icon-star-full(v-if="star<=producto.sort_valoracion")
								i.icon-star-empty(v-else)
				span {{producto.nombre}}				
		.producto-precio.has-text-centered
			span.precio-old.precio.has-text-danger(v-if="producto.en_oferta") S/. {{producto.precio}}
			span.precio-new.precio S/. {{producto.precio_venta}}
</template>

<script>

export default {
  props: ['producto'],
  data() {
		return {
			stars :[1,2,3,4,5],
		}
	},
}

</script>

<style lang="scss" scoped>
.producto{
	position: relative;
	background-color:#fff;
	border-radius:2px;
	transition: box-shadow .25s, -webkit-box-shadow .25s;
	box-shadow:0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);
	figure{
		padding: 60px 10px 10px;
	}
	.producto-titulo{
		position: absolute;
		top: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 10px rgba(0,0,0,0.2);
		width: 80%;
		right: -10px;
		padding: 10px;
		opacity: 0;
		transition: opacity .3s;
	}
	.triangulo{
		position: absolute;
		width: 0;
    height: 0;
    border-right: 50px solid transparent;
    border-top: 50px solid #afebaf;
    border-left: 50px solid #afebaf;
    border-bottom: 50px solid transparent;
    opacity: 0;
	}
	.estrellas{
		font-size: 0.7em;
	}
	.producto-precio{
		padding: 10px;
		.precio{
			margin: 0 10px;
			font-size: 1.3em;
		}
		.precio-old{
			font-size: 0.9em;
			text-decoration: line-through;
		}
	}
	&:hover{
		box-shadow: 1px 1px 20px rgba(0,0,0,0.4);
		.triangulo{
			opacity: 1
		}
		.producto-titulo{
			opacity: 1;
		}
	}
}
</style>