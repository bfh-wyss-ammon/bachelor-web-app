<template>
  <div>
    <md-theme md-name="authority">
      <top-bar :title="'Accounts'"></top-bar>

      <md-tabs ref="tabs">
        <md-tab id="overview" md-label="Overview" md-accent>
          <account-list :users="users"></account-list>
        </md-tab>
        <md-tab md-label="New">
          <account-new v-on:created="accountCreated"></account-new>
        </md-tab>
      </md-tabs>
    </md-theme>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  import {AuthorityHttp} from '../main'

  export default {
    name: 'settings',
    data() {
      return {
        users: []
      }
    },
    methods: {
      accountCreated(user) {
        this.users.push(user);

      }
    },
    created() {
      console.log(AuthorityHttp);
      AuthorityHttp.get('/users').then((res) => {
        this.users = res.data
      }, (error) => {
        MessageBus.$emit('on-error', error);
      })
    }
  }
</script>
<style scoped>
</style>
