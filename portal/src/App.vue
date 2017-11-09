<template>
  <div id="app">
    <md-whiteframe id="sidebar">
      <md-toolbar>
        <h2 class="md-title" style="flex: 1">Menu</h2>
      </md-toolbar>
      <md-list id="menu">
        <md-list-item>
          <router-link exact to="/accounts">Accounts</router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact to="/group">Groups</router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact to="/bots">Bots</router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact to="/live">Live</router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact to="/livemap">Live Map</router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact to="/payments">Payments</router-link>
        </md-list-item>
      </md-list>
    </md-whiteframe>
    <md-whiteframe id="content">
      <router-view></router-view>
    </md-whiteframe>
    <message></message>
    <key-info></key-info>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data()  {
      return {
        vertical: 'bottom',
        horizontal: 'center',
        errorMessage: '',
        duration: 4000
      }
    },
    methods: {
      showError(message) {
        this.errorMessage = message;
        $refs.snackbar.open();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-tabs .md-tabs-content {
    display: none;
  }

  #app {
    display: -webkit-box;
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
    #sidebar {
      width: 200px;
    }
    #content {
      margin-left: 10px;
      width: 814px;
    }
  }

  .md-tab {
    padding: 0;
  }
</style>
