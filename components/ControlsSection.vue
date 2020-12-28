<template>
  <section class="controls-section">
    <v-layout>
      <v-btn
          class="controls-section__btn ma-2"
          :disabled="disabledPlayButton"
          @click="playGame"
      >
        play
      </v-btn>
      <v-btn
          class="controls-section__btn ma-2"
          :disabled="!disabledPlayButton"
          @click="playPause"
      >
        pause
      </v-btn>
      <v-btn
          class="controls-section__btn ma-2"
          :disabled="!disabledPlayButton"
          @click="reset"
      >
        reset
      </v-btn>
    </v-layout>
    <v-layout class="controls-section__info-cell-container">
      <div
          v-for="(item, i) in infoData"
          :key="i"
          class="ma-2"
      >
        <div class="controls-section__info-cell">
          {{ item.value }}
          {{ item.text }}
        </div>
        <div class="controls-section__info-cell-caption">{{ item.label }}</div>
      </div>
    </v-layout>
  </section>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import mixins from '~/mixins/methods';
  import config from "~/static/settings";
  export default {
    name: "ControlsSection",
    mixins: [mixins],
    data() {
      return {
        leftArrowKey: 37,
        rightArrowKey: 39,
        downArrowKey: 40,
        keyPressStep: 2,
        countGenerator: null,
        gameLengthCount: null
      }
    },
    created() {
      window.addEventListener('keydown', this.onButtonPress);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onButtonPress);
    },
    methods: {
      ...mapActions({
        generator: 'generator',
        angleGenerator: 'angleGenerator'
      }),
      ...mapMutations({
        SET_PLAY_PAUSE: 'SET_PLAY_PAUSE',
        SET_PLAY: 'SET_PLAY',
        SET_RESET: 'SET_RESET',
        SET_GAME_OVER: 'SET_GAME_OVER',
        INIT_FALLING_SHAPE: 'INIT_FALLING_SHAPE',
        SET_RIGHT_SIDE_SHAPES: 'SET_RIGHT_SIDE_SHAPES',
        SET_DROPPED_SHAPES: 'SET_DROPPED_SHAPES',
        SET_POSITION_X_LEFT: 'SET_POSITION_X_LEFT',
        SET_POSITION_X_RIGHT: 'SET_POSITION_X_RIGHT',
        SET_SPEED: 'SET_SPEED'
      }),
      async startGenerator(id, afterPause) {
        if (!afterPause) {
          if (!this.getPauseState && !this.getFallingShape) {
            this.INIT_FALLING_SHAPE(this.createShape(id));
            this.SET_RIGHT_SIDE_SHAPES(this.createShape(id, true));
            await this.generator();
          }
        } else {
          await this.generator();
        }
      },
      createShape(id, isRight) {
        const type = this.getRandomType();
        const x = this.getRandomPosition();
        const weightLimits = this.checkSafeWeight(x);
        const weight = this.getRandomWeight(isRight && weightLimits);
        return { id, type, weight, x }
      },
      checkSafeWeight(position) {
        const distance = (config.teeterWidth / 2) * (position / 100);
        const totalMomentum =  this.getMomentumLeft - this.getMomentumRight;
        const min = (totalMomentum - config.overLoad) / distance;
        const max = (totalMomentum + config.overLoad) / distance;
        return { min, max }
      },
      playGame() {
        this.gameCycling();
      },
      playPause() {
        this.SET_PLAY_PAUSE();
        if (!this.getPauseState) {
          this.gameCycling(true)
        }
      },
      reset() {
        this.SET_RESET();
        this.gameLengthCount = null;
        this.countGenerator = null;
      },
      onButtonPress(event) {
        event.preventDefault();
        if (event.keyCode === this.leftArrowKey) {
          this.SET_POSITION_X_LEFT(this.keyPressStep);
        }
        if (event.keyCode === this.rightArrowKey) {
          this.SET_POSITION_X_RIGHT(this.keyPressStep);
        }
      },
      async gameLengthCycle(afterPause) {
        if(this.countGenerator) {
          if (!afterPause) {
            this.gameLengthCount = this.countGenerator.next();
          }
          if (this.gameLengthCount && !this.gameLengthCount.done && this.getPlayState && !this.getPauseState) {
            await this.startGenerator(this.gameLengthCount.value, afterPause);
            await new Promise((resolve) => {
              setTimeout(() => { resolve() }, 1000)
            });
            if (this.getPlayState && !this.getPauseState) {
              this.SET_SPEED();
              await this.gameLengthCycle();
            }
          }
        }
      },
      async gameCycling(afterPause) {
        this.SET_PLAY(true);
        setTimeout(() => { this.angleGenerator() });
        if (!afterPause) {
          this.countGenerator = this.cycleCounter();
        }
        await this.gameLengthCycle(afterPause);
        this.SET_PLAY(false);
      }
    },
    computed: {
      ...mapGetters({
        getPauseState: 'getPauseState',
        getPlayState: 'getPlayState',
        getFallingShape: 'getFallingShape',
        getMomentumLeft: 'getMomentumLeft',
        getMomentumRight: 'getMomentumRight',
        getMomentumInertia: 'getMomentumInertia',
        getAngle: 'getAngle',
        getAnglePercent: 'getAnglePercent',
        getSpeed: 'getSpeed',
        getMomentumDiff: 'getMomentumDiff',
        getModalShow: 'getModalShow',
      }),
      pixelWidth() {
        return this.getWidth * config.pixelMultiplier
      },
      infoData() {
        return [
          { label: 'Momentum Left', text: 'Kgm', value: Math.round(this.getMomentumLeft) },
          { label: 'Momentum Right', text: 'Kgm', value: Math.round(this.getMomentumRight) },
          { label: 'Momentum of Inertia', text: 'Kgm2', value: Math.round(this.getMomentumInertia) },
          { label: 'Angle', text: '%', value: Math.round(this.getAnglePercent * 10) / 10 },
          { label: 'Speed', text: 'm/c', value: Math.round(this.getSpeed * 10) / 10 }
        ]
      },
      disabledPlayButton() {
        return this.getPlayState || this.getMomentumRight > 0
      },
      diffAngle() {
        return Math.abs(this.getAnglePercent)
      }
    },
    watch: {
      getMomentumDiff(val) {
        if (val > config.overLoad && !this.getModalShow) {
          const message = 'Extra 2​0 kgm​ on the one side';
          this.SET_GAME_OVER(message);
        }
      },
      diffAngle(val) {
        if (val >= config.overAngle && !this.getModalShow) {
          const message = 'Ups... Maximum bending percentage is 30%';
          this.SET_GAME_OVER(message);
        }
      },
      getPlayState(val) {
        if (this.gameLengthCount && this.gameLengthCount.done && !val) {
          const message = 'Congratulations! You are a winner!!!!!!';
          this.SET_GAME_OVER(message);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .controls-section{
    &__btn{
      width: 100px;
    }
    &__info-cell{
      padding: 0 10px;
      width: 170px;
      border: 1px solid $c--general-border;
      border-radius: 5px;
      line-height: 36px;
      box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
    }
    &__info-cell-caption{
      padding-left: 10px;
    }
  }
</style>
