import { get } from 'lodash'

export default {

  namespaced: true,

  state: {
    forms: {},
  },

  getters: {
    getForm: state => id => get(state, `forms[${id}]`, {}),
  },

  mutations: {

    updateForm(state, form) {
      state.forms[form.id] = form.model
    },

  },

  actions: {
    setForm({ commit }, form) {
      commit('updateForm', form)
    },
  }

}