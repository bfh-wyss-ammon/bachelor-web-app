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
import GroupList from '@/components/GroupList'
import GroupNew from '@/components/GroupNew'
import AccountNew from '@/components/AccountNew'
import KeyInfo from '@/components/KeyInfo'
import Message from '@/components/Message'
import TopBar from '@/components/TopBar'
import moment from 'moment'

// a messageBugs
export const MessageBus = new Vue({});
export const KeyInfoBus = new Vue({});

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$authortiyWebSocketURL = `ws://${configuration.authorityURL}/sockets`;
Vue.prototype.$providerWebSocketURL = `ws://${configuration.providerURL}/sockets`;


export const AuthorityHttp = axios.create({
  baseURL: `http://${configuration.authorityURL}/api/protected`,
  timeout: 5000,
  headers: {'x-secure-token': '7596b176-c54a-11e7-abc4-cec278b6b50a'}
});

export const ProviderHttp = axios.create({
  baseURL: `http://${configuration.providerURL}/api/protected`,
  timeout: 5000,
  headers: {'x-secure-token': '9b8518f9-be03-4cba-a75c-18d73b0e395a'}
});

// components
Vue.component('AccountList', AccountList)
Vue.component('AccountNew', AccountNew)
Vue.component('Message', Message)
Vue.component('GroupList', GroupList)
Vue.component('GroupNew', GroupNew)
Vue.component('KeyInfo', KeyInfo)
Vue.component('TopBar', TopBar)

Vue.material.registerTheme({
  app: {
    primary: 'cyan'
  },
  authority: {
    primary: 'orange',
  },
  provider: {
    primary: 'green',
  }
})

Vue.filter('formatDate', function (value) {
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
  components: {App}
})
