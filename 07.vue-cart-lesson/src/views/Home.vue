<template>
  <div class="home">
    商品页面
    <ul>
      <li v-for="product in products" :key="product._id">
        <img :src="product.cartCover" alt="" />
        {{ product.cartName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '../store/mutation-types'

const { mapActions, mapState } = createNamespacedHelpers('product')

export default {
  name: 'HomeView',
  /**
   * vuex 属性、值放入computed中
   */
  computed: {
    ...mapState(['products']),
  },
  mounted() {
    // this.$store.dispatch('product/' + types.GET_PRODUCT_LIST)

    // localStore中有数据，则不去查询
    if (this.products.length === 0) {
      this[types.GET_PRODUCT_LIST]()
    }
  },
  methods: {
    // ...mapActions('product', [types.GET_PRODUCT_LIST]),
    ...mapActions([types.GET_PRODUCT_LIST]),
  },
}
</script>

<style lang="stylus">
ul
  li
    display flex
    img
      width 100px
      height 100px
</style>
