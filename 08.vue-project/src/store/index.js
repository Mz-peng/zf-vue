import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from "@/store/root.module";

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
    // 模块对应的内容
    let store = files(key).default
    console.log('store', key)
    let moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '')
    console.log('moduleName', moduleName)
    // 动态添加模块
    let modules = rootModule.modules = rootModule.modules || {}
    modules[moduleName] = store
    modules[moduleName].namespaced = true
})

let store = new Vuex.Store(rootModule)

export default store;
