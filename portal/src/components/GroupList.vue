<template>
  <div>
    <md-table id="groups">
      <md-table-header>
        <md-table-row>
          <md-table-head>Gruppen ID</md-table-head>
          <md-table-head>ManagerKey ID</md-table-head>
          <md-table-head>PublicKey ID</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(group, index) in groups" :key="index">
          <md-table-cell>{{group.groupId}}</md-table-cell>
          <md-table-cell class="info">
            {{group.managerKey.managerKeyId}}
          </md-table-cell>
          <md-table-cell class="info">
            {{group.publicKey.publicKeyId}}
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  import { KeyInfoBus } from '../main'
  export default {
    props: ['groups'],
    methods: {
        showPublicKey(key) {
          KeyInfoBus.$emit('show-public-key', key);
        },
      showManagerKey(key) {
        KeyInfoBus.$emit('show-manager-key', key);
      }
    }
  }
</script>

<style lang="scss">
  .info .md-table-cell-container {
      justify-content: flex-start!important;
    button {
      margin-left: 18px !important;
    }
  }
</style>
