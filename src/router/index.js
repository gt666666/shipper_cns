import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login')
    },
    {
      path: '/',  //首页
      component: () => import('@/layout/Layout'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/Home'),
          meta:{
            title:'首页'
          }
        }
      ]
    },
    {
      path: '/loan-input',    //贷款申请
      component: () => import('@/layout/Layout'),
      redirect: '/loan-input/loanInput',
      children: [
        {
          path: 'loanInput',
          name: 'loanInput',
          component: () => import('@/views/loan-input/LoanInput'),
          meta:{
            title:'贷款申请'
          }
        }
      ]
    },
    {
      path: '/input-manager',    //申请管理
      component: () => import('@/layout/Layout'),
      redirect: '/input-manager/inputManager',
      children: [
        {
          path: 'inputManager',
          name: 'inputManager',
          component: () => import('@/views/input-manager/inputManager'),
          meta:{
            title:'申请管理'
          }
        }
      ]
    },{
      path: '/loan-manager',    //贷款管理
      component: () => import('@/layout/Layout'),
      meta:{
        title:'贷款审批'
      },
      children: [
        {
          path: '/firstTrial',
          name: 'firstTrial',
          component: () => import('@/views/loan-manager/FirstTrial'),
          meta:{
            title:'贷款审批 / 初审'
          }
        },
        {
          path: '/lastInstance',
          name: 'lastInstance',
          component: () => import('@/views/loan-manager/LastInstance'),
          meta:{
            title:'贷款审批 / 终审'
          }
        }

      ]
    }
  ]
})
