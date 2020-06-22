import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router';
import Vuex from 'vuex';
import store from '@/store';
import VeeValidate from 'vee-validate';

Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
