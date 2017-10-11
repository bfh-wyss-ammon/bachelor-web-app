<template>
  <md-dialog ref="dialog">
    <md-dialog-title>
      <span v-if="publicKey">Public Key Information</span>
      <span v-if="managerKey">Manager Key Information</span>
    </md-dialog-title>

    <md-dialog-content>
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Property</md-table-head>
            <md-table-head>Value</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(value, key) in publicKey || managerKey" :key="key">
            <md-table-cell>{{key}}</md-table-cell>
            <md-table-cell class="key-value">{{value}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="close()">Close</md-button>
    </md-dialog-actions>
  </md-dialog>

</template>

<script>
  import { KeyInfoBus } from '../main'

  export default {
    data() {
      return {
        publicKey: null,
        managerKey: null,
      }
    },
    methods: {
      close() {
          this.publicKey = null;
          this.managerKey = null;
        this.$refs.dialog.close();
      },
      showPublicKey(publicKey) {
          publicKeythis.publicKey = publicKey;
        this.$refs.dialog.open();
      }
    },
    created() {
      KeyInfoBus.$on('show-public-key', key => {
        this.publicKey = key;
        this.$refs.dialog.open();
      });
      KeyInfoBus.$on('show-manager-key', key => {
        this.managerKey = key;
        this.$refs.dialog.open();
      });
    }
  }
</script>

<style lang="scss">
  .key-value {
    div {
      overflow-wrap: break-word;
      max-width: 600px;
    }
  }
</style>
