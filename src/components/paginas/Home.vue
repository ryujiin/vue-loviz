<template lang="pug">
	.main-content
		section.hero-home
			.hero-home-content(v-if="hero.imagen")
				.hero-home-img
					.item-img(:style='{ backgroundImage: `url(${hero.imagen})` }')
				.hero-home-body
					h2 enqieu
		.contenido
			button(@click="show = !show") clickeame
			transition(name="fade")
				.vivni(v-if="show") Clarinete
</template>

<script>
import lovizCmsService from '@/services/lovizcms'
export default {
	data () {
	    return {
	      hero: {
	      },
	      show: true
	  	}
  	},
  	computed:{
  	},
  	created(){
  		lovizCmsService.getHeroHome()
  		.then(res =>{
  			this.hero= res[0];
  		})
  	},
  	updated(){
		document.title="Loviz DelCarpio | Encuentra lo que mas te gusta :: Loviz DelCarpio";
  	},
  	watch: {
  },
}
</script>

<style lang="scss" scoped>
.main-content{
	padding-top: 0px !important;
}
.hero-home{
	overflow: hidden;
	width: 100%;
	min-height: 400px;
	height: 550px;
	position: relative;
	background-color: #E3E2E0;
	.hero-home-content{
		position: relative;
		width: 100%;
		height: 100%;
		.hero-home-img{
			text-align: center;
			width: 100%;
			height: 100%;
			position: absolute;
			.item-img{
				background-position: center bottom;
				background-size: cover;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height:100%;
			}
		}
	}
	
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>