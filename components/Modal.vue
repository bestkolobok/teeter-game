<template>
  <v-dialog
      v-model="modal"
      width="500"
      class="modal-dialog"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        GAME OVER!
      </v-card-title>

      <v-card-text class="modal-dialog__text">
        {{ text }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="modal = false"
        >
          CLOSE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: "Modal",
    methods: {
      ...mapMutations({
        SET_MODAL_SHOW: 'SET_MODAL_SHOW'
      }),
    },
    computed: {
      ...mapGetters({
        getModalShow: 'getModalShow',
        getModalText: 'getModalText'
      }),
      modal: {
        get() {
          return this.getModalShow
        },
        set(val) {
          this.SET_MODAL_SHOW(val)
        }
      },
      text() {
        return this.getModalText
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal-dialog{
    &__text{
      min-height: 100px;
    }
  }
</style>
