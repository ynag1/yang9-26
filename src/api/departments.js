
// 引入axios
import request from '@/utils/request.js'
/**
 * 获取组织架构数据
 **/
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
/**
 *  新增部门接口
 *
 * ****/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
