<template lang="pug">
	.header-user
		.no-login(v-if="!renderUser")
			span.icon-user(@click="activarModal")
			span(@click="activarModal") Login
			.modal(:class="{'is-active' : isActive}")
				.modal-background(@click="deactiveModal")
				.modal-card
					header.modal-card-head
						p.modal-card-title.has-text-centered Ingresar a Loviz DelCarpio
						button.delete(@click="deactiveModal")
					.modal-card-body
						transition(name="fade")
							.notification.is-danger.has-text-centered(v-if="error.es_error") {{error.mensaje}}
						form.login-user(v-on:submit.prevent="enviando")
							.field
								label.label Usuario
								.control.has-icons-left.has-icons-right
									input.input(type="email",placeholder="mi_correo@gmail.com",v-model='user',ref='user')
							.field
								label.label Contraseña
								.control.has-icons-left.has-icons-right
									input.input(type="password",placeholder="********",v-model="pass")
							.botones
								button.button.is-large.is-success(type="succes") Ingresar
							.botones
								button.button.is-large.is-black Crear nuevo
		.is-login(v-else)
			span.icon-user
			router-link.texto-impacto.texto-2(:to={name:'perfil'})
				span Mi cuenta

</template>

<script>
import lovizApiUserService from '@/services/user/lovizApiUser'

import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
	computed:{
		...mapGetters(['getToken','getPerfil']),
		renderUser(){
			if (this.getPerfil.id) {
				return true
			}else{
				return false;
			}
		}
	},
	data () {
		return {
			isActive:false,
			user:'',
			pass:'',
			error:{
				mensaje:'',
				es_error:false,
			}
		}
	},
	created(){
		if (localStorage.getItem('token')) {
			this.$store.commit('setUserToken',localStorage.getItem('token'));  		
		};
	},
	methods:{
		...mapMutations(['eliminarSession','setPropietarioCart']),
		...mapActions(['buscarCartServerUser','buscarToken','getUserPerfil']),
		activarModal(){
			this.isActive=true;
		},
		deactiveModal(){
			if (this.isActive) {
				this.isActive=false;
			};  		
		},
		showNotification(texto){
			this.user = '';
			this.pass = '';
			this.error.mensaje=texto
			this.error.es_error = true;
			this.$refs.user.focus();       

			if (this.error.es_error) {
					setTimeout(()=>{
						this.error.es_error = false;
				}, 5000)
			};
		},
		enviando(){
			if (this.user && this.pass) {
				this.buscarToken({user:this.user,pass:this.pass})
				.then(res =>{
					if (res.non_field_errors) {
						this.showNotification('El usuario o contraseña no valida')
					}
				})		
				this.user="";
				this.pass="";
			}else{
				this.showNotification();
			}
		},
		setToken(res){
			if (res.non_field_errors) {
				this.showNotification("Algo salio mal, vuelvalo a intentar mas tarde");
			};
			if (res.token) {
				localStorage.setItem('token',res.token);
				this.$store.commit('setUserToken',res.token);
			}
		},
		getUserPerfil_mt(){
			if (this.getToken!=="") {
				this.getUserPerfil()
				.then(res =>{
					this.deactiveModal();
					//Coloco el id de usuario al carro
					this.setPropietarioCart(res.id)
					//this.$cookie.set('sesion_carro',res.sesion_carro,{ expires: '7d' });					
					this.buscarCartServerUser();
					this.$router.push({name:'perfil'});
				})
			};
				
			
		},
	},
	watch:{
		'getToken':'getUserPerfil_mt',
	}
}
</script>


<style lang="scss" scoped>
	.header-user{
		color: #111;
		font-size: 1.2em;
		span{
			margin: 0 10px 0 0;
		}
	}
	.botones{
		padding: 10px;
		.button{
			width: 100%;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: 16px;
			line-height: 18px;
		}
	}
	.notification{
		font-size: 0.5em;
		padding: 5px;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0
	}
</style>