import * as types from '../mutation-types'
import * as apis from '../../api'

export default {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {},
  mutations: {
    [types.GET_PRODUCT_LIST](state, products) {
      state.products = products
    },
  },
  actions: {
    async [types.GET_PRODUCT_LIST]({ commit }, payload) {
      console.log('product', commit, payload)
      apis.getProductList().then((res) => {
        console.log(res)
        const productList = res.carts
        console.log(productList)
        commit(types.GET_PRODUCT_LIST, productList)
      })
    },
  },
  modules: {},
}
