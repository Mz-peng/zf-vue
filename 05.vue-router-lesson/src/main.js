import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";

Vue.use(ElementUI);
Vue.config.productionTip = false;

/**
 * 文档路径: https://router.vuejs.org/zh/introduction.html
 *
 * 完整的导航解析流程
 * 1.导航被触发。
 * 2.在失活的组件里调用 beforeRouteLeave 守卫。
 * 3.调用全局的 beforeEach 守卫。
 * 4.在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
 * 5.在路由配置里调用 beforeEnter。
 * 6.解析异步路由组件。
 * 7.在被激活的组件里调用 beforeRouteEnter。
 * 8.调用全局的 beforeResolve 守卫(2.5+)。
 * 9.导航被确认。
 * 10.调用全局的 afterEach 钩子。
 * 11.触发 DOM 更新。
 * 12.调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 */
// 导航守卫
router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  // 拿出所有匹配的去判断
  if (to.matched.some((n) => n.meta.needLogin)) {
    if (localStorage.getItem("login")) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

new Vue({
  render: function (h) {
    return h(App);
  },
  // this.$route 放的都是属性 this.$router 放的都是方法
  router,
}).$mount("#app");
