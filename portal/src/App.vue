<template>
  <div id="app">

    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Portal</h2>
    </md-toolbar>

    <md-sidenav class="md-left md-fixed md-theme-white" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h2 class="md-title">Menü</h2>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link exact to="/settings">settings</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      }
    }
  }
</script>

<style lang="scss">
</style>
