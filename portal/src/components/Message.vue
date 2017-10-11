<template>
  <div>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="errorDialog" :md-duration="duration.error">
      <span>{{ errorMessage }}</span>
    </md-snackbar>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="informDialog" :md-duration="duration.inform">
      <span>{{ informMessage }}</span>
    </md-snackbar>
  </div>
</template>

<script>
  import { MessageBus } from '../main'

  export default {
    data: () => ({
      vertical: 'top',
      horizontal: 'center',
      duration: {
        error: 2000,
        inform: 2000
      },
      errorMessage: '',
      informMessage: '',
    }),
    created() {
        MessageBus.$on('on-error', error => {
        this.errorMessage = error.message;
        this.$refs.errorDialog.open();
      });
        MessageBus.$on('on-info', message => {
        this.informMessage = message;
        this.$refs.informDialog.open();
      });
    }
  }
</script>

<style scoped>
</style>
