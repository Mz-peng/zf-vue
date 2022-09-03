<template>
  <div>
    首页 {{name}}
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  /**
   * beforeCreate created 才会在服务端执行
   * 在服务端请求数据
   * 服务端和客户端都执行
   * 在服务端执行 通过服务端获取数据
   * 在客户端执行 ajax 会把返回的结果 合并到data上
   * asyncData 只在页面组件中才有
   * @param context
   * @returns {{}}
   */
  async asyncData(context) {
    console.log(context)
    let { $axios } = context
    let res = await $axios.get("http://127.0.0.1:4523/m1/1518216-0-default/api/user");
    return {
      name: res.name
    }
  },
  /**
   * fetch 他不用返回结果 服务端和客户端都执行
   * 一般只操作vuex使用
   */
  fetch() {

  },
  middleware: 'page',
  // mounted 等待dom加载完成 在浏览器
  mounted() {
    console.log(process.env.baseUrl)
    // 进度条 要等待 加载完成才能执行
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1000)
    })
  }
}
</script>
