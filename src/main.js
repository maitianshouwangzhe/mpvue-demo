import Vue from 'vue'
import store from './store'
import App from './app'

// 设置vue的提示功能关闭
Vue.config.productionTip = false

// 声明当前组件的类型为应用
App.mpType = 'app'


// 在挂载整个应用之前，使用vuex
// 将store对象放置在Vue的原型上，这样，每个实例都可以使用。
Vue.prototype.$store = store



// 生成应用的实例
const app = new Vue(App)
// 挂载整个应用，是整个应用生效
app.$mount()
