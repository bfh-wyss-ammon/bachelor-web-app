<template>
  <div class="group">
    <md-toolbar>
      <h2 class="md-title">Groups</h2>
    </md-toolbar>
    <md-tabs ref="tabs">
      <md-tab id="overview" md-label="Overview" md-accent>
        <group-list :groups="groups"></group-list>
      </md-tab>
      <md-tab md-label="New">
        <group-new v-on:created="load"></group-new>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  import {AuthorityHttp} from '../main'

  export default {
    name: 'default',
    data () {
      return {
        groups: null
      }
    },
    created () {
     this.load()
    },
    methods: {
      load() {
        AuthorityHttp.get('/groups').then((res) => {
          this.groups = res.data;
        }, (error) => {
          MessageBus.$emit('on-error', error);
        })
      }
    }
  }
</script>

<style scoped>
</style>
