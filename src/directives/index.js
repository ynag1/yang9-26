/* eslint-disable */
export const imgerror = {
	// 什么时候去换图片得地址
	inserted(el, binding, vnode) {
		// console.log(el)// el DOM 
		// console.log(binding)// binding 当前指令得相关信息
		// console.log(vnode)// vnode 虚拟节点
		 // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
		el.onerror = function () {
		// 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容就是图片加载不出来得时候就会显示默认图片
			el.src=binding.value
		}
	}
	
}