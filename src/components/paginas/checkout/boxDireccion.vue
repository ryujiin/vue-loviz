<template lang="pug">
.contenido-general.box.direccion
	.titulo Direccion de Envio
		.is-pulled-right.aparecer(:class="{'activo' : getPedido.direccion_envio}")
			button.button.editar.is-ligh Editar
			span.icon-check.has-text-primary
	.content
		.formulario(v-if="!getPedido.direccion_envio")
			p(v-if="hayDirecciones") No tiene Direcciones
			.direcciones-elegibles(v-else)
				.control
					.separador(v-if="direccion.distrito" v-for="direccion in getPerfil.direcciones")
						label.radio
							input(type='radio', name='direccion' v-model="direccion_envio" :value="direccion.id")
							|	{{direccion.direccion}}, {{direccion.departamento}}, {{direccion.provincia}}, {{direccion.distrito}}
			lv-add-direccion
			.has-text-centered
				button.button.is-primary.is-medium.aparecer(:class="{'activo' : direccion_envio}" , @click="enviarForm")
					span Siguente 								
					span.icon-chevron-thin-right
		.elegido(v-else)
			p
				span.icon-compass
				span {{direccion_elegida}}
</template>

<script>

import LvAddDireccion from '@/components/shared/addDireccion.vue'

import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
	components:{
		LvAddDireccion,
	},
	data () {
	  return {
	  	direccion_envio : null,
	 	}
  },
  computed:{
		...mapGetters(['getPerfil','getPedido']),  	
  	hayDirecciones(){
			if (this.getPerfil.id) {
				if (this.getPerfil.direcciones.length == 0) {
					return true
				}	
			}
			return false
		},
		direccion_elegida(){
			if (this.getPedido.direccion_envio) {
				let direccion = ''
				const obj=this.getPerfil.direcciones
				for(var index in obj) {
          if (obj[index].id == this.getPedido.direccion_envio) {
            direccion =`  ${obj[index].direccion}, ${obj[index].distrito}, ${obj[index].provincia}, ${obj[index].departamento}. `
          };
        }
				return direccion
			}else{
				return
			}
		}
  },
  methods:{
  	...mapActions(['editarPedido']),
  	enviarForm(){
  		const pedido = {
  			id:this.getPedido.id,
  			direccion_envio:this.direccion_envio,
  		}
  		this.editarPedido(pedido)
  	},
  }
}
</script>

<style lang="scss" scoped>
</style>