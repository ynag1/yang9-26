// 引入axios
import request from '@/utils/request.js'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
