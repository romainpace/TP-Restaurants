<template>
  <div id="app">
  	<table>
      <tr class="title">
        <th>Entrées</th>
        <th>Prix (€)</th>
        <th>Description</th>
        <th>Quantité</th>
      </tr>
      <tbody>
        <tr class="content" v-for="e,index in entrees">

        <td align="center">{{ e.nom }}</td>
        <td align="center">{{ e.prix }}</td>
        <td align="center">{{ e.description }}</td>
        <td align="center">
            <button v-on:click="incremente(index, entrees)">+</button>
            <button  v-on:click="decremente(index, entrees)">-</button>
            <input readonly type="number" name="quantite" min="0" max="50" v-bind:value=e.quantite>
        </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    	 entrees: [{
    nom : "Salade",
    prix : 5,
    description : "Une salade toute simple",
    quantite : 0
      },
      {
        nom : "Asperges",
    prix : 6,
    description :  "Asperges à l'huile",
    quantite : 0
      },
      {
         nom : "Crevettes",
    prix : 7,
    description : "Crevettes avec un filet d'huile",
    quantite : 0
      },

      ],
      }

    },
          methods:
      {
      	 incremente(index, tab)
  {
        tab[index]['quantite']++;
       // this.total = this.total + tab[index]['prix'];
    },
  decremente(index, tab)
  {
        if(tab[index].quantite > 0){
            tab[index].quantite--;
            //this.total = this.total - tab[index]['prix'];
        }
    },
},
  }

</script>

<style>
</style>
