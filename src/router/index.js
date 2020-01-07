import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [   //常规配置
  {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/Login')
  },
  {
    path: '/',
    component: () => import('@/layout/Layout'),
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/Home'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
]

export const asyncRoutes = [   //异步路由
  {
    path: '/loan-input',   //loan-input  贷款申请 
    component: () => import('@/layout/Layout'),
    meta: {
      title: '雇员管理',
      roles: ['emp']
    },
    children: [
      {
        path: '/LoanInput',
        name:'LoanInput',
        component: () => import('@/views/loan-input/LoanInput'),
        meta: {
          title: '雇员增加'
        }
      },
      {
        path: '/zLoanInput',
        name:'zLoanInput',
        component: () => import('@/views/input-manager/AddInputManager'),
        meta: {
          title: '雇员增加'
        }
      }
    ]
  },
    {
      path: '/input-manager',  //input-manager申请管理
      component: () => import('@/layout/Layout'),
      meta: {
        title: '部门管理',
        roles: ['dept']
      },
      children: [
        {
          path: '/ListInputManager',
          name: 'ListInputManager',
          component: () => import('@/views/input-manager/ListInputManager'),
          meta: {
            title: '部门列表'
          }
        }, {
          path: '/AddInputManager',
          name: 'AddInputManager',
          component: () => import('@/views/input-manager/AddInputManager'),
          meta: {
            title: '部门增加'
          }
        }
      ]
    },
  { path: '*', redirect: '/login',meta: {title: '登录页面',roles:['login'] }}
]

export default new Router({
  routes: constantRoutes
})
// import Vue from 'vue'
// import Router from 'vue-router'
// // import HelloWorld from '@/components/HelloWorld'
// Vue.use(Router)
// export default new Router({
//   base:'/',
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/views/login/Login')
//     },
//     {
//       path: '/',  //首页
//       component: () => import('@/layout/Layout'),
//       redirect: '/home',
//       children: [
//         {
//           path: '/home',
//           name: 'home',
//           component: () => import('@/views/home/Home'),
//           meta: {
//             title: '首页',
//           }
//         }
//       ]
//     },
//     {
//       path: '/loan-input',    //贷款申请
//       component: () => import('@/layout/Layout'),
//       redirect: '/loan-input/loanInput',
//       children: [
//         {
//           path: 'loanInput',
//           name: 'loanInput',
//           component: () => import('@/views/loan-input/LoanInput'),
//           meta: {
//             title: '贷款申请',
//           }
//         }
//       ]
//     },
//     {
//       path: '/input-manager',    //申请管理
//       component: () => import('@/layout/Layout'),
//       children: [
//         {
//           path: '/AddInputManager',
//           name: 'AddInputManager',
//           component: () => import('@/views/input-manager/AddInputManager'),
//           meta: {
//             title: '申请管理 / 增加申请',
//           }
//         },
//         {
//           path: '/ListInputManager',
//           name: 'ListInputManager',
//           component: () => import('@/views/input-manager/ListInputManager'),
//           meta: {
//             title: '申请管理 / 申请列表'
//           }
//         }
//       ]
//     }, {
//       path: '/loan-manager',    //贷款管理
//       component: () => import('@/layout/Layout'),
//       meta: {
//         title: '贷款审批'
//       },
//       children: [
//         {
//           path: '/firstTrial',
//           name: 'firstTrial',
//           component: () => import('@/views/loan-manager/FirstTrial'),
//           meta: {
//             title: '贷款审批 / 初审'
//           }
//         },
//         {
//           path: '/lastInstance',
//           name: 'lastInstance',
//           component: () => import('@/views/loan-manager/LastInstance'),
//           meta: {
//             title: '贷款审批 / 终审'
//           }
//         }
//
//       ]
//     }
//   ]
// })
