import router from './router'
import store from './store'
import {Message} from 'element-ui'
import {mapGetters, mapActions} from 'vuex' // 导入所有的getters、actions操作
//路由拦截
// beforeEach函数有三个参数：
// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,回调
router.beforeEach(async (to, from, next) => {
  //如果是登录页
  if (to.path == '/login') {
    next() //不处理任何拦截
  } else {
    const roles = store && store.getters.roles&&store.getters.roles.length>0 //sessionStorage  中获取角色信息
    if (roles) {
      next() // 如果有角色，就跳出拦截
    } else {
      try {  //捕获异常
        const  roles  =await store.dispatch('GetInfo')// 获取角色
        //通过角色去过滤模块
        const accessRoutes = await store.dispatch('GenerateRoutes',roles)  //角色过滤
        router.addRoutes(accessRoutes)  //动态路由
        next({...to})
      } catch (error) {
        next({path: '/login'})
      }
    }
  }
})
