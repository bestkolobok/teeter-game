<template>
  <div class="teeter">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Teeter",
    computed: {
      ...mapGetters({
        getAngle: 'getAngle'
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
