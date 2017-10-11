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
import * as VueGoogleMaps from 'vue2-google-maps'
import AccountList from '@/components/AccountList'
import BotList from '@/components/BotList'
import GroupList from '@/components/GroupList'
import GroupNew from '@/components/GroupNew'
import AccountNew from '@/components/AccountNew'
import BotNew from '@/components/BotNew'
import BotDetail from '@/components/BotDetail'
import KeyInfo from '@/components/KeyInfo'
import Message from '@/components/Message'
import moment from 'moment'

// a messageBugs
export const MessageBus = new Vue({});
export const KeyInfoBus = new Vue({});

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$baseURL = configuration.baseURL
Vue.prototype.$webSocketURL = configuration.webSocketURL
Vue.prototype.$botURL = configuration.botURL
axios.defaults.baseURL = Vue.prototype.$baseURL

// components
Vue.component('AccountList', AccountList)
Vue.component('AccountNew', AccountNew)
Vue.component('Message', Message)
Vue.component('GroupList', GroupList)
Vue.component('GroupNew', GroupNew)
Vue.component('KeyInfo', KeyInfo)
Vue.component('BotNew', BotNew)
Vue.component('BotList', BotList)
Vue.component('BotDetail', BotDetail)



Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: configuration.googleMapsKey,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {  App }
})
