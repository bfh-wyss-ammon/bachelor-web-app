<template>
  <md-theme md-name="provider">
    <top-bar :title="'Karte'"></top-bar>
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
  </md-theme>
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
      this.webSocket = new WebSocket(this.$providerWebSocketURL + '/live?token=9b8518f9-be03-4cba-a75c-18d73b0e395a');
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
