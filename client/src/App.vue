<template>
  <div id="app">
   
 <router-link to="/restaurants">Restaurants</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
