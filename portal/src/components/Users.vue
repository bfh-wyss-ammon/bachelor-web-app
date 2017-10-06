<template>
  <div class="users">
    <h1>Users</h1>
    <div v-if="users">
      <md-table v-once>
        <md-table-header>
          <md-table-row>
            <md-table-head>Email</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(user, index) in users" :key="index">
            <md-table-cell>{{index}}:{{user.mail}}</md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button" @click="editUser(user)">
                <md-icon>edit</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>

    <md-button class="md-raised md-primary" @click="showAddDialog">add</md-button>

    <md-dialog ref="newUser">
      <md-dialog-title>new User</md-dialog-title>

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
        <md-button class="md-primary" @click="closeDialog('newUser')">Cancel</md-button>
        <md-button class="md-raised md-primary" @click="add()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>


    <md-dialog-prompt
      :md-title="'new password'"
      :md-ok-text="'save'"
      :md-cancel-text="'cancel'"
      :md-input-maxlength="20"
      :md-input-placeholder="'password'"
      @close="onClose"
      v-model="prompt.password"
      ref="dialogPassword">
    </md-dialog-prompt>

    <md-dialog-alert
      :md-title="alert.title"
      :md-content-html="alert.contentHtml"
      ref="dialog">
    </md-dialog-alert>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    data () {
      return {
        alert: {
          title: 'Network issues',
          contentHtml: 'backend not available..'
        },
        prompt: {
            password: ''
        },
        users: null,
        user: {
            mail: '',
          password: ''
        },
      }
    },
    created () {
      this.axios.get('/users').then((res) => {
        this.users = res.data
      }, (err) => {
        this.$refs['dialog'].open();
      })
    },
    methods: {
      editUser(user) {
          this.user = user;
        this.$refs['dialogPassword'].open();
      },
      onClose(res) {
          if(res == 'ok' && this.prompt.password.length > 3) {
              this.user.password = this.prompt.password;
            this.axios.post('/users/'+this.user.userId, this.prompt.password).then((res) => {
                // todo give better fedback
              console.log("pw updated");
            }, (err) => {
              this.$refs['dialog'].open();
            })
          }
      },
      showAddDialog() {
          this.user = {
              mail: ''
          }
          this.$refs["newUser"].open();
      },
      add() {
        this.axios.post('/users', this.user).then((res) => {
          // todo give better fedback
          this.users.push(this.user);
        }, (err) => {
          this.$refs['dialog'].open();
        })
        this.$refs["newUser"].close();
      },
      closeDialog(name) {
        this.$refs[name].close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .users {
    padding: 15px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
