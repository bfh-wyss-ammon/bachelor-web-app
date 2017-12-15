<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{title}}</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Men&uuml;</h3>
        </div>
        <md-list>
          <md-theme md-name="authority">
            <md-list-item>
              <md-icon>account_balance</md-icon>
              <span>Authority</span>

              <md-list-expand>
                <md-list>
                  <md-list-item class="md-inset">
                    <router-link exact to="/accounts">
                      <md-icon>account_box</md-icon>
                      <span>Benutzer</span>
                    </router-link>
                  </md-list-item>
                  <md-list-item class="md-inset">
                    <router-link exact to="/groups">
                      <md-icon>people</md-icon>
                      <span>Gruppen</span>
                    </router-link>
                  </md-list-item>
                  <md-list-item class="md-inset">
                    <router-link exact to="/membership">
                      <md-icon>people</md-icon>
                      <span>Mitgliedschaft</span>
                    </router-link>
                  </md-list-item>
                </md-list>
              </md-list-expand>
            </md-list-item>
          </md-theme>

          <md-theme md-name="provider">
            <md-list-item>
              <md-icon>subway</md-icon>
              <span>Provider</span>

              <md-list-expand>
                <md-list>
                  <md-list-item class="md-inset">
                    <router-link exact to="/payments">
                      <md-icon>account_box</md-icon>
                      <span>Zahlungsfluss</span>
                    </router-link>
                  </md-list-item>
                  <md-list-item class="md-inset">
                    <router-link exact to="/live">
                      <md-icon>satellite</md-icon>
                      <span>Karte</span>
                    </router-link>
                  </md-list-item>
                  <md-list-item class="md-inset">
                    <router-link exact to="/disputeresolve">
                      <md-icon>traffic</md-icon>
                      <span>Schlichtung</span>
                    </router-link>
                  </md-list-item>
                </md-list>
              </md-list-expand>
            </md-list-item>
          </md-theme>
        </md-list>
      </md-toolbar>
    </md-sidenav>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    name: 'sidebar',
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      }
    }
  }
</script>
<style scoped>
</style>
