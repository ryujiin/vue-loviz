<template lang="pug">
	.header-user
		.no-login(v-if="!renderUser")
			span.icon-user(@click="changeLoginModal(true)")
			span(@click="changeLoginModal(true)") Login
			.modal(:class="{'is-active' : getUserLogin.isModal}")
				.modal-background(@click="changeLoginModal(false)")
				.modal-content
					.modal-body
						.tabs.is-centered.is-large
							ul
								li(:class="{'is-active':tabs=='login'}")
									a(@click="cambiar('login')") Ingresar
								li(:class="{'is-active':tabs=='register'}")
									a(@click="cambiar('register')") Registrarse
						transition(name="fade" mode="out-in")
							lv-login(v-if="tabs=='login'")
							lv-registrarse(v-else)
		.is-login(v-else)
			span.icon-user
			router-link.texto-impacto.texto-2(:to={name:'perfil'})
				span {{getPerfil.first_name}} {{getPerfil.last_name}}

</template>

<script>
import lovizApiUserService from '@/services/user/lovizApiUser'

import LvLogin from '@/components/user/componentPage/Login.vue'
import LvRegistrarse from '@/components/user/componentPage/Registrarse.vue'

import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
	components:{
		LvLogin,LvRegistrarse
  },
	data () {
		return {
			tabs:'login',
		}
	},
	computed:{
		...mapGetters(['getToken','getPerfil','getUserLogin',]),
		renderUser(){
			if (this.getPerfil.id) {
				return true
			}else{
				return false;
			}
		}
	},
	methods:{
		...mapMutations(['eliminarSession','setPropietarioCart','changeLoginModal']),
		...mapActions(['buscarCartServerUser','buscarToken','getUserPerfil']),
		cambiar(tabs){
			this.tabs = tabs;
		},
		getUserPerfil_mt(){
			if (this.getToken!=="") {
				this.getUserPerfil()
				.then(res =>{
					this.changeLoginModal(false);
					this.$Progress.finish();
					//Coloco el id de usuario al carro
					this.setPropietarioCart(res.id)
					//this.$cookie.set('sesion_carro',res.sesion_carro,{ expires: '7d' });					
					this.buscarCartServerUser();
				})
			};			
		},
		goToPerfil(){
			if (!this.getUserLogin.isModal) {
				if (this.getPerfil.id) {
					this.$router.push({name:'perfil'});
				};
			};
		}
	},
	watch:{
		'getToken':'getUserPerfil_mt',
		'getUserLogin.isModal':'goToPerfil'
	}
}
</script>


<style lang="scss" scoped>
	.header-user{
		font-size: 1.2em;
		span{
			margin: 0 10px 0 0;
		}
	}
	.modal{
		.modal-content{
			background: #fff;
			border-radius: 5px;
			width: 470px;
			.modal-body{
				padding: 5px 15px 15px;
			}
		}
		.tabs{
			ul{
				border-bottom-color:#fff;
			}
		}
		.progress{
			border-radius: 2px;
			height: .5rem;
		}
	}
.main-header{
	&.ishome{
		a{
			color: #fff;
			transition:all 0.25s;
		}
		&:hover{
			a{
				color: #111;
			}
		}
		&.activo{
			a{
				color: #111;
			}
		}
	}
}

//Efectos
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>