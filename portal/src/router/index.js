import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/components/Account'
import VirtualDrive from '@/components/VirtualDrive'
import Live from '@/components/Live'
import Membership from '@/components/Membership'
import Group from '@/components/group'
import Payment from '@/components/Payment'

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
      path: '/live',
      name: 'live',
      component: Live
    },
    {
      path: '/payments',
      name: 'payment',
      component: Payment
    },
  ]
})
