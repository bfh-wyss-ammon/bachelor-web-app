<template>
  <div>
    <div class="running" v-if="running">
      <span>group create process is running. wait...</span>
      <md-progress md-indeterminate></md-progress>
    </div>
    <md-button class="md-raised md-primary" v-bind:disabled="!ready" @click="create">Generate</md-button>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  export default {
    name: 'new-group',
    event: 'created',
    data() {
      return {
        status: '',
        webSocket: null,
      }
    },
    computed: {
      ready() {
        return this.status == 'ready';
      },
      running() {
        return this.status == 'running';
      }
    },
    created() {
      this.webSocket = new WebSocket(this.$authortiyWebSocketURL + '/groups?token=7596b176-c54a-11e7-abc4-cec278b6b50a');
      this.webSocket.onmessage = (msg) => {
        this.status = msg.data;
        if (msg.data == 'done') {
          MessageBus.$emit('on-info', "new group successfully generated!");
          this.status = 'ready';
          this.$emit('created');
        }
      }
      this.webSocket.onclose = () => {
        MessageBus.$emit('on-error', "group, connection closed!");
      }
    },
    methods: {
      create() {
        if (this.webSocket == null || this.webSocket.readyState != 1) {
          MessageBus.$emit('on-info', "connection problems refresh!");
        }
        else if (this.ready) {
          this.webSocket.send('new')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .running {
    display: flex;
    flex-direction: column;
    span {
      margin: 8px 0;
    }
    padding-bottom: 16px;
  }
</style>
