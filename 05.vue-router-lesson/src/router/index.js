import Vue from "vue";
import VueRouter from "vue-router";

/**
 * Vue.component() router-link router-view
 */
Vue.use(VueRouter);

import Routes from "./../router/routes";

/**
 * hash history
 */
export default new VueRouter({
  mode: "hash",
  routes: Routes,
});
