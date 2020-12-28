<template>
  <div class="teeter">
    <div
        class="teeter__border-wrapper"
        :style="{ transform: `rotate(${getAngle}deg)` }"
    >
      <shape
          v-for="(item) in leftSideShapes"
          :key="'shape_' + item.id"
          class="teeter__shape"
          :x="item.x / 2"
          :figure="item.type"
          :weight="item.weight"
      />
      <shape
          v-for="(item) in rightSideShapes"
          :key="'shape_r_' + item.id"
          class="teeter__shape"
          :x="(item.x / 2) + 50"
          :figure="item.type"
          :weight="item.weight"
      />
      <div class="teeter__border" />
    </div>
    <v-layout class="teeter__triangle-layout" justify-center>
      <div
          class="teeter__triangle"
          :style="{ 'border-bottom-width': pixelHeight + 'px' }"
      />
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import config from "~/static/settings";
  import Shape from "./Shape";
  export default {
    name: "Teeter",
    components: {Shape},
    data() {
      return {
        momentumL: 0,
        momentumR: 0,
        speedW: 0
      }
    },
    created() {
      this.INIT_TEETER({
        width: config.teeterWidth,
        height: config.teeterHeight,
        weight: config.teeterBorderWeight,
        fallingPlaceHeight: config.fallingPlaceHeight ,
        teeterBorderWeight: config.teeterBorderWeight
      })
    },
    methods: {
      ...mapMutations({
        INIT_TEETER: 'INIT_TEETER'
      })
    },
    computed: {
      ...mapGetters({
        getAngle: 'getAngle',
        getHeight: 'getHeight',
        getLeftSideShapes: 'getLeftSideShapes',
        getRightSideShapes: 'getRightSideShapes'
      }),
      pixelHeight() {
        return this.getHeight * config.pixelMultiplier
      },
      leftSideShapes() {
        return this.getLeftSideShapes
      },
      rightSideShapes() {
        return this.getRightSideShapes
      },
      momentumLeft() {
        return this.leftSideShapes.reduce((acc, el) => acc + (100 - el.x) * el.weight, 0)
      },
      baseMomentumAngular() {
        return 0
      },
      momentumTotal() {
        return this.momentumR - this.momentumL
      },
    }
  }
</script>

<style scoped lang="scss">
  .teeter{
    width: 100%;
    &__border{
      height: 0;
      border-bottom: 5px solid $c--figure-teeter;
      transition: .3s ease-in-out;
    }
    &__border-wrapper{
      position: relative;
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
    &__shape{
      margin-bottom: 5px;
    }
  }
</style>
