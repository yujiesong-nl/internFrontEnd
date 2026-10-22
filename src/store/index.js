import Vue from "vue";
import Vuex from "vuex";
import clockIn from "./modules/clockIn";
import evaluationForm from "./modules/evaluationForm";
import intern from "./modules/intern";
import perCenter from "./modules/perCenter";
import projectMana from "./modules/projectMana";
import workType from "./modules/workType";
import manageEva from "./modules/manageEva";
import leaderEva from "./modules/leaderEva";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name:
        window.localStorage.getItem("user" || "[]") == null
          ? "未登录"
          : JSON.parse(window.localStorage.getItem("user" || "[]")).name,
      userface:
        window.localStorage.getItem("user" || "[]") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user" || "[]")).userface,
      username:
        window.localStorage.getItem("user" || "[]") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user" || "[]")).username,
      roles:
        window.localStorage.getItem("user" || "[]") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user" || "[]")).roles
    },
    routes: [],
    msgList: [],
    isDotMap: new Map(),
    currentFriend: {},
    stomp: null,
    nfDot: false
  },
  mutations: {
    initMenu(state, menus) {
      state.routes = menus;
    },
    login(state, user) {
      state.user = user;
      window.localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      window.localStorage.removeItem("user");
      window.location.reload();
    },
    toggleNFDot(state, newValue) {
      state.nfDot = newValue;
    },
    updateMsgList(state, newMsgList) {
      state.msgList = newMsgList;
    },
    updateCurrentFriend(state, newFriend) {
      state.currentFriend = newFriend;
    },
    addValue2DotMap(state, key) {
      state.isDotMap.set(key, "您有未读消息");
    },
    removeValueDotMap(state, key) {
      state.isDotMap.delete(key);
    }
  },

  modules: {
    workType,
    clockIn,
    intern,
    evaluationForm,
    perCenter,
    projectMana,
    manageEva,
    leaderEva
  }
});
