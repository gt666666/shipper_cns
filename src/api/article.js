import request from '@/utils/request'

export function login (data) { // 登录
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function getRoles (token) { // 获取用户基础信息
  return request({
    url: '/getRoles',
    method: 'post',
    params: { token }
  })
}
