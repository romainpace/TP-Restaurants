<template>
<div class="app">
<h3>La carte </h3>
	</div>
</template>

<script>
export default {
 /* name: "app",*/
  data() {
    return {
    	listeEntree: [],
      listePlats:[],
      listeDesserts: [],
      entrees: {
          entree: [
            'salade',
            'asperges',
            'crevettes',
          ],
          prix: [
             5,
             6,
             7
          ]
      },
      plats: {
          plat: [
          'pâtes à la bolognaise',
          'endives au jambon',
          'Hachiss Parmentier',
          ],
          prix: [
              8,
              6,
              10
          ]
      },
      desserts: {
          dessert:[
          'Yaourt',
          'Gateau chocolat',
          'fruits',
          ],
          prix: [
             3,
             4,
             5
          ]
      },

      value_quantity:0,
    total:0,
    shoppingCart : []
    }
  },
   mounted() {
            console.log("DETAIL VUE AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
         methods :
    {
      
      
    }
 
};
</script>

<style>

</style>

