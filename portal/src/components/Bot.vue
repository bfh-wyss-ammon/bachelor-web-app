<template>
  <div>
    <md-toolbar>
      <h2 class="md-title">Bots</h2>
    </md-toolbar>
    <md-tabs ref="tabs">
      <md-tab id="overview" md-label="Overview" md-accent>
        <bot-list :bots="bots"></bot-list>
      </md-tab>
      <md-tab md-label="New">
        <bot-new v-on:created="accountCreated"></bot-new>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bots: []
      }
    },
    methods: {
      accountCreated(bot) {
        this.bots.push(user);

      }
    },
    created() {
      this.axios.get(this.$botURL + '/bots').then((res) => {
        this.bots = res.data
      }, (error) => {
        MessageBus.$emit('on-error', error);
      })
    }
  }
</script>

<style scoped>
</style>
