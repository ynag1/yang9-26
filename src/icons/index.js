import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// req函数 ==》 根据路径 对应的模块 导入进来

// 函数会返回一个keys方法
// console.log(req.keys())
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
console.log(requireAll(req))
