import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: function (h) {
    return h(App);
  },
  // this.$route 放的都是属性 this.$router 放的都是方法
  router,
}).$mount("#app");
