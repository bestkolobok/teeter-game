<template>
  <section class="home">
    <controls-section class="mb-5" />
    <game-layout class="home__game-layout">
      <shape
          v-if="getFallingShape"
          slot="shape"
          :key="'shape_' + shapeId"
          :id="shapeId"
          :y="bottom"
          :x="left"
          :figure="shapeType"
          :weight="shapeWeight"
      />
      <teeter class="home__teeter" slot="teeter" />
    </game-layout>
    <modal-dialog />
  </section>
</template>

<script>
// import debounce from 'lodash/debounce';
import { mapGetters, mapMutations } from 'vuex';
import Teeter from "~/components/Teeter";
import ControlsSection from "~/components/ControlsSection";
import Shape from "~/components/Shape";
import GameLayout from "~/components/GameLayout";
import ModalDialog from "~/components/Modal";

export default {
  name: 'Home',
  components: {GameLayout, Shape, ControlsSection, Teeter, ModalDialog},
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations({
      SET_BENDING: 'SET_BENDING'
    })
  },
  computed: {
    ...mapGetters({
      getFallingShape: 'getFallingShape',
      getOnBoardingHeight: 'getOnBoardingHeight'
    }),
    bottom() {
      if (this.getFallingShape) return this.getFallingShape.y;
      return 100
    },
    left() {
      if (this.getFallingShape) return this.getFallingShape.x / 2;
      return 0
    },
    shapeType() {
      if (this.getFallingShape) return this.getFallingShape.type;
      return 1
    },
    shapeWeight() {
      if (this.getFallingShape) return this.getFallingShape.weight;
      return 1
    },
    shapeId() {
      if (this.getFallingShape) return this.getFallingShape.id;
      return 0
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    position: relative;
    margin: 0 auto;
    height: calc(100vh - 124px);
    &__game-layout{
      height: calc(100% - 66px);
    }
  }
</style>
