import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

// 根据权限动态添加路由 (我们的路由要分成两部分 一部分是有权限 另一部分是没权限)

// 只要页面切换就执行的钩子
router.beforeEach(async (to, from, next) => {
  // 当前有没有获取过权限，如果获取过，就不用再获取了
  if (!store.state.hasRules) {
    // 获取权限
    // 去actions中获取数据
    await store.dispatch('getMenuList')
    let routes = await store.dispatch('getAuthRoute')
    router.addRoutes(routes)
    // 为了保证addRoutes添加成功后再跳转
    next({...to, replace: true})
  } else {
    // 如果已经获取了权限，就可以访问页面了
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
