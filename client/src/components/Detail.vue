<template>
<div class="detail">
<p>Adresse : {{building}}, {{street}} {{zipcode}} {{borough}} </p>
</div>
              
</template>

<script>
export default {
 /* name: "app",*/
  data() {
    return {
      restau : {},
      cuisine: '',
      borough: '',
      building: '',
      street : '',
      zipcode : '',
    }
},
/*  created(){
    bus.$on('restau',(restau) => {
      this.$resource('restaurants{/id}').get({id:restau}).then((response)=> {
        this.detail = response.data[0]
      }, (response) => {
        console.log('erreur', response)
      })
    })
  }*/

}
    
</script>

<style>

</style>

