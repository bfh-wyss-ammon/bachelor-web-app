import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Default from '@/components/Default'
import Membership from '@/components/Membership'
import Group from '@/components/group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'users',
      component: Users
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
    }
  ]
})
