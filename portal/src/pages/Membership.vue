<template>
  <md-theme md-name="authority">
    <top-bar :title="'Membership'"></top-bar>
    <div class="membership">
      <div v-if="membershipList">
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>id</md-table-head>
              <md-table-head>groupId</md-table-head>
              <md-table-head>status</md-table-head>
              <md-table-head>created</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(membership, index) in membershipList" :key="index">
              <md-table-cell>{{membership.user.id}}</md-table-cell>
              <md-table-cell>{{membership.group.groupId}}</md-table-cell>
              <md-table-cell>{{membership.approved ? 'approved' : 'created'}}</md-table-cell>
              <md-table-cell>{{membership.created}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </div>
    </div>
  </md-theme>
</template>

<script>
  import {AuthorityHttp} from '../main'
  export default {
    name: 'membership',
    data () {
      return {
        membershipList: null
      }
    },
    created () {
      AuthorityHttp.get('/membership').then((res) => {
        this.membershipList = res.data;
      }, (err) => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
</style>
