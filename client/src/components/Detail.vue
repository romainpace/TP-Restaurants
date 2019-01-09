<template>
<div class="app">
<h3>Detail du restaurant : {{r['name']}}</h3>

   <app-restau-detail
			v-bind:building="a['building']"
			v-bind:street="a['street']"
			v-bind:zipcode="a['zipcode']"
			v-bind:borough="r['borough']"
		>
		</app-restau-detail>  

		<router-link class="button" :to="`/carte/${restaurant._id}`">Accèder à la carte</router-link>
		<!-- <app-restau-detail></app-restau-detail> -->
	</div>
</template>

<script>
export default {
 /* name: "app",*/
  data() {
    return {
    	restaurant: {},
      name: "",
      building: "",
      street: "",
      zipcode: "",
      borough: "",
      page:0,
      dernierePage:0,
      pagesize:10,
      idrest:0,
      r: {
        name: "",
        cuisine: "",
        borough: ""
      },
      a: {
        building: "",
        street: "",
        zipcode: ""
      },
    }
  },
   mounted() {
            console.log("DETAIL VUE AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
             console.log("DETAIL VUE APRES AFFICHAGE");
        },
    methods :
    {
    	 getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?page=" +
                    this.page + "&pagesize=" +
                    this.pagesize + "&name=" +
                    this.name;
                // let url = "http://localhost:4545/api/restaurants?idrest=" + "5c3640997e72870ec4b5016c";

                fetch(url)
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                this.restaurants = reponseJS.data;
                                this.nbRestaurants = reponseJS.count;
                                this.dernierePage=Math.floor(this.nbRestaurants/this.pagesize);
                                console.log(reponseJS.msg);
                            });





                            this.r["name"] = this.restaurant.name;
							this.r["borough"] = this.restaurant.borough;

						if( this.restaurant.address )
						{
							this.a["building"] = this.restaurant.address.building;
							this.a["street"] = this.restaurant.address.street;
		          			this.a["zipcode"] = this.restaurant.address.zipcode;
		        
						}
						console.log("LA RUE EST :" +this.a["building"]);
						console.log("LA Street EST :" +this.a["street"]);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
    	
    }


};
</script>

<style>

</style>

