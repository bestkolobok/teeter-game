<template>
  <div class="teeter">
    <div
        class="teeter__border"
        :style="{ transform: `rotate(${getAngle}deg)` }"
    />
    <v-layout class="teeter__triangle-layout" justify-center>
      <div
          class="teeter__triangle"
          :style="{ 'border-bottom-width': getPixelHeight + 'px' }"
      />
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Teeter",
    computed: {
      ...mapGetters({
        getAngle: 'getAngle',
        getPixelHeight: 'getPixelHeight'
      }),
      angle() {
        return 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .teeter{
    width: 100%;
    &__border{
      height: 0;
      border-bottom: 5px solid $c--figure-teeter;
    }
    &__triangle {
      width: 0;
      height: 0;
      border-left: 40px solid transparent;
      border-right: 40px solid transparent;
      border-bottom-color: $c--figure-base;
      border-bottom-style: solid;
    }
    &__triangle-layout{
      width: 100%;
    }
  }
</style>
