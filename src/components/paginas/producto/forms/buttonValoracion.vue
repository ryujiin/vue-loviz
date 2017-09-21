<template lang="pug">
	a.button
		span.estrellitas
			span(v-for="s in 5" 
					:class="")
		span {{texto}}
</template>

<script>
export default {
  props: ['valor','texto'],
  data() {
		return {}
	},
	computed:{
		classObjeto(){
			return{
				'icon-star-full': s<this.valor,
				'icon-star-empty':s>=this.valor
			}
		}
	}
}
</script>