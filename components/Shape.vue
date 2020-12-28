<template>
  <div
    class="shape"
    :class="{ ['shape__' + figureType]: true, 'shape--dropped': isDropped }"
    :style="{ ...styles, bottom: y + '%', left: x + '%', zIndex: id }"
  >
    <div class="shape__text">{{ weight }}</div>
  </div>
</template>

<script>
  export default {
    name: "Shape",
    props: {
      id: {
        type: Number,
        default: 0
      },
      figure: {
        type: Number,
        default: 1
      },
      weight: {
        type: Number,
        default: 1
      },
      isDropped: {
        type: Boolean,
        default: false
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        types: ['triangle', 'square', 'circle'],
        weightMultiplier: 500
      }
    },
    computed: {
      figureType() {
        return this.types[this.figure - 1]
      },
      styles() {
        const s = this.weight * this.weightMultiplier;
        if (this.figure === 1) {
          const x = Math.sqrt(s / 3);
          const y = 1.5 * x;
          return {
            'border-left': x + 'px solid transparent',
            'border-right': x + 'px solid transparent',
            'border-bottom-width': y + 'px',
            'margin-left': -x + 'px'
          }
        } else if (this.figure === 2) {
          const x = Math.sqrt(s);
          return {
            width: x + 'px',
            'border-bottom-width': x + 'px',
            'margin-left': -(x / 2) + 'px'
          }
        } else {
          const x = 2 * Math.sqrt(s / Math.PI);
          return {
            width: x + 'px',
            height: x + 'px',
            'margin-left': -(x / 2) + 'px'
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .shape{
    position: absolute;
    &__triangle{
      width: 0;
      border-bottom-color: $c--figure-1;
      border-bottom-style: solid;
      .shape__text{
        position: absolute;
        top: 10px;
        /*height: 100%;*/
      }
    }
    &__square{
      border-bottom-color: $c--figure-2;
      border-bottom-style: solid;
      .shape__text{
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
    &__circle{
      background-color: $c--figure-3;
      border-radius: 50%;
      .shape__text{
        margin-left: 40%;
        margin-top: 30%;
        /*height: 100%;*/
      }
    }
    &--dropped{
      position: relative;
    }
  }
</style>
