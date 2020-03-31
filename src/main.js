import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index'

Vue.prototype.$api = api
Object.defineProperty(Vue.prototype, "$api", {
  enumerable: false,
  configurable: false
})

// IE的兼容性处理
import 'babel-polyfill'

import '../src/assets/css/extra-elementUI.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
