import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

// 大家都可以默认访问的路由
export const defaultRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '*',
        component: () => import('@/components/404')
    }
]

// TODO 从后台查询所有路由
// 需要查看用户权限 来动态添加路由
export const authRoutes = [
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/components/menu/cart'),
        children: [
            {
                path: 'cart-list',
                name: 'cart-list',
                component: () => import('@/components/menu/cartList'),
                children: [
                    {
                        path: 'lottery',
                        name: 'lottery',
                        component: () => import('@/components/menu/lottery'),
                    },
                    {
                        path: 'product',
                        name: 'product',
                        component: () => import('@/components/menu/product'),
                    },
                ]
            }
        ]
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/components/menu/profile'),
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('@/components/menu/shop'),
    },
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes
})
