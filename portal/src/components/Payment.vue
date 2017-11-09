<template>
  <div>
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">Payments,  <input type="date" v-model="date" @change="change"/></h2>
    </md-toolbar>

    <md-tabs ref="tabs">
      <md-tab id="Payments" md-label="Payments" md-accent>

        <md-table id="payment-list">
          <md-table-header>
            <md-table-row>
              <md-table-head>groupId</md-table-head>
              <md-table-head>period</md-table-head>
              <md-table-head>total</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(payment, index) in payments" :key="index">
              <md-table-cell>{{payment.groupId}}</md-table-cell>
              <md-table-cell>{{payment.period}}</md-table-cell>
              <md-table-cell>{{payment.total}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>

      </md-tab>
      <md-tab md-label="Costs">
          <md-table id="cost-list">
            <md-table-header>
              <md-table-row>
                <md-table-head>groupId</md-table-head>
                <md-table-head>sum</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row v-for="(cost, index) in costs" :key="index">
                <md-table-cell>{{cost.groupId}}</md-table-cell>
                <md-table-cell>{{cost.sum}}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import {MessageBus} from '../main'

  export default {
    name: 'settings',
    data() {
      return {
        date: {},
        payments: [],
        costs: []
      }
    },
    methods: {
      load() {
        let d = new Date(this.date);
        let mm = (d.getMonth() + 1);
        let day = "" + d.getDate();
        day = day.length == 1 ? "0" + day : day;
        let dRequest = day + '-' + mm + '-' + d.getFullYear();

        this.axios.get(this.$providerURL + '/payments/' + dRequest).then((res) => {
          this.payments = res.data;
        }, (err) => {
          MessageBus.$emit('on-error', err);
        });

        this.axios.get(this.$providerURL + '/costs/' + dRequest).then((res) => {
          this.costs = res.data;

          console.log(this.costs);
        }, (err) => {
          MessageBus.$emit('on-error', err);
        })

      },
      change(e) {
        this.load();
      }


    },
    created() {
      let d = new Date();
      let mm = (d.getMonth() + 1);
      let day = "" + d.getDate();
      day = day.length == 1 ? "0" + day : day;
      let r = d.getFullYear() + '-' + mm + '-' + day;
      this.date = r;

      this.load();
    }
  }
</script>
<style scoped>
</style>
