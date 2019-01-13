<template>
<div class="app">
<h3>La carte </h3>
<app-entree-menu></app-entree-menu>



    <table>
      <tr class="title">
        <th>Plat du jour</th>
        <th>Prix (€)</th>
       <th>Description</th>
        <!-- <th>Quantité</th> -->
      </tr>
      <tbody>
        <tr class="content" v-for="e,index in listePlats">

        <td align="center">{{ e.nom }}</td>
        <td align="center">{{ e.prix }}</td>
       <td align="center">{{ e.description }}</td>
       <!--  <td>
            <button v-on:click="incremente(index, entrees)">+</button>
            <button  v-on:click="decremente(index, entrees)">-</button>
            <input readonly type="number" name="quantite" min="0" max="50" v-bind:value=e.quantite>
        </td> -->

        </tr>
      </tbody>
    </table>

    <table>
      <tr class="title">
        <th>Desserts</th>
        <th>Prix (€)</th>
        <!-- <th>Description</th>
        <th>Quantité</th> -->
      </tr>
      <tbody>
        <tr class="content" v-for="e,index in listeDesserts">

        <td align="center">{{ e.nom }}</td>
        <td align="center">{{ e.prix }}</td>
        <!-- <td>{{ e.description }}</td> -->
        <td>
           <!--  <button v-on:click="incremente(index, entrees)">+</button>
            <button  v-on:click="decremente(index, entrees)">-</button>
            <input readonly type="number" name="quantite" min="0" max="50" v-bind:value=e.quantite> -->
        </td>

        </tr>
      </tbody>
    </table>


	</div>
</template>

<script>
import Entree from './Entree.vue';
export default {
 /* name: "app",*/
  data() {
    return {
/*      entrees: [{
    nom : "Salade",
    prix : 5,
    description : "Une salade toute simple",
      },
      {
        nom : "Asperges",
    prix : 6,
    description :  "Asperges à l'huile",
      },
      {
         nom : "Crevettes",
    prix : 7,
    description : "Crevettes avec un filet d'huile",
      }

      ],*/

      plats: [{
         nom : "pâtes à la bolognaise",
    prix : 8,
    description : "Des pâtes",
      },
      {
        nom : "endives au jambon",
    prix : 6,
    description :  "Des endives",
      },
      {
         nom : "Hachis Parmentier",
    prix : 8,
    description : "Hachis Parmentier du jour",
      }

      ],

      desserts: [{
         nom : "Yaourt",
    prix : 3,
    description : "A la vanille",
      },
      {
        nom : "Gateau chocolat",
    prix : 5,
    description :  "Fait maison",
      },
      {
         nom : "fruits",
    prix : 4,
    description : "salades de fruits",
      }
      ],
      carte : {},
      //listeEntrees : {},
      listePlats : {},
      listeDesserts : {}
}
},
 mounted() {
    console.log("AVANT AFFICHAGE");
    this.carteGenere();
    //this.getRestaurantsFromServer();
    },
methods:{
  carteGenere()
  {

    var carteR = {
   // entrees: [],
    plats: [],
    desserts: [],
    quantite: 0
  }

 // var tabEntree = new Array();
  var tabPlat = new Array();
    var tabDessert = new Array();

/*  var listeEntrees = entrees;
  var listePlats = plats;
  var listeDesserts = desserts;*/
  
  //let iRand = 0;
  var random=  Math.floor(Math.random() * Math.floor(3));
  //let randomPlat = null;

  //for(var i= 0; i < 2; i++){
    /*var a = carte.entrees.push("test");
    carte.plats.push(this.plats[random]);
    carte.desserts.push(this.desserts[random]);*/
   // tabEntree.push(this.entrees[random]);
    tabPlat.push(this.plats[random]);  
    tabDessert.push(this.plats[random]);  
    //carte.entrees.push()
   /* randomEntree = listeEntrees.splice(random, 1)[0];
    carte.entrees.push(randomEntree);

  randomPlat = listePlats.splice(random, 1)[0];
    carte.plats.push(randomPlat);

  randomDesserts = listeDesserts.splice(random, 1)[0];
    carte.entrees.push(randomDesserts);

    console.log("carte");*/
  //this.listeEntrees=tabEntree;
  this.listePlats=tabPlat;
  this.listeDesserts=tabDessert;

  //}


  //carteR= {'entrees' : tabEntree, 'plats' : tabPlat};
  this.carte=carteR;
 // return carte;
  },
/*  incremente(index, tab)
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
    },*/
},
components: {
  'app-entree-menu': Entree
}
 
};
</script>

<style>

</style>

