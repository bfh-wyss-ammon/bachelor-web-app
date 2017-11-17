<template>
  <md-theme md-name="provider">
    <div>
      <top-bar :title="'DisputeResolve'"></top-bar>


      <md-tabs md-right @change="change">
      <md-tab v-bind:md-label="day" v-for="(day, index) in days" :key="index">
      </md-tab>
      </md-tabs>

      <div>
        <md-button class="md-raised md-primary" @click="resolve">resolve</md-button>
      </div>

      <md-list>
        <md-theme md-name="authority" v-for="(dispute, index) in disputes" :key="index">
          <md-list-item>
            <span>GroupId: {{dispute.group}} - Status: {{dispute.state}}</span>
            <md-list-expand v-if="dispute.disputeResults">
              <md-list>
                <md-list-item class="md-inset" v-for="res in dispute.disputeResults">
                    <span>{{res.userId}} - {{res.deltaToll}}</span>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-theme>
      </md-list>

    </div>
  </md-theme>
</template>

<script>
  import {MessageBus} from '../main'
  import {ProviderHttp} from '../main'

  export default {
    name: 'settings',
    data() {
      return {
        selectedDate: {},
        payments: [],
        disputes: [],
        loading: true,
        days: [],
      }
    },
    methods: {
      change(date) {
          this.selectedDate = date;
      },
      resolve() {
        var periode = this.days[this.selectedDate].split('.').join('-');
        ProviderHttp.get('/resolve/' + periode)
          .then((res) => {
            alert('triggered');
        }, (err) => {
          MessageBus.$emit('on-error', err);
        });
      }
    },
    created() {
      for(let i = 0; i < 30; i++) {
        let dateOffset = (24*60*60*1000) * i;
        let d = new Date();
        d.setTime(d.getTime() - dateOffset);

        let mm = (d.getMonth() + 1);
        let day = "" + d.getDate();
        day = day.length == 1 ? "0" + day : day;
        this.days.push(day + '.' + mm + '.' + d.getFullYear());
      }
      this.selectedDate = 0;

      var periode = this.days[this.selectedDate].split('.').join('-');
      ProviderHttp.get('/dispute/' + periode)
        .then((res) => {
          this.disputes = res.data;
          console.log(this.disputes);
        }, (err) => {
          MessageBus.$emit('on-error', err);
        });
      console.log(this.selectedDate);
    }
  }
</script>
<style scoped>
</style>
