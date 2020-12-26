import types from '~/store/mutation-types';

export default {
  namespaced: true,
  state() {
    return {
      teeterWidth: 1,
      teeterHeight: 1,
      bending: 100
    }
  },
  mutations: {
    [types.SET_BENDING](state, angle) {
      state.angle = angle;
    },
    [types.SET_TEETER_SIZE](state, { width, height }) {
      state.teeterWidth = width;
      state.teeterHeight = height;
    }
  },
  actions: {
    // async fetchUsers({ commit }) {
    //   try {
    //     const data = await this.$axios.$get(apiUrl);
    //     commit(types.SET_USERS, data);
    //   } catch (err) {
    //     console.error(err)
    //   }
    // }
  },
  getters: {
    getAngle: ({ bending, teeterWidth, teeterHeight }) => {
      const foolAngle = Math.asin( teeterHeight / ( teeterWidth / 2 ) ) * ( 180 / Math.PI );
      return foolAngle * ( bending / 100 )
    },
    getPixelWidth: ({ teeterWidth }) => teeterWidth * 100,
    getPixelHeight: ({ teeterHeight }) => teeterHeight * 100
  }
}
