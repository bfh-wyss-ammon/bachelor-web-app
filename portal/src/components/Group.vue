<template>
  <div class="group">
    <h1>Group</h1>
    <md-button class="md-primary" @click="makeGroup()">make group</md-button>
    <div v-if="groups">
      <md-table v-once>
        <md-table-header>
          <md-table-row>
            <md-table-head>groupId</md-table-head>
            <md-table-head>managerKeyId</md-table-head>
            <md-table-head>publicKeyId</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(group, index) in groups" :key="index">
            <md-table-cell>{{group.groupId}}</md-table-cell>
            <md-table-cell>{{group.managerKey.managerKeyId}}</md-table-cell>
            <md-table-cell>{{group.publicKey.publicKeyId}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'default',
    data () {
      return {
        groups: null
      }
    },
    created () {
      this.axios.get('/groups').then((res) => {
        this.groups = res.data;
      }, (err) => {
        console.log(err);
      })
    },
    methods: {
      makeGroup(user) {
        this.axios.post('/groups').then((res) => {
          // todo give better fedback
          alert('group created');
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
