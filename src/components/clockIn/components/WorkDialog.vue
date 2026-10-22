<template>
  <div>
    <div>workDialog</div>
    <div>
      <el-dialog :title="title" :visible.sync="open" class="add-work-dialog">
        <el-form :model="form" :rules="rules" label-width="80px" ref="form">
          <el-form-item label="工作时间" prop="time">
            <el-time-picker
              :clearable="false"
              :editable="false"
              placeholder="选择时间范围"
              start-placeholder="开始时间"
              range-separator="至"
              end-placeholder="结束时间"
              format="HH:mm"
              value-format="HH:mm"
              is-range
              v-model="form.time"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="工作内容" prop="workTypeGuid">
            <el-radio-group :fill="this.radioColor" text-color="#000" v-model="form.workTypeGuid">
              <el-radio-button
                :key="i"
                v-for="(value,key,i) in workList"
                :label="key"
              >{{value.name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-input :rows="2" placeholder="请输入内容" type="textarea" v-model="form.comment"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="open = false">取 消</el-button>
          <el-button @click="createWorkTime()" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "addWork",
  props: [
    "title",
    "addTime",
    "teamId",
    "teamName",
    "type",
    "workId",
    "workTypeGuid"
  ],
  data() {
    return {
      open: true,
      form: {
        time: ["00:00", "23:00"],
        workTypeGuid: "",
        comment: ""
      },
      rules: {
        time: [{ required: true, message: "请输入工作时间" }]
      }
    };
  },
  computed: {
    radioColor() {
      let color = "#CC6D84";
      let work = this.workList[this.form.workTypeGuid];
      if (work) {
        color = work.color;
      }
      return color;
    },
    ...mapState({
      allData: state => state.clockIn.items
      //workList: state => state.workType.data
    }),
    ...mapGetters({
      workList: "workType/filterDel"
    })
  },
  methods: {
    createWorkTime: function() {
      const { addTime, teamId, teamName, form, type, workList, workId } = this;
      const workTypeGuid = form.workTypeGuid;
      const workTypeName = workList[workTypeGuid].name;
      const workTypeColor = workList[workTypeGuid].color;

      const work = {
        teamName,
        guid: workId,
        startTime: addTime + " " + form.time[0],
        endTime: addTime + " " + form.time[1],
        workTypeGuid,
        workTypeName,
        workTypeColor,
        comment: form.comment
      };

      if (type === "edit") {
        this.$store.dispatch("clockIn/updateClockIn", {
          workday: addTime,
          teamId,
          work
        });
      } else {
        this.$store.dispatch("clockIn/createClockIn", {
          workday: addTime,
          teamId,
          work
        });
      }

      this.open = false;
    }
  },
  watch: {
    open(val) {
      if (val === false) {
        this.$emit("close-dialog");
      }
    }
  },
  created() {
    const dateFormer = function(date) {
      let i = date.indexOf(" ");
      return date.substr(i + 1, 5);
    };

    const { type } = this;
    if (type === "edit") {
      const { allData, teamId, addTime, workId, workTypeGuid } = this;
      const workData = allData[teamId].items[addTime].find(
        items => items.guid === workId
      );
      this.form = {
        time: [dateFormer(workData.startTime), dateFormer(workData.endTime)],
        workTypeGuid: workData.workTypeGuid,
        comment: workData.comment
      };
    } else {
      const { workList } = this;
      this.form.workTypeGuid = Object.keys(workList)[0];
    }
  }
};
</script>
