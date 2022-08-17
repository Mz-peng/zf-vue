<template>
  <div>
    <button @click="showMessage">点我弹层</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Message from './components/Message'

// 使用一个插件，我们内部需要提供一个install方法
Vue.use(Message, { duration: 1000 })

export default {
  mounted() {
    console.log('Message', this._info)
  },
  methods: {
    showMessage() {
      this.$message.info({
        message: 'hello',
        duration: 3000,
      })
    },
  },
}
</script>

<style lang="stylus"></style>
