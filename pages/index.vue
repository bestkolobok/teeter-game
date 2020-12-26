<template>
  <section
      class="home"
      :style="{ width: getPixelWidth + `px` }"
  >
    <v-layout class="home__teeter-container" justify-center>
      <teeter class="home__teeter" />
    </v-layout>

  </section>
</template>

<script>
// import debounce from 'lodash/debounce';
import { mapGetters, mapMutations } from 'vuex';
import Teeter from "~/components/Teeter";
import config from "~/static/settings";

export default {
  name: 'Home',
  components: { Teeter },
  data() {
    return {

    }
  },
  created() {
    this.SET_TEETER_SIZE({ width: config.teeterWidth, height: config.teeterHeight })
  },
  methods: {
    ...mapMutations({
      SET_TEETER_SIZE: 'SET_TEETER_SIZE',
      SET_BENDING: 'SET_BENDING'
    })
  },
  computed: {
    ...mapGetters({
      getPixelWidth: 'getPixelWidth'
    })
  }
}
</script>

<style scoped lang="scss">
  .home{
    position: relative;
    margin: 0 auto;
    height: calc(100vh - 124px);
    &__teeter-container{
      position: absolute;
      width: 100%;
      bottom: 10px;
      border-bottom: 1px solid $c--general-border;
    }
  }
</style>
