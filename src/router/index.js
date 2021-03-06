import Vue from "vue";
import VueRouter from "vue-router";
import VueFullPage from 'vue-fullpage.js'
import Home from "../views/Home.vue";
import Guide from "../views/guide/Guide.vue";

Vue.use(VueRouter);
Vue.use(VueFullPage);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "Guide",
    component: Guide
  },
  {
    path: "/setup",
    name: "Setup",
    // route level code-splitting
    // this generates a separate chunk (setup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/setup/Setup.vue")
  },
  {
    path: "/congrats",
    name: "Congrats",
    // route level code-splitting
    // this generates a separate chunk (setup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/congrats/Congrats.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
