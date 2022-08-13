import Vue from "vue";
import App from "./App.vue";

new Vue({
  // 渲染函数 重要
  // 默认main文件中只支持render方法
  render: (h) => h(App),
}).$mount("#app");
