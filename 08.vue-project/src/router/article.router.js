export default [
    {
        path: "/post",
        name: "post",
        component: () => import(/*webpackChunkName:'reg'*/ "@/views/article/Post.vue"),
        meta: {
            needLogin: true,
        },
    },
];
