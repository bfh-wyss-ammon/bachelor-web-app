<template>
  <div class="group">
    <h1>Virtual Drive</h1>
    <md-button class="md-primary" @click="showLoginDialog()">login</md-button>

    <div v-if="vEntities">
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>mail</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(vEntity, index) in vEntities" :key="index">
            <md-table-cell>{{index}}:{{vEntity.user.mail}}</md-table-cell>
            <md-button class="md-icon-button" @click="drive(vEntity)">
              <md-icon>train</md-icon>
            </md-button>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>
    <div>
      <gmap-map
        v-if="markers && markers.length"
        :center="{lat:46.976669, lng:7.474177}"
        :zoom="14"
        map-type-id="terrain"
        style="width: 800px; height: 500px"
      >
        <gmap-marker
          v-if="markers"
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
        ></gmap-marker>
      </gmap-map>
    </div>

    <md-dialog ref="loginDialog">
      <md-dialog-title>Login</md-dialog-title>

      <md-dialog-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Email</label>
            <md-input v-model="user.mail"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <md-input v-model="user.password"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog()">Cancel</md-button>
        <md-button class="md-raised md-primary" @click="login()">Login</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
  export default {
    name: 'default',
    data () {
      return {
        vEntities: [],
        user: {
          mail: '',
          password: ''
        },
        markers: []
      }
    },
    created () {
      this.vEntities = JSON.parse(localStorage.getItem('virtualDriveUsers')) || [];

      setInterval(() => {
        this.axios.get('/drive').then((res) => {
          var statusList = res.data;
          for(var i = 0; i < statusList.length; i++) {
              var position = {
                position: {
                  lat: parseFloat(statusList[i].koordinaten.latitude),
                  lng: parseFloat(statusList[i].koordinaten.longtitude),
                }
              };
              console.log(position);
            this.markers.push(position);
          }
        }, (err) => {
          console.log(err);
        });
      }, 400);

    },
    methods: {
      showLoginDialog() {
        this.$refs['loginDialog'].open();
      },
      login() {
        this.axios.post('/login', this.user).then((res) => {
          // todo give better fedback

          let result = {
            secretKey: res.data,
            user: this.user
          }
          this.vEntities.push(result);
          localStorage.setItem('virtualDriveUsers', JSON.stringify(this.vEntities));
          this.user.mail = '';
          this.user.password = '';
          this.$refs['loginDialog'].close()

        }, (err) => {
          console.log(err);
          this.$refs['loginDialog'].close()
        })

      },
      closeDialog() {
        this.$refs['loginDialog'].close()
      },
      drive(vEntity) {
        this.axios.post('/drive', vEntity).then((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .group {
    padding: 15px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
