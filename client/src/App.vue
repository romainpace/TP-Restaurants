<template>
  <div id="app">

 <router-link to="/restaurants">Restaurants</router-link> 
<!--  <router-link to="/detail">Details</router-link> -->
<!-- <app-restaurant></app-restaurant> -->
    <router-view></router-view>

  </div>
</template>

<script>
	import Restaurants from './components/Restaurants.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
/*  components:{
  	'app-restaurant' : Restaurants
  }*/
}
</script>

<style>

</style>
