import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/components/Account'
import Bot from '@/components/Bot'
import VirtualDrive from '@/components/VirtualDrive'
import Membership from '@/components/Membership'
import Group from '@/components/group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/accounts',
      name: 'accounts',
      component: Account
    },
    {
      path: '/membership',
      name: 'membership',
      component: Membership
    },
    {
      path: '/group',
      name: 'group',
      component: Group
    },
    {
      path: '/virtualdrive',
      name: 'virtualdrive',
      component: VirtualDrive
    },
    {
      path: '/bots',
      name: 'bots',
      component: Bot
    }
  ]
})
