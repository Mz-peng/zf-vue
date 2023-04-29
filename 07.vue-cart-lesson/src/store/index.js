import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import cart from '@/store/modules/cart'
import product from '@/store/modules/product'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vueLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
  modules: {
    cart,
    product,
  },
  plugins: [vueLocal.plugin, logger()],
})
