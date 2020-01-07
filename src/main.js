// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './interceptor'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store' // 引入Vue对象

//阿里巴巴字体
import  './assets/css/iconfont/iconfont.js'
import  './assets/css/iconfont/icon.css'
Vue.use(ElementUI)
Vue.config.productionTip = false // 阻止生产模式的消息
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:9000/'
axios.defaults.headers['token']= store.state.token
Vue.prototype.$qs = qs;
new Vue({
  router, // router实例注入到vue实例中
  store,
  el: '#app',
  components: { App }, // 组件
  template: '<App/>' // 模块内容
})
