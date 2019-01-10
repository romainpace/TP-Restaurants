<template>
<div class="app">
<h3>La carte </h3>

<table>
      <tr class="title">
        <th>Entrées</th>
        <th>Prix (€)</th>
        <th>Description</th>
        <th>Quantité</th>
      </tr>
      <tbody>
        <tr class="content" v-for="e,index in listeEntree">

        <td>{{ e.entree }}</td>
        <td>{{ e.prix }}</td>
        <td>{{ e.description }}</td>
        <td>
            <button v-on:click="incremente(index, listeEntree)">+</button>
            <button  v-on:click="decremente(index, listeEntree)">-</button>
            <input readonly type="number" name="quantite" min="0" max="50" v-bind:value=e.quantite>
        </td>

        </tr>
      </tbody>
    </table>

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
          ],
        /*  description [
          "Une salade toute simple",
          "Asperges à l'huile",
          "Crevettes avec un filet d'huile",
          ]*/
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
    total:0,
    }
  },
   mounted() {
            console.log("DETAIL VUE AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
            this.carteGenere(); 
        },
         methods :
    {
       getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?page=" +
                    this.page + "&pagesize=" +
                    this.pagesize + "&name=" +
                    this.name;

                fetch(url)
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                this.restaurants = reponseJS.data;
                                this.nbRestaurants = reponseJS.count;
                                this.dernierePage=Math.floor(this.nbRestaurants/this.pagesize);
                                console.log(reponseJS.msg);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
      carteGenere() {
        var random;
        var entre = "";
        var carte = {};
        var prix = 0;

        for(var i= 0; i < 5; i++){
            random = Math.floor(Math.random() * Math.floor(3));
            entre = this.entrees.entree[random];
            prix = this.entrees.prix[random];
            carte = {'entree' : entre , 'prix': prix, quantite:0};
            this.listeEntree.push(carte);
        }
    },
    incremente(index, tab)
  {
        tab[index]['quantite']++;
        this.total = this.total + tab[index]['prix'];
    },
  decremente(index, tab)
  {
        if(tab[index].quantite > 0){
            tab[index].quantite--;
            this.total = this.total - tab[index]['prix'];
        }
    },
      
    }
 
};
</script>

<style>

</style>

