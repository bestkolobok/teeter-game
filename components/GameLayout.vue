<template>
  <section
      class="game-layout"
      :style="{ height: pixelHeight + 'px', width: pixelWidth + 'px' }"
  >
    <v-layout class="game-layout__falling-place">
      <slot name="shape" />
    </v-layout>
    <v-layout class="game-layout__teeter-container" justify-center>
      <slot name="teeter" />
    </v-layout>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import config from "~/static/settings";
  export default {
    name: "GameLayout",
    computed: {
      ...mapGetters({
        getWidth: 'getWidth'
      }),
      pixelWidth() {
        return config.teeterWidth * config.pixelMultiplier
      },
      pixelHeight() {
        return config.fallingPlaceHeight * config.pixelMultiplier
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-layout{
    position: relative;
    margin: 0 auto;
    /*overflow-y: hidden;*/
    /*overflow-x: visible;*/
    &__teeter-container{
      position: absolute;
      width: 100%;
      bottom: 0;
      border-bottom: 1px solid $c--general-border;
    }
  }
</style>
