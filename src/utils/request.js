/* eslint-disable indent */
// process.env 获取当前环境的变量
// 实现对axios封装
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
const Timeout = 3600
// 封装一个函数 队比时间是否超时
function IsCheckTimeOut() {
	const currenTime = new Date()// 接口真正调用的时候 时间2
	const timeStamp = (currenTime - store.getters.hrassTime) / 1000
	return timeStamp > Timeout// true 超时
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})
service.interceptors.request.use(config => {
  // console.log(config)
	if (store.getters.token) {
		// 再调用token的时候判断 时间2-时1 >token 超时的时间 ==登录失败
		if (IsCheckTimeOut()) {
			store.dispatch('user/logout')
			router.push('/login')// 超时返回login页面
			return Promise.reject(new Error('token 超时'))// 提示信息
		}
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
	console.log(error.response)
	if (error.response && error.response.status === 401) {
		store.dispatch('user/logout')
		router.push('/login')// 超时返回login页面
		Message.error('token  失效')
	} else {
		Message.error(error.message)
	}
  return Promise.reject(error)
})
export default service
