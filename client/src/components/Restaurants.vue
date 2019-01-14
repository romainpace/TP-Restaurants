<template>
    <div id="app">
        <input id="RestBtn" type="button" class="submit" value="Ajouter un Restaurant" v-on:click="afficherAddModal">
        <br>
        <!-- Ajouter un restaurant -->
        <div id="addRestModal">
          <div class="modal-content">
            <span class="close" v-on:click="closeAddModal">&times;</span>
            <form id="ajoutFormulaire" v-on:submit="ajouterRestaurant" style="width:100%">
                <h2>Ajouter un restaurant :</h2>
                <label>Nom du restaurant</label>
                <input type="text" name="nom" required v-model="nom" placeholder="Ex. Wendy's">
                <label>Type de cuisine</label>
                <input type="text" name="cuisine" required v-model="cuisine" placeholder="Ex. American">

                <button class="submit" v-on:click="closeAddModal">Ajouter</button>
            </form>
          </div>
        </div>

        <label>Recherche : </label>
        <input id="recherche" type="text" v-on:input="chercherRestaurants" v-model="name">


        <h1>Nombre de restaurants : {{nbRestaurants}}</h1>
        <div class="slide">
          <input v-on:input="slideBar" type="range" min="1" max="100" value="10" step=5 class="slider" id="myRange">
          <b id="demo"></b>
        </div>

        <!-- Modifier Restaurant -->
        <div id="modifRestModal">
          <div class="modal-content">
            <span class="close" v-on:click="closeModifModal">&times;</span>
            <form v-on:submit="modifierRestaurant">
              <h2>Modifier le restaurant {{formulaireRestaurant.nom}} : </h2>
              <label for="id">ID :</label>
              <input id="id" type="text" name="_id" v-model="formulaireRestaurant.id">

              <label for="nom">Nom</label>
              <input id="nomrestaurant" type="text" name="nom" v-model="formulaireRestaurant.nom">


              <label for="cuisine">Cuisine</label>
              <input id="cuisine" type="text" name="cuisine" v-model="formulaireRestaurant.cuisine">
              <button class="submit" v-on:click="closeModifModal">Modifier</button>
            </form>
          </div>
        </div>
        <!-- Fin Modifier Restaurant -->
        <table>
          <thead>
            <tr>
                <th></th>
                <th>Nom</th>
                <th>Cuisine </th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="r,index in restaurants" v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}">
                <td align="center">
                  <i class="delete fas fa-times fa-lg" v-on:click="supprimerRestaurant(r._id)"></i>
                  <i class="modifier fas fa-edit fa-lg" v-on:click="afficherFormulaire(r._id, r.name, r.cuisine)"></i>
                  <i class="map fas fa-map-marked fa-lg" v-on:click="selectionRestaurant(r)"></i>
                </td>
                  <td align="center">{{r.name}}</td>
                  <td align="center"> {{r.cuisine}}</td>
              </tr>
          </tbody>
        </table>
        <br>
        <div id="detailRestModal">
          <div class="modal-content" id="detailsRestaurant">
            <span class="close" v-on:click="closeDetailModal">&times;</span>
            <h2>Adresse du restaurant : </h2>
            <app-restau-detail
            v-bind:borough="borough"
            v-bind:building="building"
            v-bind:street="street"
            v-bind:zipcode="zipcode"
            ></app-restau-detail>
            <router-link class="button" :to="`/menu/`">Accèder à la carte</router-link>
          </div>
        </div>
        <br />
        <div class="pagination">
        <button class="bouton" v-on:click="pagePrecedente">Précédent</button>
        <button class="boutonPage" v-on:click="firstPage">1</button>
        <button class="currentPage">{{page+1}}</button>
        <button class="boutonPage" v-on:click="lastPage">{{dernierePage}}</button>
        <button class="bouton" v-on:click="pageSuivante">Suivant</button>
        </div>
    </div>

</template>

<script>
import detail from './Detail.vue'
export default {
  components : {detail},
  name: 'app',
  data () {
    return {
      restaurants: [{
        nom: 'café de Paris',
        cuisine: 'Française'
      },
      {
        nom: 'Sun City Café',
        cuisine: 'Américaine'
      }],
      nom: '',
      cuisine: '',
      borough: '',
      building: '',
      street : '',
      zipcode : '',
      id: null,
      nbRestaurants:0,
      formulaireRestaurant:
      {
        id: null,
        nom: null,
        cuisine: null,
      },
      page:0,
      dernierePage:0,
      pagesize:10,
      name:""
    }
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
	methods: {
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?page=" +
      this.page + "&pagesize=" +
      this.pagesize + "&name=" +
      this.name;
      fetch(url).then((reponseJSON) => {
        reponseJSON.json().then((reponseJS) => {
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;
          this.dernierePage=Math.floor(this.nbRestaurants/this.pagesize)+1;
          console.log(reponseJS.msg);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    selectionRestaurant(r){
      bus.$emit('restau',r._id);
      this.borough=r.borough;
      this.building=r.address.building;
      this.street=r.address.street;
      this.zipcode=r.address.zipcode;
      document.querySelector("#detailRestModal").style.display="block";
    },
    supprimerRestaurant(index) {
      let url = "http://localhost:8080/api/restaurants/"+index;
      fetch(url, {method: "DELETE",}).then((reponseJSON) => {
        reponseJSON.json().then((reponseJS) => {
          this.getRestaurantsFromServer();
        });
      })
      .catch(function (err) {
        console.log(err);
      });

      this.nom = "";
      this.cuisine = "";
    },
    ajouterRestaurant(event) {
      event.preventDefault();
      let form = event.target;
      console.log(form);

      let dataFormulaire = new FormData(form);
      let url = "http://localhost:8080/api/restaurants";
      fetch(url, {
              method: "POST",
              body: dataFormulaire
      }).then((reponseJSON) => {
        reponseJSON.json().then((reponseJS) => {
          console.log(reponseJS.msg);
          this.getRestaurantsFromServer();
        });
      })
      .catch(function (err) {
        console.log(err);
      });

      this.nom = "";
      this.cuisine = "";
    },
    modifierRestaurant(event){
      event.preventDefault();

      let form = event.target;
      let dataFormulaire = new FormData(form);
      let id = form._id.value;
      let url = "http://localhost:8080/api/restaurants/"+id;
      fetch(url, {
        method: "PUT",
        body: dataFormulaire
      }).then((reponseJSON) => {
        reponseJSON.json().then((reponseJS) => {
          console.log(reponseJS.msg);
          this.getRestaurantsFromServer();
        });
      }).catch(function (err) {
        console.log(err);
      });
    },
    getColor(index) {
      return (index % 2) ? 'rgb(0,0,0,.05)' : '#FFFFFF';
    },
    afficherAddModal(){
      document.querySelector("#addRestModal").style.display = "block";
    },
    closeAddModal(){
      document.querySelector("#addRestModal").style.display = "none";
    },
    pageSuivante() {
      let NbPageMax=0;

      if(this.nbRestaurants%10 != 0){
          NbPageMax=(this.nbRestaurants - this.nbRestaurants%10)/10;
      }
      else{
          NbPageMax= (this.nbRestaurants)/9;
      }

      if (this.page < NbPageMax){
          this.page++;
          this.getRestaurantsFromServer();
      }
    },
    pagePrecedente() {
        if (this.page>0){
            this.page--;
            this.getRestaurantsFromServer();
         }
    },
    firstPage(){
      this.page=0;
      this.getRestaurantsFromServer();
    },
    lastPage(){
      this.page=Math.floor(this.nbRestaurants / this.pagesize);
      this.getRestaurantsFromServer();
    },
    slideBar(){
      this.pagesize= document.querySelector("#myRange").value;
      this.getRestaurantsFromServer();
    },
    afficherFormulaire(index,nom,cuisine){
      document.querySelector("#modifRestModal").style.display="block";
      this.formulaireRestaurant.id=index;
      this.formulaireRestaurant.nom=nom;
      this.formulaireRestaurant.cuisine=cuisine;
      console.log(this.formulaireRestaurant.nom);
    },
    closeModifModal(){
      document.querySelector("#modifRestModal").style.display = "none";
    },
    closeDetailModal(){
      document.querySelector("#detailRestModal").style.display = "none";
    },
    chercherRestaurants: _.debounce(function(){
      this.getRestaurantsFromServer();
    }, 500)
  }
}

</script>

<style>
body{
  font-family:arial;
  font-size:1rem;
}
table {
  width: 99%;
  border-collapse: collapse;
}

tr, td, th {
    border-top:1px solid #DEE2E6;
    border-bottom:1px solid #DEE2E6;
    padding: .75rem;
    text-align:left;
}

thead tr {
  border-bottom:2px solid #DEE2E6;
}

td {
    padding: .75rem;
}

#ajoutFormulaire{
  width: 50%;
  padding: 10px 15px;
  box-sizing: border-box;
}
#recherche{
  padding: 10px 15px;
}

.bouton{
  background-color: #FFFFFF;
  color:#000000;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin:0 2px 0 2px;
  outline:none;
}
.bouton:hover, .boutonPage:hover{
  background:linear-gradient(to bottom, #585858 0%, #111 100%);
  color:#FFFFFF;
  border-radius: 4px;
}
.boutonPage{
  background-color: white;
  color: black;
  font-size: 1rem;
  font-weight: 400;
  border:none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  outline:none;
}
.currentPage{
  background:linear-gradient(to bottom, #fff 0%, #dcdcdc 100%);
  border:1px solid #979797;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 1rem;
  outline:none;
}

input[type=text]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.submit {
  background-color: #007BFF;
  color:#FFFFFF;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.delete {
  color: red;
  cursor:pointer;
}
.modifier {
  color: #007BFF;
  cursor:pointer;
}
.map{
  color:rgb(65, 184, 131);
  cursor:pointer;
}

.pagination{
  text-align: center;
}
#RestBtn{
  margin:1rem 0;
}

#addRestModal, #modifRestModal, #detailRestModal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.5);
}
.modal-content {
  background-color: #FEFEFE;
  margin: auto;
  padding: 20px;
  border:1px solid rgba(0,0,0,.2);
  border-radius:.3rem;
  width: 80%;
}
#detailsRestaurant{
  width: 40%;
}
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover{
  color: #000;
  text-decoration: none;
}
</style>
