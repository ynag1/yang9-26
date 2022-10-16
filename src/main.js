/* eslint-disable */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import components from '@/components/index'
Vue.use(components)// 全局注册组件

import Print from 'vue-print-nb'
Vue.use(Print);

import * as directives from '@/directives'
Object.keys(directives).forEach(ele => {
	Vue.directive(ele, directives[ele])
})
// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
