<template>
  <div class="default">
    <top-bar :title="'Bachelorthesis 17/18'"></top-bar>
    <md-whiteframe md-elevation="10" class="meta-frame">
      <div class="meta">
        <h1>Implementation eines anonymen Mobility Pricing auf Basis eines Gruppensignaturschemas</h1>
        <h2>Studenten: Pascal Ammon, Gabriel Wyss</h2>
        <h2>Betreuer: Dr. Eric Dubuis</h2>
        <h2>Experte: Dr. Igor Metz</h2>
      </div>
    </md-whiteframe>
    <div class="footer">
      <h2>source: <a href="https://github.com/bfh-wyss-ammon">github</a></h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'default',
    data () {
      return {}
    },
    created () {
    },
    methods: {
      goto(target) {
        this.$router.go(target)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .default {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 100%;

    .meta-frame {
      margin: 20px;
    }

    .menu-frame {
      margin: 20px;
    }

    .meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 20px;
      width: 100%;
      h1, h2 {
        text-align: center;
        line-height: 1.5em;
      }
    }

    .menu {
      padding: 10px;
      width: 100%;
      background-color: black;

      .md-button {
        background-color: white;
      }

      h1 {
        text-align: center;
        color: white;
      }
      & div {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }

    .footer {
      padding-right: 2em;
      width: 100%;
      background-color: black;
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      h2 {
        color: white;
      }
      span {
        color: white;
        font-size: 1.2em;
      }
    }
  }

</style>
