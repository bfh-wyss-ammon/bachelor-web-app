<template>
  <div>
    <form novalidate @submit.stop.prevent="submit" id="newBot">
      <md-input-container>
        <label>Firstname</label>
        <md-input v-model="bot.firstname"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Lastname</label>
        <md-input v-model="bot.lastname"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Sex</label>
        <md-autocomplete v-model="bot.sex"
                         :list="sex"
                         print-attribute="name"
                         :filter-list="filter"
                         :min-chars="0"
                         :max-height="6"
                         @selected="sexCallback"
                         :debounce="500">
        </md-autocomplete>
      </md-input-container>
      <md-input-container>
        <label>Birthday</label>
        <md-input v-model="bot.dateOfBirth" type="date"></md-input>
      </md-input-container>
    </form>

    <md-button class="md-raised md-primary" @click="save()" v-bind:disabled="!isValid">save</md-button>
  </div>
</template>

<script>
  import {MessageBus} from '../main'
  export default {
    event: 'created',
    data() {
      return {
          sex: [{name:'Male', key: 'm'},{name:'Female', key: 'f'}],
        bot: {
          firstname: '',
          lastname: '',
          sex: '',
          dateOfBirth: null
        },
        error: {
          message: ''
        }
      }
    },
    computed: {
      isValid(){
        return this.bot.firstname.length && this.bot.lastname.length
          && this.bot.sex.length && this.bot.dateOfBirth;
      }
    },
    methods: {
      save() {
        this.axios.post(this.$botURL + '/bots', this.bot).then((res) => {
          MessageBus.$emit('on-info', 'Bot: ' + this.bot.firstname + ' ' + this.bot.lastname + ' successfully created.');
          this.$emit('created', res.data);
          this.bot.firstname = '';
          this.bot.lastname = '';
          this.bot.sex = '';
          this.bot.dateOfBirth = null;
        }, (error) => {
          MessageBus.$emit('on-error', error);
        })
      },
      filter: function(list, query) {
        var arr = [];

        for(var i = 0; i < list.length; i++) {
          if(list[i].name.indexOf(query) !== -1)
            arr.push(list[i]);

          if(arr.length > 5)
            break;
        }

        return arr;
      },

      sexCallback: function(item) {
        this.bot.sex = item.key;
      }
    }
  }
</script>

<style scoped>
</style>
