<template lang="pug">
.contenido-general.box.metodo_envio
	.titulo Metodo de Envio
		.is-pulled-right(v-if="getPedido.metodoenvio")
			button.button.editar.is-ligh Editar
			span.icon-check.has-text-primary
	.content
		.metodo-elegido(v-if="getPedido.metodoenvio")
			p {{metodo_envioFormtar}}
		.metodos(v-if="getPedido.direccion_envio && !getPedido.metodoenvio")
			.cajas
				.caja(v-for="metodo in metodosEnvio" @click="selectMetodo(metodo.id)" :class="{'activo': formMetodo == metodo.id}")
					.icono(:class="[metodo.icono]")
					.contenido
						.nombre {{metodo.nombre}}
						.help {{metodo.descripcion}}
						.precio S/. {{metodo.precio}}
			.has-text-centered
				button.button.is-primary.is-medium(v-if="formMetodo" @click="enviarForm")
					span Siguente 								
					span.icon-chevron-thin-right
		p(v-if="!getPedido.direccion_envio") Tiene que elegir una direccion de envio

</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'

import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'


export default {
	components:{
	},
	data () {
	  return {
	  		metodosEnvio:{},
	  		formMetodo:null,
	 	}
  },
  computed:{
		...mapGetters(['getPerfil','getPedido']),
		metodo_envioFormtar(){
			let metodo = ''
			if (this.metodosEnvio.length==0) {
				this.buscar_metodos()
				return ''
			}else{
				const obj=this.metodosEnvio
				for(var index in obj) {
          if (obj[index].id == this.getPedido.metodoenvio) {
            metodo =`  ${obj[index].nombre} - S/.${obj[index].precio} `
          };
        }
				return metodo
			}
		}
  },
  methods:{
  	...mapActions(['editarPedido']),
  	buscar_metodos(){
  		if (this.getPedido.direccion_envio) {
  			lovizApiPedidoService.getMetodoEnvio()
  			.then(res =>{
	  			this.metodosEnvio = res
			})
  		};
  	},
  	selectMetodo(id){
  		this.formMetodo=id
  	},
  	enviarForm(){
  		const pedido = {
  			id:this.getPedido.id,
  			metodoenvio:this.formMetodo,
  		}
  		this.editarPedido(pedido)
  	}
  },
  watch:{
  	'getPedido':'buscar_metodos'
  }
}
</script>

<style lang="scss" scoped>
.metodo_envio{
	.metodos{
		.cajas{
			display: flex
		}
		.caja{
			margin: 5px;
			padding: 10px;
			width: 33%;
			border: 1px solid #ccc;
			position: relative;
			cursor: pointer;
			border-radius: 5px;
			&:hover{
				border-color: #3273dc;
			}
			&.activo{
				background-color: #3273dc;
				color: #fff
			}
			.icono{
				position: absolute;
			}
			.contenido{
				margin-left: 30px;

			}
		}
	}
}
</style>