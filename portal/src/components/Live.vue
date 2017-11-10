<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="8"
      map-type-id="terrain"
      style="width: 1000px; height: 800px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m"
      ></gmap-marker>
    </gmap-map>
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
        center: {lat: 46.969173, lng: 7.465165},
        markers: []
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
      this.webSocket = new WebSocket(this.$providerWebSocketURL + '/live?token=7596b176-c54a-11e7-abc4-cec278b6b50a');
      this.webSocket.onmessage = (msg) => {
        var obj = JSON.parse(msg.data);
        this.markers.push({
          created: obj.created,
          lat: obj.latitude,
          lng: obj.longitude
        });
        console.log(obj)
      };
      this.webSocket.onclose = () => {
        MessageBus.$emit('on-error', "group, connection closed!");
      }
    },
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
