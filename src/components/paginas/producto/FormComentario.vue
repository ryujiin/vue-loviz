<template lang="pug">
.modal(:class="{'is-active': getFormComent}")
	.modal-background(@click="verComentario(false)")
	.modal-content
		.comentario
			.imagen
				figure
					img(:src='producto.thum')
				.nombre {{producto.full_name}}
			.formulario
				h3.titulo Mi Comentario
				transition(name="fade" mode="out-in")
					.felicitaciones.has-text-centered(v-if="todoOk" key="is-ok")
						.icono
							i.icon-check-circle.has-text-success
						h1 Gracias Por su Comentario
						p.has-text-centered
							a.button.is-black(@click="verComentario(false)")
								span Seguir Comprando
					.campos_form(v-else key="is-false")
						.campo.field.is-horizontal.calificacion
							.field-label
								label.label Calificacion General
							.field-body
								.field.has-addons.estrellas
									p.control(v-for="s in star")
										a.button.is-medium(@mouseover="starOver(s.valor,s.texto)" 
																@mouseleave="starLeave"
																@click="valorar(s.valor,s.texto)"
																:class="{'over': diseno.valor>=s.valor,'activo': calificacion>=s.valor}")
											span.icon.is-small
												i.icon-star-full
									p.texto {{text_estrella}}
							.requerido.has-text-danger(v-if="this.enviado && this.calificacion <= 0")
								span.icon-x
								span Requerido
						.campo.field.body
							label.label ¡CUENTANOS MÁS!*
							.requerido.has-text-danger(v-if="this.enviado && this.body ==''")
								span.icon-x
								span Requerido
							.control
								textarea.textarea(placeholder='Ejemplo: Compré este hace un mes y estoy muy contento de haberlo hecho ...' 
																	v-model="body" rows=2 
																	:class="{'is-danger': formError.body}"  @keyup="veriBody")
								transition(name="fade")
									lv-form-upload-image(v-if="calificacion" :comentario="comentario")
						.campo.columns.is-multiline(v-if="getPerfil.id==0")
							.column.is-6
								.field
									label.label Nombre *
									.control
										input.input(type='text'
																placeholder='Nombre'
																:class="{'is-danger': formError.nombre}" v-model="nombre"
																@keyup="veriNombre")
										p.help.is-danger {{formError.nombre}}			
							.column.is-6
								.field
									label.label Apellido *
									.control
										input.input(type='text'
																placeholder='Nombre'
																:class="{'is-danger': formError.apellido}" v-model="apellido"
																@keyup="veriApellido")
										p.help.is-danger {{formError.apellido}}			
							.requerido.has-text-danger(v-if="this.enviado && !this.usuario")
								span.icon-x
								span Requerido {{usuario}}
							.column.is-12
								.field
									label.label Correo Electronico *
									.control
										input.input(type='email'
																placeholder='Correo Electronico' v-model="email" 
																:class="{'is-danger': formError.email}"
																@keyup="veriEmail")
										p.help.is-danger {{formError.email}}			
						p.small Puede recibir mensajes de correo electrónico con respecto a esta presentación. Cualquier correo electrónico incluirán la posibilidad de darse de baja de futuras comunicaciones.
						p.has-text-centered
							button.button.is-black(@click="onSubmit")
								.loader(v-if="enviando")
								span Enviar Comentario
</template>

<script>
import lovizApiProducto from '@/services/lovizapiProductos'
import lvFormUploadImage from '@/components/paginas/producto/forms/uploadImage.vue'

import {mapGetters,mapMutations} from 'vuex'

export default {
	components:{
		lvFormUploadImage
	},
  props: ['producto'],
  data() {
		return {
			comentario:{},
			calificacion:0,
			texto_calificacion:'',
			body:'',
			email:'',
			nombre:'',
			apellido:'',
			star:[
				{valor:1,texto:"Lo Odio!"},
				{valor:2,texto:"No me Gusta"},
				{valor:3,texto:"Esta Bien"},
				{valor:4,texto:"Me gusta"},
				{valor:5,texto:"Me Encanta!"},
			],
			diseno:{
				texto:'',
				valor:null,
			},
			formError:{
				titulo:'',
				body:false,
				recomendacion:'',
				email:'',
				nombre:'',
				apellido:'',
			},
			enviado:false,
			enviando:false,
			todoOk:false,
		}
	},
	computed:{
		...mapGetters(['getPerfil','getFormComent']),
		cuentaBody(){
			return this.body.length
		},
		usuario(){
			if (this.getPerfil.id) {
				return true
			}
			if (this.email) {
				let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (expr.test(this.email)){
					return true
				}
			}
			return false
		},
		text_estrella(){
			if (this.diseno.texto) {
				return this.diseno.texto
			};
			if (this.texto_calificacion) {
				return this.texto_calificacion
			};
			return ''
		}
	},
	methods:{
		...mapMutations(['verComentario']),
		onSubmit(){
			this.enviado = true;
			this.enviando = true;
			let verificado = this.verificar();
			if (verificado) {
				this.enviarServer();
			}else{
				this.enviando = false;				
			}
		},
		starOver(valor,texto){
			this.diseno.valor = valor;
			this.diseno.texto = texto;
		},
		starLeave(){
			this.diseno = {texto:'',valor:null}
		},

		valorar(valor,texto){
			this.calificacion = valor;
			this.texto_calificacion = texto;
			if (!this.comentario.id) {
				this.crearComentario();
			};
		},
		veriApellido(){
			if (this.apellido.length>1) {
				this.formError.apellido = ''
			}
		},
		veriNombre(){
			if (this.nombre.length>1) {
				this.formError.nombre = ''
			}
		},
		veriBody(){
			if (this.body.length>10) {
				this.formError.body = false
			}
		},
		veriEmail(){
			let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (expr.test(this.email)){
				this.formError.email = ''
			}
		},
		crearComentario(){
			const coment = {
				valoracion : this.calificacion,
				producto: this.producto.id,
			}
			lovizApiProducto.createComentarioProducto(coment)
			.then(res =>{
				this.comentario = res;
	  	});
		},
		enviarServer(){
			const coment = {
				id:this.comentario.id,
				valoracion : this.calificacion,
				comentario : this.body,
				producto: this.producto.id,
				email_invitado: this.email,
				recomendacion: this.recomendado,
				full_name_invitado: this.nombre,
				apellido_invitado	: this.apellido
			}
			lovizApiProducto.updateComentarioProducto(coment)
			.then(res =>{
				this.enviando = false;
				this.todoOk = true;
	  	});
		},
		selectRecomendado(valor){
			this.recomendado = valor
		},
		verificar(){
			let veri = true
			if (this.calificacion == 0 ) {
				veri = false
			};
			if (this.body.length < 10) {
				this.formError.body = true
				veri = false
			};
			if (!this.getPerfil.id) {
				if (!this.nombre) {
					this.formError.nombre = 'Este campo es necesario';
					veri = false;
				};
				if (!this.apellido) {
					this.formError.apellido = 'Este campo es necesario';
					veri = false;
				};
				if (!this.email) {
					this.formError.email = 'Ingrese un email valido';
					veri = false;
				};
			};			
			return veri
		}
	},
	watch:{
	}
}
</script>

<style lang="scss" scoped>
.modal-content{
	width: 800px;
}
.comentario{
	width: 100%;
	display: flex;
	.imagen{
		width: 25%;
		background-color: #333;
		padding: 10px;
		figure{
			margin-top: 10px;
			border-radius: 10px;
			background: #fff;
			padding-top: 10px;
		}
		.nombre{
			color: #fff;
			text-shadow: 2px 3px 1px #111;
		}
	}
	.formulario{
		width: 75%;
		padding:0 20px 10px;
		position: relative;
		.titulo{
			font-size: 1.5em;
			border-bottom: 1px solid #ccc;
			padding: 10px 0;
			margin-bottom: 5px;
		}
		label{
			font-weight: 500;
			font-family: 'BenchNine', sans-serif;
			letter-spacing: 1px;
			text-transform: uppercase;
		}
		.campo{
			position: relative;
			.requerido{
				position: absolute;
				top: 0px;
				right: 0px;
				font-size: 0.8em;
			}
		}
		.calificacion{
			padding: 5px 0;
			.field-label{
				flex-grow: 2;
				padding-top: 8px;
				text-align: left;
			}
			.texto{
				margin: 10px 0 0 40px;
			}
			.estrellas{
				.button{
					background: #e2e2e2;
					color: #fff;
					.icon{
						text-shadow:1px 1px 0 rgba(140,140,140,0.6);
					}
					&.over{
						background: #999;
					}
					&.activo{
						background: #111;
					}
				}				
			}
		}
		.recomendacion{
			.field-label{
				flex-grow: 6;
				padding-top: 8px;
				text-align: left;
			}
		}
		.small{
			font-size: 0.7em;
			color: #aaa;
			padding-bottom: 10px;
		}
	}
	.blur{
		position: absolute;
		top: 0;
	}
}
.imagenes_subidas{
	.file-label{
		width: 100%;
		text-align: center;
		.file-cta{
			border:1px darkblue dashed;
		}
	}
}
.felicitaciones{
	margin: 40px auto 40px;
	font-size: 1.5em
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
