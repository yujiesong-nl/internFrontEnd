import { putRequest, postRequest, getRequest } from "../../utils/api";
import { Message } from "element-ui";
import Vue from "vue";

const state = {
  empProjectsList: null,
  isLoading: false,
  pwdLoading: false,
  proLoading: false
};

const actions = {
  updatePwd: function({ commit, state }, { password, clearPwd }) {
    state.pwdLoading = true;
    putRequest("/system/hr/updatePasswordForHr", { password })
      .then(resp => {
        state.pwdLoading = false;
        clearPwd();
      })
      .catch(error => {
        state.pwdLoading = false;
        Message.error("修改密码失败！");
      });
  },

  getEmpProjects: function({ commit, state }) {
    state.isLoading = true;
    getRequest("/project/getEmpProject")
      .then(resp => {
        commit("getEmpProject", resp.data);
        state.isLoading = false;
      })
      .catch(error => {
        state.isLoading = false;
        Message.error("获取已有项目失败！");
      });
  },

  updateProject: function({ commit, state }, { projects }) {
    state.proLoading = true;
    postRequest("/project/insertProjectForEmp", { guids: projects })
      .then(resp => {
        commit("updateEmpProject", projects);
        state.proLoading = false;
      })
      .catch(error => {
        state.proLoading = false;
        Message.error("更改项目失败！");
      });
  }
};

const mutations = {
  getEmpProject: (state, projects) => {
    Vue.set(state, "empProjectsList", projects);
  },
  updateEmpProject: (state, projects) => {
    Vue.set(state, "empProjectsList", projects);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
