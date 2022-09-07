import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {authRoutes} from '@/router'

Vue.use(Vuex)

/**
 * 组装菜单树
 * @param menuList
 */
let formatMenuList = (menuList) => {
  let authList = []
  function recursion(pid) {
    return  menuList.filter(menu => {
      if (menu.pid === pid) {
        // 把后端返回的所有路径权限都放到数组中
        authList.push(menu.auth)
        let children = recursion(menu.id)
        menu.children = children.length > 0 ? children : null
        return true;
      }
    })
  }
  return  {menus: recursion(-1), auths: authList};
}

/**
 * 获取有权限的路由
 * @param auths
 * @returns {*}
 */
let getNeedRoute = (auths) => {
  console.log("getNeedRoute auths", auths)
  function recursion(authRoutes) {
    return authRoutes.filter(route => {
      if (auths.includes(route.name)) {
        // 如果有子路由，找到子路由继续看子路由的权限
        if (route.children) {
          route.children = recursion(route.children)
        }
        // 有权限就返回
        return true;
      }
    })
  }
  return recursion(authRoutes);
}

export default new Vuex.Store({
  state: {
    // 存放菜单的数据
    menuList: [],
    // iview 角色
    authList: [],
    // 表示没有获取过权限，获取完毕后，把状态改成 true
    hasRules: false
  },
  getters: {
  },
  mutations: {
    set_menuList(state, menus) {
      state.menuList = menus
    },
    set_authList(state, auths) {
      state.authList = auths
      state.hasRules = true
    },
  },
  actions: {
    /**
     * 获取所有权限的菜单
     * @param commit
     * @returns {Promise<void>}
     */
    async getMenuList({commit}) {
      let {data} = await axios.get('http://localhost:3000/getRole')
      let {menus, auths} = formatMenuList(data.menuList)
      console.log(menus, auths)
      commit('set_menuList', menus)
      commit('set_authList', auths)
    },
    /**
     * 获取所有权限的路由
     * @returns {Promise<({path: string, component: function(): Promise<{readonly default?: {name: string}}>, children: [{path: string, component: function(): Promise<{readonly default?: {name: string}}>, children: [{path: string, component: function(): Promise<{readonly default?: {name: string}}>, name: string}, {path: string, component: function(): Promise<{readonly default?: {name: string}}>, name: string}], name: string}], name: string}|{path: string, component: function(): Promise<{readonly default?: {name: string}}>, name: string}|{path: string, component: function(): Promise<{readonly default?: {name: string}}>, name: string})[]>}
     */
    async getAuthRoute({state, commit}) {
      let routes = getNeedRoute(state.authList);
      console.log('needRoutes', routes)
      return routes;
    }
  },
  modules: {
  }
})
