<template lang="pug">
	.login
		transition(name="fade")
			.notification.is-danger.has-text-centered(v-if="error.es_error") {{error.mensaje}}
		form.login-user(v-on:submit.prevent="enviando")
			.field
				.control.has-icons-left.has-icons-right
					input.input(type="email",placeholder="Correo Electronico",v-model='user',ref='user')
					span.icon.is-small.is-left
						i.icon-mail
			.field
				.control.has-icons-left.has-icons-right
					input.input(type="password",placeholder="Contraseña",v-model="pass")
					span.icon.is-small.is-left
						i.icon-key
			.botones.has-text-centered
				button.button.is-medium.is-success(type="succes") Ingresar
</template>

<script>
import lovizApiUserService from '@/services/user/lovizApiUser'


import {mapGetters,mapMutations,mapActions} from 'vuex'

export default {
	computed:{
		...mapGetters(['getToken','getPerfil']),
	},
	data () {
		return {
			user:'',
			pass:'',
			error:{
				mensaje:'',
				es_error:false,
			}
		}
	},
	methods:{
		...mapMutations(['eliminarSession','setPropietarioCart','changeLoginModal']),
		...mapActions(['buscarCartServerUser','buscarToken','getUserPerfil']),
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
			this.$Progress.start();
			if (this.user && this.pass) {
				this.buscarToken({user:this.user,pass:this.pass})
				.then(res =>{
					if (res.non_field_errors) {
						this.$Progress.finish();
						this.showNotification('El usuario o contraseña no valida')
					}
				})		
				this.user="";
				this.pass="";
			}else{
				this.$Progress.finish();
				this.showNotification();
			}
		},
	},
	created(){
		if (this.getToken && !this.getPerfil.id) {
			this.getUserPerfil_mt();
		};
	},
}
</script>

<style lang="scss" scoped>
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