window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
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
            }, 500)
        }
    })
    
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value-1;

    slider.oninput = function() {
        output.innerHTML = this.value-1;
    }
    document.querySelector("#formulairemodif").style.display="none";
}