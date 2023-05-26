import Vue from "vue";
import VueRouter from "vue-router";
import hooks from "@/router/hooks";

Vue.use(VueRouter);

// 入口文件
// 像前端的读写文件   路径 读取的子目录
const files = require.context("./", false, /\.router.js$/);
const routes = [];

console.log("files", files.keys());
files.keys().forEach((key) => {
    console.log(files(key).default);
    routes.push(...files(key).default);
});
console.log("routes", routes);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

Object.values(hooks).forEach((hook) => {
    router.beforeEach(hook.bind(router)); //将this绑定成router
});

export default router;
