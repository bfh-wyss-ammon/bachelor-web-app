<template>
  <div>
    <md-dialog id="bot-detail" ref="dialog">
      <md-dialog-title md-accent>Bot Detail: {{bot.firstname}} {{bot.lastname}}, {{bot.sex}}, {{bot.dateOfBirth | formatDate}}</md-dialog-title>

      <md-dialog-content>
        <md-tabs md-fixed>
          <md-tab id="monday" md-label="monday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>

          <md-tab id="tuesday" md-label="Tuesday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>

          <md-tab id="wednesday" md-label="Wednesday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>

          <md-tab id="thursday" md-label="Thursday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>

          <md-tab id="friday" md-label="Friday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>
          <md-tab id="saturday" md-label="Saturday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>
          <md-tab id="sunday" md-label="Sunday">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>
        </md-tabs>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="cancel()">cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bot: {},
      }
    },
    methods: {
      show(bot) {
        this.bot = bot;
        this.$refs.dialog.open();
      },
      save() {
        this.$refs.dialog.close();
      },
      cancel() {
        this.$refs.dialog.close();
      }
    }
  }
</script>

<style lang="scss">
  #bot-detail {
    .md-dialog {
      width: 95%;
      height: 95%;
    }
  }
</style>
