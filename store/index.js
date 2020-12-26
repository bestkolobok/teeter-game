import types from '~/store/mutation-types';

export default {
  namespaced: true,
  state() {
    return {
      angle: 0
      // users: []
    }
  },
  mutations: {
    [types.SET_ANGLE](state, angle) {
      state.angle = angle; 
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
    getAngle: ({ angle }) => angle
  }
}
