/**
 * 插件
 * @param context 上下文
 */
export default ({$axios, redirect}) => {
  /**
   * 请求拦截器
   */
  $axios.onRequest((config)  => {})

  /**
   * 响应拦截器
   */
  $axios.onResponse((res) => {
    // axios 配置返回结果
    return Promise.resolve(res.data)
  })
}
