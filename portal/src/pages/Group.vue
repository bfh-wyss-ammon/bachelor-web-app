<template>
  <md-theme md-name="authority">
    <top-bar :title="'Groups'"></top-bar>
    <div class="group">
      <md-tabs ref="tabs">
        <md-tab id="overview" md-label="Overview" md-accent>
          <group-list :groups="groups"></group-list>
        </md-tab>
        <md-tab md-label="New">
          <group-new v-on:created="load"></group-new>
        </md-tab>
      </md-tabs>
    </div>
  </md-theme>
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
