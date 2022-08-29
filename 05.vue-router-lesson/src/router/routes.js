import Home from "./../views/Home";
import Profile from "./../views/Profile";
import User from "./../views/User";

export default [
  {
    path: "/",
    name: "home",
    components: {
      default: Home,
      logo: () => import("./../views/Logo"),
    },
    beforeEnter(to, from, next) {
      console.log("to");
      next();
    },
    meta: {
      // 缓存
      keepAlive: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    /**
     * 校验标识
     */
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: User,
    children: [
      {
        path: "add",
        // 路由懒加载
        component: () => import("./../views/UserAdd"),
      },
      {
        path: "",
        component: () => import("./../views/UserList"),
      },
      {
        path: "list",
        component: () => import("./../views/UserList"),
      },
      {
        path: "detail/:id",
        component: () => import("./../views/UserDetail"),
      },
    ],
  },
  {
    path: "*",
    // 如果路径输入错误，重定向到首页
    redirect: { path: "/" },
  },
];
