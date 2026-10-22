<template>
  <el-tooltip
    :style="{'background-color':work.workTypeColor}"
    :content="work.comment"
    :disabled="work.comment && work.comment.length > 0 ? false : true"
    :id="work.guid"
    class="item"
    effect="dark"
    placement="top-start"
  >
    <div>
      <div class="del-button">
        <el-button @click.prevent="del()" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
      <div @click="openDialog()" class="work">
        <div class="work-type">{{ work.workTypeName }}</div>
        <div class="time-txt">工作时间</div>
        <div class="time">{{ work.startTime |dateFilter }}-{{ work.endTime | dateFilter}}</div>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "WorkComponent",
  props: ["work", "editWorkDialog", "addTime", "teamId", "teamName"],
  methods: {
    openDialog: function() {
      const {
        addTime,
        teamId,
        teamName,
        work: { guid },
        work: { workTypeGuid },
        editWorkDialog
      } = this;
      editWorkDialog(addTime, teamId, teamName, guid, workTypeGuid);
    },
    del: function() {
      const {
        addTime,
        teamId,
        work: { guid }
      } = this;
      this.$store.dispatch("clockIn/deleteClockIn", {
        teamGuid: teamId,
        workday: addTime,
        guid
      });
    }
  },
  filters: {
    dateFilter(date) {
      let i = date.indexOf(" ");
      return date.substr(i + 1, 5);
    }
  }
};
</script>
