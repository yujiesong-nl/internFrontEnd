import { getRequest, postRequest } from "../../utils/api";
import Vue from "vue";

const state = {
  data: {},
  isLoading: false
};

const actions = {
  getEvaluation: function({ commit }, { guid }) {
    commit("updateLoading", true);
    getRequest("/intern/judgement/getInformation/leader/" + guid)
      .then(resp => {
        commit("setEvaluation", resp.data.obj);
        commit("updateLoading", false);
      })
      .catch(resp => {
        commit("updateLoading", false);
      });
  },
  sendEvaluation: function({ commit }, { comment, guid, name }) {
    commit("updateLoading", true);
    postRequest("/intern/judgement/leader", { comment, guid, name }).then(
      resp => {
        commit("updateLoading", false);
      }
    );
  }
};

const mutations = {
  setEvaluation(state, evaluation) {
    state.data = evaluation;
  },
  updateLoading(state, flag) {
    Vue.set(state, "isLoading", flag);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
