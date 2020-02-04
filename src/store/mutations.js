import * as Types from './mutation-types' // 引用操作模块
import {constantRoutes} from '@/router'

export default {
  [Types.TOKEN] (state, val) {// 数据的修改操作
    state.token = val         //保存token
  },
  [Types.ROLES] (state, val) {// 数据的修改操作
    state.roles = val         //保存角色
  },
  [Types.ROUTES] (state, val) {// 数据的修改操作
    state.routes = constantRoutes.slice(1).concat(val)//去除登录的路由，保存动态路由。
  },
  [Types.INFO] (state, val) {// 登录用户信息
    state.info = val
  }
}
