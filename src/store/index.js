import Vue from 'vue' // 导入所需要的Vue组件
import Vuex from 'vuex' // 导入所需要的VueX组件
import state from './state'
Vue.use(Vuex) // 表示当前的vue要使用Vuex组件
const store = new Vuex.Store({
  state
}) // 创建一个Vuex的存储对象
export default store // 导出一个对象，一个文件只允许导出一个对象
