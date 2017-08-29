<template lang="pug">
	header.main-header(:class="{ activo: isActive , 'ishome':getDesing.isHome}", @scroll="scrollBajando")
		.container
			.logo.has-text-centered
				router-link.logo-m(:to={name:'home'})
					.img-logo
						img(src="https://scontent.flim5-4.fna.fbcdn.net/v/t34.0-12/21208715_10214084400250931_144197643_n.png?oh=1128dcee021d865222d99a323016482a&oe=59A5C293")
					span.texto-1 Loviz DC
			.mobil-nav-button.is-hidden-tablet
				.header-right
					lv-carro-header
			.links-wrapper.is-hidden-mobile
				.header-delivery.has-text-centered
						router-link(:to={name:'home'})
							span.icon
								i.icon-truck.is-medium
							span.texto-impacto.texto-2 Envio Gratis por compras mayores S/.50.00
				.header-wrapper.nav-wrapper
					nav.header-nav
						ul.header-nav-left.nav-menu.has-text-right
							li.nav-item
								router-link.nav-item(:to={name:'catalogo',params:{categoria:'mujer'}}) Damas
							li.nav-item
								router-link.nav-item(:to={name:'catalogo',params:{categoria:'kids'}}) Kids
						ul.header-nav-right.nav-menu.has-text-left
							li.nav-item
								router-link.nav-item(:to={name:'catalogo',params:{categoria:'hombre'}}) Hombre
							li.nav-item
								router-link.nav-item(:to={name:'perfil'}) Sobre Loviz
				.header-right
					lv-user-login
					lv-carro-header
</template>

<script>
import LvUserLogin from '@/components/user/userLogin.vue'
import LvCarroHeader from '@/components/cart/CarroHeader.vue'

import {mapGetters,mapMutations} from 'vuex'

export default {
	components:{
		LvUserLogin,LvCarroHeader
  },
  data () {
    return {
    	isActive:false,
    }
  },
  computed:{
    ...mapGetters(['getDesing'])  	
  },
  methods:{
  	scrollBajando(){
  		if (document.body.scrollTop>1) {
  			this.isActive=true;
  		}else{
  			this.isActive=false;
  		}
  	}
  },
  created() {
    window.addEventListener('scroll', this.scrollBajando);
  },
}
	
</script>

<style lang="scss" scoped>
//Mobil First
.main-header{
	position: fixed;
	width: 100%;
	z-index: 9;
	color: #111;
	text-shadow:1px 1px 5px rgba(0,0,0,0.2);
	transition: all 0.25s;
	&:hover{
		color: #111;
		text-shadow: none;
		background-color: #fff;
		box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.1);
		a{
			color: #111;
		}
	}
	a{
		color: #111;
	}
	&.activo{
		background-color: #fff;
		color: #111;
		text-shadow:none;
		box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.1);		
		a{
			color: #111;
			text-shadow:none;
		}
		.links-wrapper{
			padding-top: 0px;
			.header-right{
				top: 0px;
			}
		}
		.logo{
			.img-logo{
				width: 70px;
			}
		}
	}
	&.ishome{
		color: #fff;
		&:hover{
			color: #111;
			a{
				color: #111;
			}
		}
		a{
			color: #fff;
		}
		&.activo{
			background-color: #fff;
			color: #111;
			text-shadow:none;
			box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.1);		
			a{
				color: #111;
				text-shadow:none;
			}
		}
	}
	//Mobil
	.mobil-nav-button{
		.header-left,.header-right{
			font-size: 1.3em;
			position: absolute;
			top: 20px;
		}
		.header-left{
			left: 20px
		}
		.header-right{
			right: 40px
		}
		.menu-mobil{
			cursor: pointer;
		}
	}
	//Destock
	.links-wrapper{
		padding-top: 20px;
		.header-delivery{
			text-transform: uppercase;
			position: absolute;
			font-size: 14px;
			width: 180px;
			.icon-truck{
				font-size: 2em;
				position: absolute;	
				left: -5px;
				top:15px;
			}
		}
		.header-wrapper{
			.header-nav-left{
				padding-right: 50px
			}
			.header-nav-right{
				padding-left: 50px
			}
		}
		.header-right{
			position: absolute;
			top: 20px;
			right: 0;
			.header-user,.header-cart{
				display: inline-block;
				padding: 10px;
				cursor: pointer;
			}
		}
	}
}
//Logo
.logo{
	width: 100px;
	position: absolute;
	margin: 0 auto;
	left: 46%;
	top:5px;
	font-size: 1.3em;
	.texto-1{
		font-size: 0;
	}
	.img-logo{
		width: 90%;
		margin: 0 auto;
	}
}
.header-nav ul{
	display: inline-block;
	padding-bottom: 20px;
	a{
		font-size: 14px;
		font-weight: 600;
		text-transform: uppercase;
		border-bottom: 2px solid transparent;
		&:hover{
			border-bottom: 2px solid #111;
		}
	}
}
.header-nav-left,.header-nav-right{
	width: 50%
}
.nav-menu li{
	display: inline-block;
}
</style>
