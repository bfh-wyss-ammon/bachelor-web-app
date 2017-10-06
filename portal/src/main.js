// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import configuration from './configuration.json'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$baseURL = configuration.baseURL
axios.defaults.baseURL = Vue.prototype.$baseURL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
