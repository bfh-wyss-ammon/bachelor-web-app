<template>
  <div id="app">
    <md-tabs md-fixed @change="tabChange">
      <md-tab id="users" md-label="Users">
      </md-tab>
      <md-tab id="membership" md-label="Membership">
      </md-tab>
      <md-tab id="group" md-label="Group">
      </md-tab>
    </md-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      tabChange(e) {
          let route = 'users';
          if(e == 1) {
              route = 'membership';
          }
        if(e == 2) {
          route = 'group';
        }
          this.$router.push(route);
      }
    }
  }
</script>

<style lang="scss">
  .page-tabs .md-tabs-content {
    display: none;
  }
</style>
