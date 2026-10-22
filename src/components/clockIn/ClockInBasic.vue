<template>
  <div class="clockIn">
    <el-row>
      <el-col :span="3">
        <div class="team-menu">
          <el-date-picker
            :clearable="false"
            class="calendar"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            type="week"
            v-model="startTime"
            @change="changeStartTime"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :key="date" :span="3" v-for="date in timeList">
        <div class="date-menu">{{ date }}</div>
      </el-col>
    </el-row>
    <div v-if="!isLoading">
      <el-row :key="index" type="flex" v-for="(value, key, index) in list">
        <el-col :span="3">
          <div class="team-name">{{ value.name }}</div>
        </el-col>
        <el-col :key="date" :span="3" class="work-box" v-for="date in timeList">
          <div class="day-box">
            <Draggable
              :id="key + '|' + date"
              group="workDate"
              filter=".add-work"
              @add="moveWork"
              @end="drag = false"
              @start="drag = true"
              v-model="value.items[date]"
            >
              <WorkComponent
                :addTime="date"
                :editWorkDialog="editWorkDialog"
                :key="work.guid"
                :teamId="key"
                :teamName="value.name"
                :work="work"
                v-for="work in value.items[date]"
              />
              <div @click="addWorkDialog(date, key,value.name)" class="add-work" slot="footer">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </Draggable>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isLoading">
      <i class="el-icon-loading clockin-loading"></i>
    </div>
    {{startTime}}
    <WorkDialog
      :workTypeGuid="openDialog.workTypeGuid"
      :addTime="openDialog.addTime"
      :teamId="openDialog.teamId"
      :teamName="openDialog.teamName"
      :title="openDialog.title"
      :type="openDialog.type"
      :workId="openDialog.workId"
      @close-dialog="closeAddWork"
      v-if="openDialog.open"
    />
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import WorkDialog from "./components/WorkDialog";
import WorkComponent from "./components/WorkComponent";
import { mapState } from "vuex";

export default {
  name: "clockIn",
  data() {
    return {
      startTime: null,
      list: {},
      oldList: {},
      drag: false,
      openDialog: {
        open: false
      },
      workTypeList: []
    };
  },
  computed: {
    timeList() {
      const list = [];
      const startTime = new Date(this.startTime);
      for (var i = -1; i < 6; i++) {
        list.push(
          this.timeFormat(
            new Date(startTime.getTime() + 24 * 60 * 60 * 1000 * i)
          )
        );
      }
      return list;
    },
    ...mapState({
      workTime: state => state.clockIn.items,
      isLoading: state => state.clockIn.isLoading
    })
  },
  methods: {
    timeFormat: function(date) {
      let day = date.getDate();
      if (day < 10) {
        day = "0" + "" + day;
      }
      let mon = date.getMonth() + 1;
      if (mon < 10) {
        mon = "0" + "" + mon;
      }
      return date.getFullYear() + "-" + mon + "-" + day;
    },
    getStartTime: function(date) {
      var weekday = date.getDay();
      date.setDate(date.getDate() - weekday + 1);
      return this.timeFormat(date);
    },
    editWorkDialog: function(addTime, teamId, teamName, workId, workTypeGuid) {
      this.openDialog = {
        open: true,
        title: "修改工作内容",
        addTime,
        teamId,
        teamName,
        type: "edit",
        workId,
        workTypeGuid
      };
    },
    closeAddWork: function() {
      this.openDialog = {
        open: false
      };
    },
    addWorkDialog: function(addTime, teamId, teamName) {
      this.openDialog = {
        open: true,
        title: "添加工作内容",
        addTime,
        teamId,
        teamName,
        type: "add"
      };
    },
    moveWork: function(evt) {
      const to = evt.to.id.split("|");
      const from = evt.from.id.split("|");
      this.$store.dispatch("clockIn/moveClockIn", {
        workId: evt.item.id,
        toProjectId: to[0],
        toWorkDay: to[1],
        fromProjectId: from[0],
        fromWorkDay: from[1]
      });
    },
    changeStartTime: function(e) {
      this.startTime = this.getStartTime(new Date(e));
      if (
        !Object.values(this.workTime).some(value => value.items[this.startTime])
      ) {
        this.$store.dispatch("clockIn/getClockInList", {
          startTime: this.startTime
        });
      }
    }
  },
  watch: {
    workTime(val) {
      this.list = val;
    }
  },
  created() {
    this.startTime = this.getStartTime(new Date());
    this.$store.dispatch("clockIn/getClockInList", {
      startTime: this.startTime
    });
    this.$store.dispatch("workType/getWorkList", {
      updateLoading: () => {}
    });
  },
  components: {
    Draggable,
    WorkDialog,
    WorkComponent
  }
};
</script>

<style>
.clockIn {
  padding-top: 40px;
}

.add-work-dialog {
  text-align: left;
}

.date-menu {
  padding: 16px 0;
  font-size: 20px;
}
.team-name {
  padding-top: 20px;
}
.add-work {
  height: 0;
  margin-bottom: 16px;
  width: 100%;
  border-radius: 5px;
  padding-top: 20%;
  padding-bottom: 20%;
  background-color: #839370;
  color: #fff;
}
.add-work i {
  font-size: 40px;
  margin-top: -20px;
}
.add-work:hover {
  background-color: #788666;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.day-box {
  padding: 16px;
  position: relative;
}
.work:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.el-tooltip {
  cursor: pointer;
}
.add-work {
  cursor: pointer;
}
.calendar.el-date-editor.el-input {
  width: 150px;
}
.calendar .el-input__inner {
  cursor: pointer;
}
.team-menu {
  padding: 8px 0;
}

.work {
  padding: 8px;
  text-align: left;
  border-radius: 5px;
  margin-bottom: 16px;
  position: relative;
}
.work-type {
  text-transform: capitalize;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}
.time-txt {
  font-size: 8px;
}
.time {
  font-size: 16px;
  font-weight: bold;
}
.clockin-loading {
  font-size: 40px;
  margin-top: 100px;
}

.del-button {
  right: 3px;
  top: 3px;
  position: absolute;
  display: none;
}

.item {
  position: relative;
}

.item:hover .del-button {
  display: block;
  z-index: 100;
}
</style>
