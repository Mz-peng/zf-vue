import axios from 'axios'

// mock路径
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/1518216-0-default'

axios.interceptors.request.use((config) => config)
axios.interceptors.response.use((res) => res.data)

export default axios
