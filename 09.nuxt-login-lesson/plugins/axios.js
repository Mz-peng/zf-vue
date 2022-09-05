export default (context) => {
  const { $axios } = context
  $axios.onResponse((response) => {
    return Promise.resolve(response.data)
  })
}
