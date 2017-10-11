<template>
  <div>
    <md-table id="bots">
      <md-table-header>
        <md-table-row>
          <md-table-head>FirstName</md-table-head>
          <md-table-head>LastName</md-table-head>
          <md-table-head>Sex</md-table-head>
          <md-table-head>Birthday</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(bot, index) in bots" :key="index">
          <md-table-cell>{{bot.firstname}}</md-table-cell>
          <md-table-cell>{{bot.lastname}}</md-table-cell>
          <md-table-cell>{{bot.sex}}</md-table-cell>
          <md-table-cell class="info">
            {{bot.dateOfBirth | formatDate}}
            <md-button class="md-icon-button" @click="show(bot)">
              <md-icon>info</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <bot-detail ref="detail"></bot-detail>
  </div>
</template>

<script>
  export default {
    props: ['bots'],
    methods: {
        show (bot) {
            this.$refs.detail.show(bot);
        }
    }
  }
</script>

<style lang="scss">
  .info .md-table-cell-container {
    justify-content: flex-start !important;
    button {
      margin-left: 18px !important;
    }
  }
</style>
