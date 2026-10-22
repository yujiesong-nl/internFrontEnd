import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "../../utils/api";
import { Message } from "element-ui";
import Vue from "vue";
const state = {
  data: {}
};
const getters = {
  workList(state) {
    var dataList = Object.values(state.data);
    return dataList.sort((a, b) => {
      if (a.status != b.status) {
        return a.status > b.status ? 1 : -1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
  },
  filterDel(state) {
    const _state = state.data;
    for (let key in _state) {
      if (_state[key].status) {
        Vue.delete(_state, key);
      }
    }
    return _state;
  }
};
const actions = {
  getWorkList: function({ commit }, { updateLoading }) {
    getRequest("workType/getAllWorkTypeMap")
      .then(resp => {
        updateLoading();
        commit("setWorkType", resp.data);
      })
      .catch(error => {
        updateLoading();
      });
  },
  addWork: function({ commit }, { name, color, closeLoadingbtn }) {
    postRequest("workType/insertWorkType", { name, color }).then(resp => {
      commit("save", {
        id: resp.data.obj.id,
        guid: resp.data.obj.guid,
        status: 0,
        name,
        color
      });
      closeLoadingbtn();
    });
  },
  editWork: function({ commit }, { guid, form }) {
    let temp = state.data[guid];
    commit("save", {
      guid: guid,
      id: temp.id,
      name: form.name,
      color: form.color,
      status: 0,
      result: 0
    });
    putRequest("workType/updateWorkType", {
      id: temp.id,
      name: form.name,
      color: form.color
    }).catch(error => {
      Message.error(temp.name + " 编辑失败");
      temp.result = 1;
      commit("save", temp);
    });
  },

  deleWork: function({ commit }, { guid }) {
    let temp = state.data[guid];
    commit("dele", temp.guid);
    temp.result = 0;
    deleteRequest("workType/deleteWorkTypeId" + "?id=" + temp.id).catch(
      error => {
        Message.error(temp.name + "  删除失败");
        temp.status = 0;
        temp.result = 1;
        commit("save", temp);
      }
    );
  }
};

const mutations = {
  setWorkType: (state, work) => {
    state.data = work;
  },
  save: (state, { id, guid, name, color, status, result }) => {
    Vue.set(state.data, guid, {
      id,
      guid,
      name,
      color,
      status,
      result
    });
  },

  dele: (state, guid) => {
    state.data[guid].status = 1;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
