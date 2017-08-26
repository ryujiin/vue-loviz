<template lang="pug">
	header.main-header(:class="{ activo: isActive }", @scroll="scrollBajando")
		.container
			#mobil-nav-button
			.header-delivery.has-text-centered
				router-link(:to={name:'home'})
					span.icon
						i.icon-truck.is-medium
					span.texto-impacto.texto-2 Envio Gratis por compras mayores S/.50.00
			router-link.logo-m(:to={name:'home'}) Loviz DC
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

export default {
	components:{
		LvUserLogin,LvCarroHeader
  },
  data () {
    return {
    	isActive:false,
    }
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
.main-header{
	position: fixed;
	height: 70px;
	width: 100%;
	z-index: 9;
	&.activo{
		background-color: #fff;
	}
}
.header-delivery{
	.icon-truck{
		font-size: 2em;
		position: absolute;	
		left: -5px;
		top:15px;
	}
	text-transform: uppercase;
	position: absolute;
	font-size: 14px;
	width: 180px
}
.logo-m{
	position: absolute;
	margin: 0 auto;
	left: 46%;
	font-size: 1.5em;
	top:5px;
}
.header-nav ul{
	display: inline-block;

	a{
		color: #111 !important;
		font-size: 14px;
		font-weight: 600;
	}
}
.header-nav-left{
	padding-right: 50px
}
.header-nav-right{
	padding-left: 50px
}
.header-nav-left,.header-nav-right{
	width: 50%
}
.nav-menu li{
	display: inline-block;
}
.header-right{
	position: absolute;
	top: 0;
	right: 0;
	font-size: 1.3em;
	.header-user,.header-cart{
		display: inline-block;
		padding: 10px;
		cursor: pointer;
		&:hover{
			color: #111;
		}
	}
}
</style>
