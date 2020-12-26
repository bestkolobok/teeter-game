<template>
  <v-app light>
    <div>
      <v-app-bar
        class="header"
        app
        color="accent"
      >
        <v-row class="header__layout" justify="center" align="center">
          <h1>Insider test task</h1>
        </v-row>
      </v-app-bar>
    </div>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="false"
      app
      color="accent"
    >
      <span>&copy; {{ currentDate }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    currentDate() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
  .header{
    height: 64px!important;
  }
  @media all and (max-width: 600px) {
    .header{
      height: 54px!important;
      h1{
        font-size: 18px;
      }
    }
  }
</style>
