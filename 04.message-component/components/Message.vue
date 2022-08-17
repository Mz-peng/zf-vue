<template>
  <div class="message" v-if="messages.length">
    <div v-for="m in messages" :key="m.id">{{ m.message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    // 表示当前弹层的唯一标识
    this.id = 0
  },
  methods: {
    add(options) {
      // 每个弹层的id
      let id = this.id++
      let layer = { ...options, id }
      // 每增加一个就向数组中存放一个
      this.messages.push(layer)
      // 时间到了，将自己移除
      layer.timer = setTimeout(() => {
        this.remove(layer)
      }, options.duration)
    },
    remove(layer) {
      clearTimeout(layer.timer)
      this.messages = this.messages.filter((message) => message.id !== layer.id)
    },
  },
}
</script>

<style lang="stylus"></style>
