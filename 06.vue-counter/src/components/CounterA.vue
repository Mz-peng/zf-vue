<template>
  <div>
    {{c}} {{a}}
    <button @click="addTen">点击</button>
    {{div}}
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
console.log(mapState(['count']))
console.log(mapMutations(['addTen']))


export default {
  name: "CounterA",
  data() {
    return {
      
    }
  },
  computed: {
    // mapState 更改名字用对象，如果不用更改名用数组
    // ...mapState(['count']),
    ...mapState({
      'c': 'count',
    }),
    ...mapState({a: s => s.a.a}),


    ...mapGetters(['div'])
  },
  methods: {
    ...mapMutations({
      mutate: 'addTen'
    }),
    addTen() {
      // 调用addTen这个mutation函数。并且传递参数10
      // this.$store.commit('addTen', 10)
      this.mutate(10)
    }
  }
};
</script>

<style scoped></style>
