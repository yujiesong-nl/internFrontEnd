import {
  getRequest,
  postRequest,
  postRequestForJsonData
} from "../../utils/api";

import { Message } from "element-ui";

import axios from "axios";

const state = {
  data: [],
  isLoading: false
};

const getters = {};

const actions = {
  getEvaluationForm: ({ commit, state }, id) => {
    state.isLoading = true;
    getRequest("/intern/evaluationform/" + id)
      .then(resp => {
        commit("setEvaluationForm", resp.data);
      })
      .catch(error => {
        state.isLoading = false;
        Message.error(error.msg);
      });
  },
  saveEvaluationForm: ({ commit }, { id, value, successFun }) => {
    state.isLoading = true;
    postRequestForJsonData("/intern/evaluationform/" + id, value)
      .then(resp => {
        commit("setEvaluationForm", resp.data);
        successFun();
        state.isLoading = false;
      })
      .catch(error => {
        state.isLoading = false;
      });
  }
};

const mutations = {
  setEvaluationForm: (state, data) => {
    state.isLoading = false;
    state.data = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
