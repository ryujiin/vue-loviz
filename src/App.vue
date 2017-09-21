<template lang="pug">
  #app
    vue-progress-bar
    lv-cart-slide
    .contenido(:class="{ cartSlideActivo: getCartSlide }")
      .bg_cartSlide(@click="ocultarCartSlide")
      lv-header
      router-view
      pm-footer  
</template>

<script>

import PmFooter from '@/components/layaout/Footer.vue'
import LvHeader from '@/components/layaout/Header.vue'
import LvCartSlide from '@/components/layaout/CartSlide.vue'

import lovizApiCmsService from '@/services/lovizcms'

import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'app',
  components:{
    PmFooter,LvHeader,LvCartSlide
  },
  computed:{
    ...mapGetters(['getCartSlide'])
  },
  methods:{
    ...mapMutations(['ocultarCartSlide','changeCssHome']),
    crearTokeUser(){
      if (localStorage.getItem('token')) {
        this.$store.commit('setUserToken',localStorage.getItem('token'));     
      };
    },
    ishome(){
      if (this.$route.name === 'home') {
        this.changeCssHome(true)
      }else{
        this.changeCssHome(false)
      }
    }
  },
  mounted(){
    this.crearTokeUser();
    this.ishome();
  },
  watch:{
    '$route':'ishome'
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .resultados{
    margin-top: 10px;
  }
  .contenido{
    transition: all .5s;
    margin-right: 0;
    &.cartSlideActivo{
      margin-right: 250px;
      .bg_cartSlide{
        opacity: 1;
        z-index:101;
        background-color: rgba(0,0,0,0.5);
        content: '';
        height: 100%;
        width: 100%;
        position: fixed;
      }
    }
    .bg_cartSlide{
      opacity: 0;
      width: 0%;
      height:0%;
      position: fixed;
    }
  }
</style>
