import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import router from './router';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App),
}).$mount('#app')
