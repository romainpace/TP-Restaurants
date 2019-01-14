<template>
  <div id="app">

<!--  <router-link to="/restaurants">Restaurants</router-link> -->
<app-restau></app-restau>
<!--  <router-link to="/detail">Details</router-link> -->
    <router-view></router-view>

  </div>
</template>

<script>
	import Restaurants from './components/Restaurants.vue';
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components : {
  	'app-restau' : Restaurants
  }
}
</script>

<style>

</style>
