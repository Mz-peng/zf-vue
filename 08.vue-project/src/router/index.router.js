export default [{
    path: '/',
    component: () => import(/*webpackChunkName:'home'*/'@/views/Home.vue')
},{
    path: '*',  // 这个 * 会被处理到当前所有路由的最后面
    component: () => import(/*webpackChunkName:'404'*/'@/views/404.vue')
}]
