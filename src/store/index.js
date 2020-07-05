import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutationTypes = {
  SET_AREAS: 'SET_AREAS'
}

export default new Vuex.Store({
  state: {
    areas: [] // 地区表
  },
  mutations: {
    [mutationTypes.SET_AREAS]: (state, areas) => {
      state.areas = areas
    }
  },
  actions: {
    updateAreas ({ commit }, areas) {
      commit(mutationTypes.SET_AREAS, areas)
    }
  },
  modules: {
  },
  getters: {
    areas: state => state.areas
  }
})
