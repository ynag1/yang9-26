// process.env 获取当前环境的变量

// 实现对axios封装
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})
service.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 请求拦截器
service.interceptors.response.use(response => {
  // 1.考虑把哪些数据跑出去
  // 2.接口成功，并且 业务成功
  // 3.没有成功，Promise.reject 跑出错误
  // console.log(response)
  const { message, data, success } = response.data
  if (success) { // 业务逻辑是成功的
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
