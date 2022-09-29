/* eslint-disable */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username, // 建立用户名称的映射
	userId: state => state.user.userInfo.userId,
	staffPhoto: state => state.user.userInfo.staffPhoto,
	hrassTime: state => state.user.hrassTime,
	companyId: state => state.user.userInfo.companyId
}
export default getters
