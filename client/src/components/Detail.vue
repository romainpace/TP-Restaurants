<template>
<!-- <h3>Detail du restaurant : {{r['name']}}</h3> -->

   <app-restau-detail
			v-bind:building="a['building']"
			v-bind:street="a['street']"
			v-bind:zipcode="a['zipcode']"
			v-bind:borough="r['borough']"
		>
		</app-restau-detail>  
		<!-- <app-restau-detail></app-restau-detail> -->
</template>

<script>
export default {
  name: "app",
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

