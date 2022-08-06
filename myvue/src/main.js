import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js'
import axios from 'axios'



Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios  // 定义全局

axios.defaults.baseURL = '/api'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
