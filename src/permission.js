import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  //   console.log(to)
  //   console.log(from)
  //   next()
  // 1.判断token是否存在
  // 1.1 存在，处于登陆状态 是否处于登陆页 处于就跳首页 否则就放行
  // 1.2 不存在 不处于登陆状态 是否处于白名单 处于 就放行 否则登陆页
  if (store.getters.token) { // 有token 处于登陆状态
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else { // 没有登陆
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
