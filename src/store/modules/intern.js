import { getRequest, postRequest } from "../../utils/api";

import { Message } from "element-ui";

const state = {
  items: {},
  isLoading: false,
  error: null,
  sandInternEvaluateLoading: false
};

const getters = {
  internList(state) {
    var dataList = Object.values(state.items);
    return dataList.sort((a, b) => {
      if (a.evaluate != b.evaluate) {
        return a.evaluate > b.evaluate ? 1 : -1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
  },
  evaluationList: state => id => {
    return state.items[id].evaluationList
      ? Object.values(state.items[id].evaluationList)
      : [];
  },
  getInternEvaluationLoading: state => id => {
    return state.items[id].getInternEvaluationLoading;
  }
};

const actions = {
  getInternList: ({ commit, state }) => {
    state.isLoading = true;
    getRequest("intern/sandinternevaluate")
      .then(resp => {
        commit("setIntern", resp.data);
      })
      .catch(error => {
        state.isLoading = false;
        Message.error(error.msg);
      });
  },
  sandInternEvaluate: ({ commit, state }, sandList) => {
    state.sandInternEvaluateLoading = true;
    postRequest("intern/sandinternevaluate", {
      eids: sandList.map(({ id }) => id)
    })
      .then(resp => {
        commit("updateEvaluate", sandList);
      })
      .catch(error => {
        state.sandInternEvaluateLoading = false;
        Message.error(error.msg);
      });
  },
  getInternEvaluationList: ({ commit, state }, { id, fun }) => {
    state.items[id].getInternEvaluationLoading = true;
    fun();
    getRequest("/intern/getInternEvaluationList/" + id)
      .then(resp => {
        commit("setInternEvaluationList", { data: resp.data, id });
        fun();
      })
      .catch(error => {
        state.items[id].getInternEvaluationLoading = false;
        fun();
        Message.error(error.msg);
      });
  }
};

const mutations = {
  setIntern: (state, items) => {
    state.isLoading = false;
    state.items = items;
  },
  updateEvaluate: (state, sandList) => {
    state.sandInternEvaluateLoading = false;
    sandList.forEach(element => {
      state.items[element.id].evaluate = 1;
    });
  },
  setInternEvaluationList: (state, { data, id }) => {
    state.items[id].getInternEvaluationLoading = false;
    state.items[id].evaluationList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
