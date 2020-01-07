import * as Types from './mutation-types' // 引用操作模块
import {asyncRoutes} from '@/router'
import {getToken} from '@/utils/cookie'
import {getRoles} from '@/api/article'

export default {
  setTokenAction ({commit}, newValue) {  //设置token
    commit(Types.TOKEN, newValue)
  },
  setRoles ({commit}, newValue) {     //设置角色
    commit(Types.ROLES, newValue)
  },
  setInfo ({commit}, newValue) {     //设置登录用户信息
    commit(Types.INFO, newValue)
  },
  GenerateRoutes ({commit}, roles) { // 角色数组['']
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('administrator')) { // 通过角色过滤路由
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles) // 不是管理员跟据meta过滤数据
      }
      commit(Types.ROUTES, accessedRoutes)   //保存路由信息到VUEX中
      resolve(accessedRoutes)
    })
  },
  GetInfo ({commit}) {
    return new Promise((resolve, reject) => {
      getRoles(getToken()).then(res => {
        const {data} = res
        commit(Types.ROLES, data.mRolesActions.allActions) //权限
        commit(Types.INFO,data.member)   //用户信息
        resolve(data.mRolesActions.allActions)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

function filterAsyncRoutes (routes, v) {
  const res = []
  let set = new Set()
  v.forEach(vo => {
    let role = vo.split(':')[0]
    set.add(role)          //角色添加
  })
  routes.forEach(route => {
    set.forEach(se => {
      let bool = se.includes(route.meta.roles[0])  // 判断路由中是否有角色值
      if (bool) {
        res.push(route)
      }
    })
  })
  return res
}
