<template>
  <md-theme md-name="provider">
    <div>
      <top-bar :title="'Zahlungsfluss'"></top-bar>


      <md-tabs md-right @change="change">
      <md-tab v-bind:md-label="day" v-for="(day, index) in days" :key="index">
      </md-tab>
      </md-tabs>

      <md-table id="payment-list" v-if="!loading">
        <md-table-header>
          <md-table-row>
            <md-table-head>Gruppen ID</md-table-head>
            <md-table-head>Summe der Zahlungen</md-table-head>
            <md-table-head>Summe der Kosten</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(cost, index) in costs" :key="index">
            <md-table-cell>{{cost.groupId}}</md-table-cell>
            <md-table-cell>{{getPaymentsForCost(cost.groupId).total}}</md-table-cell>
            <md-table-cell>{{cost.sum}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
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
        costs: [],
        loading: true,
        days: []
      }
    },
    methods: {
      load(date) {
        let promises = [];
        promises.push(
          ProviderHttp.get('/payments/' + date).then((res) => {
            this.payments = res.data;
          }, (err) => {
            MessageBus.$emit('on-error', err);
          }));

        this.loading = true;
        promises.push(
          ProviderHttp.get('/costs/' + date).then((res) => {
          this.costs = res.data;
        }, (err) => {
          MessageBus.$emit('on-error', err);
        }));

        Promise.all(promises).then(() => {
          this.loading = false;
        })

      },
      change(date) {
        this.load(this.days[date].split('.').join('-'));
      },
      getPaymentsForCost(groupId) {
       let i =  (this.payments || []).findIndex(p => p.groupId == groupId);

       return i >= 0 ? this.payments[i] : {total: 'no payments found'};

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
      this.selectedDate = this.days[0];
    }
  }
</script>
<style scoped>
</style>
