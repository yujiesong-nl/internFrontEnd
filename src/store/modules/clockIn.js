import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "../../utils/api";

const state = {
  items: {},
  isLoading: false,
  error: null
};

const actions = {
  getClockInList: ({ commit }, { startTime }) => {
    state.isLoading = true;
    getRequest("/timesheet/getTimesheetList/" + startTime).then(resp => {
      commit("setClockInList", resp.data.obj);
    });
    state.isLoading = false;
  },
  createClockIn: ({ commit }, { workday, teamId, work }) => {
    const _work = {};
    _work.teamGuid = teamId;
    _work.workday = workday;
    _work.teamName = work.teamName;
    _work.startTime = work.startTime;
    _work.endTime = work.endTime;
    _work.workTypeGuid = work.workTypeGuid;
    _work.workTypeName = work.workTypeName;
    _work.comment = work.comment;

    state.isLoading = true;
    postRequest("/timesheet/addTimesheet", _work).then(resp => {
      work.guid = resp.data.obj;
      commit("addClockIn", { workday, teamId, work });
    });
    state.isLoading = false;
  },
  updateClockIn: ({ commit }, { workday, teamId, work }) => {
    const _work = {};
    _work.guid = work.guid;
    _work.startTime = work.startTime;
    _work.endTime = work.endTime;
    _work.workTypeGuid = work.workTypeGuid;
    _work.workTypeName = work.workTypeName;
    _work.comment = work.comment;
    _work.teamName = work.teamName;

    state.isLoading = true;
    putRequest("/timesheet/updateTimesheet", _work).then(
      commit("editClockIn", { workday, teamId, work })
    );
    state.isLoading = false;
  },
  deleteClockIn: ({ commit }, { teamGuid, workday, guid }) => {
    const tempWork = state.items[teamGuid].items[workday].find(
      item => item.guid === guid
    );
    commit("delClockIn", { teamGuid, workday, guid });
    deleteRequest("/timesheet/deleteTimesheet/" + guid).catch(resp => {
      commit("addClockIn", { workday, teamId: teamGuid, work: tempWork });
    });
  },
  moveClockIn: (
    { commit },
    { workId, toProjectId, toWorkDay, fromProjectId, fromWorkDay }
  ) => {
    const _work = {};
    _work.guid = workId;
    _work.teamGuid = toProjectId;
    _work.workday = toWorkDay;
    putRequest("/timesheet/moveTimesheet", _work).catch(resp => {
      commit("removeClockIn", {
        workId,
        toProjectId,
        toWorkDay,
        fromProjectId,
        fromWorkDay
      });
    });
  }
};

const mutations = {
  setClockInList: (state, data) => {
    if (Object.keys(state.items).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        state.items[key].items = {
          ...state.items[key].items,
          ...value.items
        };
      });
    } else {
      state.items = data;
    }
  },
  addClockIn: (state, { workday, teamId, work }) => {
    if (!state.items[teamId].items[workday]) {
      state.items[teamId].items[workday] = [];
    }
    state.items[teamId].items[workday].push(work);
  },
  editClockIn: (state, { workday, teamId, work }) => {
    let tempArray = state.items[teamId].items[workday];
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].guid === work.guid) {
        state.items[teamId].items[workday][i] = work;
      }
    }
  },
  delClockIn: (state, { teamGuid, workday, guid }) => {
    state.items[teamGuid].items[workday] = state.items[teamGuid].items[
      workday
    ].filter(item => item.guid != guid);
  },

  removeClockIn: (
    state,
    { workId, toProjectId, toWorkDay, fromProjectId, fromWorkDay }
  ) => {
    const moveWork = state.items[toProjectId].items[toWorkDay].find(
      item => item.guid === workId
    );
    state.items[fromProjectId].items[fromWorkDay].push(moveWork);
    state.items[toProjectId].items[toWorkDay] = state.items[toProjectId].items[
      toWorkDay
    ].filter(item => item.guid !== workId);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
