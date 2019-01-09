<template>
  <div id="app">
     TEST VUE RESTAURANTS
	 
	 <h2>Ajouter un restaurant :</h2>
    <div id="app">
        <form id="ajoutFormulaire" v-on:submit="ajouterRestaurant">
            <label>
                Nom : <input type="text" name="nom" required v-model="nom">
            </label>
            <label>
                Cuisine : <input type="text" name="cuisine" required v-model="cuisine">
            </label>

            <button class="submit">Ajouter</button>
        </form>
        <p>
            <label>
            Recherche : 
            <input id="recherche"
                   type="text" 
                   v-on:input="chercherRestaurants"
                   v-model="name"
            >
            </label>
        </p>
<h1>Nombre de restaurants : {{nbRestaurants}}</h1>
 <div class="slide">
  <input v-on:input="slideBar" type="range" min="1" max="100" value="10" step=5 class="slider" id="myRange">
  <b id="demo"></b>
</div>       
 
<form id="formulairemodif" v-on:submit="modifierRestaurant">
                                    <label for="id">Id :</label>
                                    <input id="id" type="text" name="_id" v-model="formulaireRestaurant.id">
                             
                                    <label for="nom">Nom</label>
                                    <input id="nomrestaurant" type="text" name="nom" v-model="formulaireRestaurant.nom">
                            
                             
                                    <label for="cuisine">Cuisine</label>
                                    <input id="cuisine" type="text" name="cuisine" v-model="formulaireRestaurant.cuisine">
                             
                                <button class="submit">Valider</button>
                            </form>
        <table>
            <tr>
            	<!--<th>Id </th>-->
                <th>Nom</th>
                <th>Cuisine </th>
                <th>Delete</th>
                <th>Modifier</th>

            </tr>
            <tbody>
                <tr v-for="r,index in restaurants" v-bind:style="{backgroundColor:getColor(index)}"
                    v-bind:class="{bordureRouge:(index === 2)}">
                    <!--<td>{{r._id}}</td>-->
                    <td align="center">{{r.name}}</td>
                    <td align="center"> {{r.cuisine}}</td>
                    <td align="center">
                    	<button class="delete" v-on:click="supprimerRestaurant(r._id)">DELETE</button>
                    </td>
                    <td align="center">
                    	<button class="modifier" v-on:click="afficherFormulaire(r._id, r.name, r.cuisine)">Modifier</button>
                    	<!-- <button v-on:click="modifierRestaurant(r._id)">Modifier</button> -->
                    </td>
                    <td>
                    <router-link class="rl" :to="`/detail/${r._id}`">Detail</router-link> 
                </td>
                </tr>
            </tbody>
        </table>
        <br />
                
        <br />
        <div class="pagination">
        <button class="bouton" v-on:click="pagePrecedente">Précédent</button>
        <button class="boutonPage" v-on:click="firstPage">1</button>
        <button class="boutonPage">Page {{page+1}}</button>
        <button class="boutonPage" v-on:click="lastPage">{{dernierePage}}</button>
        <button class="bouton" v-on:click="pageSuivante">Suivant</button>
        </div>
    </div>
	 
  </div>
</template>

<script>
export default {
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
                }
            ],
            nom: '',
            cuisine: '',
            id: null,
            nbRestaurants:0,
            formulaireRestaurant:
            {
                id: null,
                nom: null,
                cuisine: null
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
            supprimerRestaurant(index) {
                //this.restaurants.splice(index, 1);
                //console.log();
                console.log(index);

                let url = "http://localhost:8080/api/restaurants/"+index;

                fetch(url, {
                        method: "DELETE",
                    })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
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
            ajouterRestaurant(event) {
                event.preventDefault();
                
                let form = event.target;
                console.log(form);
                
                let dataFormulaire = new FormData(form);
                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                        method: "POST",
                        body: dataFormulaire
                    })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
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
            modifierRestaurant(event)
            {
                event.preventDefault();

                let form = event.target;
                console.log(form);
                let dataFormulaire = new FormData(form);
                let id = form._id.value;
                
                console.log("ID vaut : " + id);

                let url = "http://localhost:8080/api/restaurants/"+id;
                //let url = "http://localhost:8080/api/restaurants/"+index;
                 fetch(url, {
                        method: "PUT",
                        body: dataFormulaire
                    })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                console.log(reponseJS.msg);
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                document.querySelector("#formulairemodif").style.display="none";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
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
                if (this.page>0)
                {
                    this.page--;
                    this.getRestaurantsFromServer();
                 }
            },
             firstPage()
            {
                this.page=0;
                this.getRestaurantsFromServer();
            },
            lastPage()
            {
                this.page=Math.floor(this.nbRestaurants / this.pagesize);
                this.getRestaurantsFromServer();
            },
            slideBar()
            {
               this.pagesize= document.querySelector("#myRange").value;
                this.getRestaurantsFromServer();
            },
            afficherFormulaire(index,nom,cuisine)
            {
                /*console.log("Test formulaire");
                console.log(index);*/
                document.querySelector("#formulairemodif").style.display="block";
                this.formulaireRestaurant.id=index;
                this.formulaireRestaurant.nom=nom;
                this.formulaireRestaurant.cuisine=cuisine;
                
                /*console.log(this.formulaireRestaurant.id);
                console.log(this.formulaireRestaurant.nom);*/
                
            },
            chercherRestaurants: _.debounce(function () {
                this.getRestaurantsFromServer();
            }, 500)}
}
</script>

<style>
table {
    border: 1px solid black;
    width: 100%;
    border-collapse: collapse;
}

tr,
td {
    border: 1px solid black;
}

td {
    padding: 5px;
}

tr:hover {
    background-color: yellow;
}
th {
    background-color: black;
    color: white;
}
#ajoutFormulaire{
    width: 50%;
    padding: 10px 15px;
    box-sizing: border-box;
}
#recherche{
    width: 50%;
    padding: 10px 15px;
}
input:invalid {
    background-color: pink;
}

input:valid {
    background-color: lightGreen;
}

.bouton {
	border:none;
    padding: 14px 40px;
	border-radius:8px;
	background:#d34836;
	font:bold 13px Arial;
	color:#fff;
    text-align: center;
}
.boutonPage{
    background-color: white;
    color: black;
    border: 2px solid #e7e7e7;
}
#formulairemodif{
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
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
    width: 20%;
    background-color: gray;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.delete {
  background-color: red; 
  color: white; 
  border-radius: 4px;
  border: 2px solid black;
}

.delete:hover {
  background-color: darkred;
  color: white;
}
.modifier {
  background-color: blue; 
  color: white; 
  border-radius: 4px;
  border: 2px solid black;
}

.modifier:hover {
  background-color: darkblue;
  color: white;
}
.pagination
{
    text-align: center;
}

</style>
