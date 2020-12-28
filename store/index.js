import types from '~/store/mutation-types';
const getLength = (percent, teeterWidth) => (teeterWidth / 2) * (percent / 100);

export default {
  namespaced: true,
  state() {
    return {
      teeterWidth: 1,
      teeterHeight: 1,
      teeterWeight: 1,
      fallingPlaceHeight: 1,
      teeterBorderWeight: 1,
      bending: 0,
      fallingShape: null,
      leftSideShapes: [],
      rightSideShapes: [],
      speed: .5,
      pause: true,
      play: false,
      modalShow: false,
      modalText: ''
    }
  },
  mutations: {
    [types.SET_BENDING](state, bending) {
      if (bending <= -100)  {
        state.bending = -100;
      } else if (bending >= 100) {
        state.bending = 100;
      } else {
        state.bending = bending;
      }
    },
    [types.INIT_TEETER](state, { width, height, weight, fallingPlaceHeight, teeterBorderWeight }) {
      state.teeterWidth = width;
      state.teeterHeight = height;
      state.teeterWeight = weight;
      state.fallingPlaceHeight = fallingPlaceHeight;
      state.teeterBorderWeight = teeterBorderWeight
    },
    [types.INIT_FALLING_SHAPE](state, { type, weight, id, x }) {
      state.fallingShape = { id, type, weight, x, y: 100 };
    },
    [types.SET_DROPPED_SHAPES](state, getters) {
      if (state.fallingShape) {
        const addLength = (100 / Math.cos((getters.getAngle * Math.PI) / 180)) - 100;

        // const x = state.fallingShape.x * Math.cos((getters.getAngle * Math.PI) / 180);
        const x = state.fallingShape.x - addLength > 0 ? state.fallingShape.x - addLength : 0;
        state.leftSideShapes.push({ ...state.fallingShape, x });
        state.fallingShape = null;
      }
    },
    [types.SET_RIGHT_SIDE_SHAPES](state, shape) {
      state.rightSideShapes.push(shape);
    },
    [types.SET_PLAY_PAUSE](state) {
      state.pause = !state.pause;
    },
    [types.SET_PLAY](state, value) {
      state.play = value;
      state.pause = !value;
    },
    [types.SET_RESET](state) {
      state.pause = true;
      state.play = false;
      state.leftSideShapes = [];
      state.rightSideShapes = [];
      state.fallingShape = null;
      state.bending = 0;
      state.speed = .5;
      state.modalText = '';
      state.modalShow = false;

    },
    [types.SET_GAME_OVER](state, text) {
      state.pause = true;
      state.play = false;
      state.modalShow = true;
      state.modalText = text;
    },
    [types.SET_POSITION_Y](state, step) {
      if (state.fallingShape && state.fallingShape.y > 0) {
        state.fallingShape = { ...state.fallingShape, y: state.fallingShape.y - step}
      }
    },
    [types.SET_POSITION_X_LEFT](state, step) {
      if (state.fallingShape && state.fallingShape.x >= step + 8) {
        state.fallingShape = { ...state.fallingShape, x: state.fallingShape.x - step}
      }
    },
    [types.SET_POSITION_X_RIGHT](state, step) {
      if (state.fallingShape && state.fallingShape.x <= 100 - step) {
        state.fallingShape = { ...state.fallingShape, x: state.fallingShape.x + step}
      }
    },
    [types.SET_SPEED](state) {
      state.speed += .2
    },
    [types.SET_MODAL_SHOW](state, value) {
      state.modalShow = value;
    }
  },
  actions: {
    async generator({ state, commit, dispatch, getters }) {
      if (state.fallingShape && !state.pause && state.fallingShape.y > 0) {
        await new Promise((resolve) => {
          setTimeout(() => { resolve() }, 20)
        });
        commit(types.SET_POSITION_Y, state.speed / 2);
        if (state.fallingShape && getters.getOnBoardingHeight >= state.fallingShape.y) {
          commit(types.SET_DROPPED_SHAPES, getters);
        } else {
          await dispatch('generator');
        }
      }
    },
    async angleGenerator({ state, commit, dispatch, getters }) {
      const target = 20 * (getters.getMomentumRight - getters.getMomentumLeft) / getters.getMomentumInertia;
      const bending = state.bending;
      await new Promise((resolve) => {
        setTimeout(() => { resolve() }, 40)
      });
      if (state.play && !state.pause) {
        commit(types.SET_BENDING, bending + target);
        await dispatch('angleGenerator');
      }
    }
  },
  getters: {
    getAngle: ({ bending, teeterWidth, teeterHeight }) => {
      const foolAngle = Math.asin( teeterHeight / ( teeterWidth / 2 ) ) * ( 180 / Math.PI );
      return foolAngle * ( bending / 100 )
    },
    getAnglePercent: (state, { getAngle }) => (getAngle * 10) / 9,
    getSpeed: ({ speed }) => speed,
    getWidth: ({ teeterWidth }) => teeterWidth,
    getHeight: ({ teeterHeight }) => teeterHeight,
    getPauseState: ({ pause }) => pause,
    getPlayState: ({ play }) => play,
    getFallingShape: ({ fallingShape }) => fallingShape,
    getLeftSideShapes: ({ leftSideShapes }) => leftSideShapes,
    getRightSideShapes: ({ rightSideShapes }) => rightSideShapes,
    getOnBoardingHeight: ({ fallingShape, bending, teeterHeight, fallingPlaceHeight }) => {
      if (fallingShape) {
        const teeterHeightPercent = (teeterHeight / fallingPlaceHeight) * 100;
        const x = fallingShape.x / 100;
        const bend = - bending / 100;
        const h1 = teeterHeightPercent * (1 - bend);
        const h2 = (teeterHeightPercent - h1) * x;
        return h1 + h2
      } else {
        return 0
      }
    },
    getMomentumLeft({ teeterWidth }, { getLeftSideShapes, getAngle }) {
      return getLeftSideShapes.reduce((acc, el) => acc + getLength(100 - el.x, teeterWidth) * el.weight, 0) * Math.cos((getAngle * Math.PI) / 180)
    },
    getMomentumRight({ teeterWidth }, { getRightSideShapes, getAngle }) {
      return getRightSideShapes.reduce((acc, el) => acc + getLength(el.x, teeterWidth) * el.weight, 0) * Math.cos((getAngle * Math.PI) / 180)
    },
    getMomentumInertia({ teeterBorderWeight, teeterWidth }, { getLeftSideShapes, getRightSideShapes }) {
      const board = Math.pow((teeterWidth / 2), 2) * teeterBorderWeight;
      const left = getLeftSideShapes.reduce((acc, el) => acc + Math.pow((getLength(100 - el.x, teeterWidth)), 2) * el.weight, 0);
      const right = getRightSideShapes.reduce((acc, el) => acc + Math.pow(getLength(el.x, teeterWidth), 2) * el.weight, 0);
      return board + left + right
    },
    getMomentumDiff: (state, { getMomentumLeft, getMomentumRight }) => Math.abs(getMomentumLeft - getMomentumRight),
    getModalShow: ({ modalShow }) => modalShow,
    getModalText: ({ modalText }) => modalText,
  }
}
