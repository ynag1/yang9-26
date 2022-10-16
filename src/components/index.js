// import PageTools from './PageTools/index.vue'
// const components = [PageTools]
// 引入组件
// 把数据用数组收集起来
// Vue.use(plugin)
// plugin 对象 install属性==》会执行 install方法==》 第一个参数Vue
// 函数 被install 方法==》 会被执行函数 第一个参数 Vue
//  Vue.use()
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
// 		 	console.log(ele)
//       Vue.component(ele.name, ele)
//     })
//   }
// }
// 利用 require.context 实现组件自动注册
// require.context(路径，是否查看子目录，正则) ==》返回一个函数
// 返回的函数 有一个keys属性，对应也是一个方法，返回值 找到内容的路径
// 返回的函数 的作用 根据路径 找到对应的模块
import * as filters from '@/filters'// 过滤器的方法
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())// 路径
// console.log(fn('./Breadcrumb/index.vue'))// 根据路径查找模块
// 一次性导入所有的模块
const components = fn.keys().map(ele => {
  return fn(ele)
})
// console.log(components)
export default (Vue) => {
  components.forEach(ele => {
    // console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    // Vue.filter(过滤器的名字，过滤器的方法)
    // console.log(key)
    Vue.filter(key, filters[key])
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
