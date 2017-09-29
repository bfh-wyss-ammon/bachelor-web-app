import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/Settings'
import Default from '@/components/Default'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
