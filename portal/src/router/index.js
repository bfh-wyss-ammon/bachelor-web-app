import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/pages/Account'
import VirtualDrive from '@/components/VirtualDrive'
import Live from '@/pages/Live'
import Membership from '@/pages/Membership'
import Payment from '@/pages/Payment'
import Group from '@/pages/group'
import Default from '@/pages/Default'
import DisputeResolve from '@/pages/DisputeResolve'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Account
    },
    {
      path: '/membership',
      name: 'membership',
      component: Membership
    },{
      path: '/disputeresolve',
      name: 'disputeresolve',
      component: DisputeResolve
    },
    {
      path: '/groups',
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
