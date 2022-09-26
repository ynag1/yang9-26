// 引入axios
import request from '@/utils/request.js'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
