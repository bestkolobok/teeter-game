import config from "~/static/settings";
export default {
  methods: {
    randomGenerator({ min = 0, max = 1 }) {
      return min + Math.round(Math.random() * max);
    },
    getRandomType() {
      const randomNumber = this.randomGenerator({ min: 1, max: 300 });
      return (randomNumber % 3) + 1;
    },
    getRandomWeight(limits) {
      const minConfig = (limits && limits.min && limits.min > config.minWeight) || config.minWeight;
      const maxConfig = (limits && limits.max && limits.max < config.maxWeight) || config.maxWeight;
      return this.randomGenerator({ min: minConfig, max: maxConfig })
    },
    getRandomPosition() {
      return this.randomGenerator({ min: 10, max: 88 })
    },
    *cycleCounter() {
      let count = 1;
      while (count <= config.gameLength) yield count++;
    }
  }
}
