/* eslint-disable */
import { login } from '@/api/login'
import { getUserInfo ,getUserDetailById} from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
		userInfo: {},
		hrassTime:0
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
		},
		REMOVE_TOKEN(state) {
			state.token = null
		},
		SRT_HRASS_TIME(state, hrassTime) {
			state.hrassTime = hrassTime
		}
	},
		actions: {
			async loginAction({ commit }, lodinData) {
				// 接口
				const data = await login(lodinData)
				// console.log(data)
				commit('SET_TOKEN', data)
				commit('SRT_HRASS_TIME',new Date().getTime())
			},
			async getUserInfo({ commit }) {
				// 接口请求
				const res = await getUserInfo()// result就是用户的基本资料
				const res1 = await getUserDetailById(res.userId)// 为了获取头像
				const result = { ...res, ...res1 }
				// console.log(res)
				commit('SET_USERINFO', result)// 提交mutations
				// return res
				return JSON.parse(JSON.stringify(result))
			},
			logout({ commit}) {
				commit('REMOVE_USERINFO')
				commit('REMOVE_TOKEN')
			}
		}
}
