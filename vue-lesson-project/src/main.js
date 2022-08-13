import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.use(iView);

new Vue({
  // 渲染函数 重要
  // 默认main文件中只支持render方法
  render: (h) => h(App),
}).$mount("#app");
