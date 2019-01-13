import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import Restaurants from "./components/Restaurants.vue";
import Detail from "./components/Detail.vue";
import Carte from "./components/Carte.vue";
import AfficheMenu from "./components/AfficheMenu.vue";


Vue.use(VueRouter);

const routes =
[
  { path: "/restaurants", component: Restaurants },
  { path: "/detail/:id", component: Detail },
  { path: "/carte/", component: Carte },
  { path: "/menu/", component: AfficheMenu },
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

//Création du composant <app-restau-detail>
Vue.component("app-restau-detail", {
  props: ["building", "street", "zipcode", "borough"],
  template: '<p>Adresse : {{building}}, {{street}} {{zipcode}} {{borough}} </p> '
});

//Création du composant <app-menu-restau>
/*Vue.component("app-menu-restau", {
  props: ["building", "street", "zipcode", "borough"],
  template: '<p>Adresse : {{building}}, {{street}} {{zipcode}} {{borough}} </p>'
});*/

window.bus= new Vue();

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
