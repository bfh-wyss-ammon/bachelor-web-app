<template>
  <div>
    <form novalidate @submit.stop.prevent="submit" id="newAccount">
      <md-input-container>
        <label>Benutzer ID</label>
        <md-input v-model="user.id" required></md-input>
      </md-input-container>
      <md-input-container>
        <label>Vorname</label>
        <md-input v-model="user.firstname"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Nachname</label>
        <md-input v-model="user.lastname"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Passwort</label>
        <md-input v-model="user.password" required type="password"></md-input>
      </md-input-container>
    </form>

    <md-button class="md-raised md-primary" @click="saveAccount()" v-bind:disabled="!newAccountValid">save</md-button>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  import {AuthorityHttp} from '../main'

  export default {
    event: 'created',
    data() {
      return {
        user: {
          id: '',
          firstname: '',
          lastname: '',
          password: ''
        },
        error: {
          message: ''
        }
      }
    },
    computed: {
      newAccountValid(){
        return this.user.id && this.user.password && this.user.id.length > 3 && this.user.password.length > 3;
      }
    },
    methods: {
      saveAccount() {
        AuthorityHttp.post('/users', this.user).then((res) => {
          MessageBus.$emit('on-info', 'User: ' + this.user.firstname + ' ' + this.user.lastname + ' successfully created.');
          this.$emit('created', {
            id: this.user.id,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            password: this.user.password
          });
          this.user.id = '';
          this.user.firstname = '';
          this.user.lastname = '';
          this.user.password = '';
        }, (error) => {
          MessageBus.$emit('on-error', error);
        })
      }
    }
  }
</script>

<style scoped>
</style>
