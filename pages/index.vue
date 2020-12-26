<template>
  <section class="home">

  </section>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: { },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions({
      // fetchUsers: 'fetchUsers'
    })
  },
  computed: {
    ...mapGetters({
      // users: 'getUsers'
    })
  }
}
</script>

<style scoped lang="scss">
  .home{

  }
</style>
