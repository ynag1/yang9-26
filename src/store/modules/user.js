import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, lodinData) {
      // 接口
      const data = await login(lodinData)
      // console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // 接口请求
      const res = await getUserInfo()
      console.log(res)
      commit('SET_USERINFO', res)
      // return res
      return JSON.parse(JSON.stringify(res))
    }
  }
}
