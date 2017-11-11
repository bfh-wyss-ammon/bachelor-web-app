<template>
  <md-theme md-name="provider">
    <div>
      <top-bar :title="'CashFlow'"></top-bar>
      <md-tabs md-right @change="change">
      <md-tab v-bind:md-label="day" v-for="(day, index) in days" :key="index">
      </md-tab>
      </md-tabs>

      <md-table id="payment-list" v-if="!loading">
        <md-table-header>
          <md-table-row>
            <md-table-head>groupId</md-table-head>
            <md-table-head>period</md-table-head>
            <md-table-head>sum of payments</md-table-head>
            <md-table-head>sum of costs</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(payment, index) in payments" :key="index">
            <md-table-cell>{{payment.groupId}}</md-table-cell>
            <md-table-cell>{{payment.period}}</md-table-cell>
            <md-table-cell>{{payment.total}}</md-table-cell>

            <md-table-cell>{{ getCostForPeriode(payment.groupId).sum}}</md-table-cell>
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
        date: {},
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
      getCostForPeriode(groupId) {
        let i = this.costs.findIndex(cost => cost.groupId == groupId);

        console.log(this.costs);
        console.log(groupId);

        return i >= 0 ? this.costs[i] : {sum: 'no costs reported yet'};

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
    }
  }
</script>
<style scoped>
</style>
