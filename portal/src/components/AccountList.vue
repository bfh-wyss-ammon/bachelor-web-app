<template>
  <div>
    <md-table id="users">
      <md-table-header>
        <md-table-row>
          <md-table-head>id</md-table-head>
          <md-table-head>FirstName</md-table-head>
          <md-table-head>LastName</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(user, index) in users" :key="index">
          <md-table-cell>{{user.id}}</md-table-cell>
          <md-table-cell>{{user.firstname}}</md-table-cell>
          <md-table-cell>{{user.lastname}}</md-table-cell>
          <md-table-cell>
            <md-button class="md-icon-button" @click="edit(user)">
              <md-icon v-if="user.userId">edit</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

    <md-dialog-prompt
      :md-title="'Set Password'"
      :md-ok-text="'save'"
      :md-cancel-text="'cancel'"
      :md-content="'User: ' + user.firstname + ' ' + user.lastname"
      :md-input-maxlength="20"
      :md-input-placeholder="'password'"
      @close="onClose"
      v-model="password"
      ref="passwordDialog">
    </md-dialog-prompt>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  export default {
    props: ['users'],
    data () {
      return {
        user: {},
        password: ''
      }
    },
    methods: {
      edit(user) {
        this.user = user;
        this.$refs.passwordDialog.open();
      },
      onClose(res) {
        if (res == 'ok' && this.password.length > 3) {
          this.axios.get('/users/' + this.user.userId, this.password).then((res) => {
            MessageBus.$emit('on-info', 'password change successful');
            this.user = {};
            this.password = '';
          }, (err) => {
            MessageBus.$emit('on-error', err);
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
