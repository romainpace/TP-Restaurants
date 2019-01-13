<template>
  <div id="app">
<app-menu-restaurant></app-menu-restaurant>

  </div>
</template>

<script>
	import Carte from './Carte.vue';
export default {
  data () {
    return {

    }
  },
      	components: {
  		'app-menu-restaurant': Carte
}
}
</script>

<style>

</style>
