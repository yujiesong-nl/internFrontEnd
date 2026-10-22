import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "../../utils/api";
import Vue from "vue";
import { Message } from "element-ui";

const state = {
  data: {},
  isLoading: false
};
const getters = {
  projectList(state) {
    var datalist = Object.values(state.data);
    return datalist.sort((a, b) => {
      if (a.isDelete != b.isDelete) {
        return a.isDelete > b.isDelete ? 1 : -1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
  }
};
const actions = {
  getProjectList: function({ commit }) {
    commit("updateLoading", true);
    getRequest("/project/getAllProject")
      .then(resp => {
        commit("setProjectMana", resp.data);
        commit("updateLoading", false);
      })
      .catch(error => {});
  },
  addProject: function({ commit }, { name, closeLoadingbtn, closeDialog }) {
    postRequest("/project/insertProject", { name })
      .then(resp => {
        commit("save", {
          guid: resp.data.obj.guid,
          name,
          isDelete: 0
        });
        closeLoadingbtn();
        closeDialog();
      })
      .catch(error => {
        closeLoadingbtn();
        Message.error("添加失败");
      });
  },

  editProject: function({ commit }, { guid, form }) {
    let temp = state.data[guid];
    commit("save", {
      guid: guid,
      name: form.name,
      isDelete: 0
    });
    putRequest("/project/updateProject", {
      id: temp.id,
      name: form.name
    }).catch(error => {
      Message.error("编辑出错");
      commit("save", temp);
    });
  },

  delProject: function({ commit }, { guid }) {
    let temp = state.data[guid];
    commit("dele", { guid });
    deleteRequest("/project/deleteByProjectId/" + temp.guid).catch(error => {
      Message.error("删除失败");
      temp.isDelete = 0;
      commit("save", temp);
    });
  }
};

const mutations = {
  setProjectMana: (state, item) => {
    state.data = item;
  },
  save: (state, { guid, name, isDelete }) => {
    Vue.set(state.data, guid, {
      guid,
      name,
      isDelete
    });
  },
  dele: (state, { guid }) => {
    state.data[guid].isDelete = 1;
  },
  updateLoading: (state, flag) => {
    Vue.set(state, "isLoading", flag);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
