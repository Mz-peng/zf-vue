<template>
  <div>
    {{this.$store.state.count}}
    <button @click="incrementTen">等待两秒后减10</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";


export default {
  name: "CounterB",
  methods: {
    ...mapActions({
      minusTen: 'minusTen'
    }),
    incrementTen() {
      // this.$store.dispatch('minusTen', 10)
      this.minusTen(10)
    }
  }
};
</script>

<style scoped></style>
