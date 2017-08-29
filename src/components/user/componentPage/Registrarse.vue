<template lang="pug">
.registrarse
	transition(name="fade")
		.notification.is-danger.has-text-centered(v-if="error.es_error") {{error.mensaje}}
	form.register-user(v-on:submit.prevent="crear")
		.field
			.control.has-icons-left.has-icons-right
				input.input(type="text",placeholder="Nombre y Apellido",v-model='username',ref='username')
				span.icon.is-small.is-left
					i.icon-user
		.field
			.control.has-icons-left.has-icons-right
				input.input(type="email",placeholder="Correo Electronico",v-model='email',ref='email')
				span.icon.is-small.is-left
					i.icon-mail
		.field
			.control.has-icons-left.has-icons-right
				input.input(type="password",placeholder="Contraseña",v-model="pass")
				span.icon.is-small.is-left
					i.icon-key
		.botones.has-text-centered
			button.button.is-medium.is-success(type="succes") Registrarse
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
			username:'',
			nombre:'',
			apellido:'',
			email:'',			
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
		...mapActions(['buscarCartServerUser','buscarToken',]),
		showNotification(texto){
			this.error.mensaje=texto
			this.error.es_error = true;
			this.pass='';
			this.$refs.username.focus();       

			if (this.error.es_error) {
					setTimeout(()=>{
						this.error.es_error = false;
				}, 5000)
			};
		},
		isCreado(cuenta){
			this.buscarToken({user:cuenta.email,pass:cuenta.pass})
			.then(res =>{
				console.log(cuenta)
			})
		},
		crear(){
			if (this.username && this.pass && this.email) {
				this.$Progress.start();
				let arreglonombre = this.username.split(' ', 2);
				const cuenta = {
					username: this.email,
					email:this.email,
					nombre: arreglonombre[0],
					apellido: arreglonombre[1],
					pass:this.pass
				}
				if (!cuenta.apellido) {
					cuenta.apellido = ''
				};
				lovizApiUserService.crearUser(cuenta)
				.then(res =>{
					this.$Progress.finish();
					if (res.creado) {
						this.isCreado(cuenta)
					}else{
						this.showNotification(res.detail)
					}
				})
			}else{
				this.showNotification('Todos los Campos son requeridos');
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.notification{
	font-size: 0.7em;
	padding: 5px;
}
</style>