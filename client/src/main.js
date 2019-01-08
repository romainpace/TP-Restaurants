import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import Restaurants from "./components/Restaurants.vue";


Vue.use(VueRouter);

const routes =
[
  { path: "/restaurants", component: Restaurants },
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
