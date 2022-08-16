import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast/index'

// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线，利用原型添加这个方法$bus
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 安装Vue-lazyload图片懒加载插件
// Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
