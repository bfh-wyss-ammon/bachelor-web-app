<template>
  <div class="settings">
    <h1>Settings</h1>

    <div v-if="settings">
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>Modulus</label>
          <md-input v-model="settings.modulus"></md-input>
        </md-input-container>
        <md-input-container>
          <label>lE</label>
          <md-input v-model="settings.lE"></md-input>
        </md-input-container>
        <md-input-container>
          <label>lQ</label>
          <md-input v-model="settings.lQ"></md-input>
        </md-input-container>
        <md-input-container>
          <label>lc</label>
          <md-input v-model="settings.lc"></md-input>
        </md-input-container>
        <md-input-container>
          <label>le</label>
          <md-input v-model="settings.le"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Modulus</label>
          <md-input v-model="settings.modulus"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Prime Certainty</label>
          <md-input v-model="settings.prime_certainty"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Salt</label>
          <md-input v-model="settings.salt"></md-input>
        </md-input-container>
        <md-button class="md-raised" @click="reset">Reset</md-button>
        <md-button class="md-raised md-primary" @click="save">Save</md-button>
      </form>
    </div>

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
        settings: null
      }
    },
    created () {
      this.axios.get('/settings').then((res) => {
          console.log(res.data)
        this.settings = res.data
      }, (err) => {
        this.$refs['dialog'].open();
      })
    },
    methods: {
      reset () {
        this.axios.post('/settings').then((res) => {
          this.settings = res.data
        }, (err) => {
          this.$refs['dialog'].open();
        })
      },
      save () {
        this.axios.put('/settings', this.settings).then((res) => {
          alert('save oke');
        }, (err) => {
          this.$refs['dialog'].open();
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .settings {
    padding: 15px;
  }
</style>
