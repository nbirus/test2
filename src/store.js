import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import form from '@/store/form.js'

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState()],

  modules: {
    form,
  },

})
