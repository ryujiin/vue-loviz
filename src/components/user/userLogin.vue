<template lang="pug">
	.header-user
		.no-login(v-if="getuserPerfil.id === 0")
			span.icon-user(@click="activarModal")
			span(@click="activarModal") Login
		.is-login(v-else)
			span.icon-user
			router-link.texto-impacto.texto-2(:to={name:'perfil'})
				span Bienvenido, {{getuserPerfil.first_name}} {{getuserPerfil.last_name}}
		.modal(:class="{'is-active' : isActive}")
			.modal-background(@click="deactiveModal")
			.modal-card
				header.modal-card-head
					p.modal-card-title.has-text-centered Ingresar a Loviz DelCarpio
					button.delete(@click="deactiveModal")
				.modal-card-body
					.notification.is-danger.has-text-centered.is-small(:class="{'activo' : this.error.es_error}") {{error.mensaje}}
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

</template>

<script>
import lovizApiUserService from '@/services/user/lovizApiUser'

import {mapGetters,mapMutations} from 'vuex'

export default {
  computed:{
  	...mapGetters(['getuserToken','getuserPerfil'])
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
    ...mapMutations(['eliminarSession']),
  	activarModal(){
  		this.isActive=true;
  	},
  	deactiveModal(){
      if (this.isActive) {
        this.isActive=false;
        this.$router.push({name:'perfil'});  
      };  		
  	},
  	showNotification(){
  		this.user = '';
  		this.pass = '';
  		this.error.mensaje="Algo salio mal, vuelvalo a intentar mas tarde"
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
  			lovizApiUserService.getTokenUser(this.user,this.pass)
	  		.then(res =>{
	  			this.user="";
	  			this.pass="";
	  			this.setToken(res)
	  		})
  		}else{
  			this.showNotification();
  		}
  	},
  	setToken(res){
  		if (res.non_field_errors) {
  			this.showNotification();
  		};
  		if (res.token) {
  			localStorage.setItem('token',res.token);
				this.$store.commit('setUserToken',res.token);
  		}
  	},
  	getUserPerfil(){
  		const self = this;
  		lovizApiUserService.getPerfil(this.getuserToken)
  		.then(res =>{
  			if (res.detail) {
          this.$store.commit('eliminarSession');
  			}else{
					this.$store.commit('setUsuarioPerfil',res);
  			}
  			this.deactiveModal();
  		})
  	},
  },
  watch:{
  	'getuserToken':'getUserPerfil',
  }
}
</script>


<style lang="scss" scoped>
  .header-user{
  	color: #111;
		span{
			margin: 0 10px 0 0;
		}
		.notification{
			padding: 5px;
			margin-bottom: 5px;
			font-size: 1px;
			visibility: hidden;
		  opacity: 0;
		  transition: all 0.5s linear;
			&.activo{
				font-size: 15px;
				visibility: visible;
  			opacity: 1;
			}
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
</style>