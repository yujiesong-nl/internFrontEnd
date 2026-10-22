<template>
  <div>
    <div class="box" v-if="isLoading(eid)">
      <i class="el-icon-loading form-loading"></i>
    </div>
    <div v-if="!isLoading(eid)">
      <div :key="formData.id" v-for="formData in list(eid)" class="evaluation-txt">
        <el-link
          @click="openDialog(formData)"
          type="primary"
        >评估人：{{formData.head}} ({{formData.beginDate}} - {{formData.evaluationTime}})</el-link>
      </div>
    </div>
    <el-dialog v-if="dialogOpen" :visible.sync="dialogOpen">
      <div class="test">
        <EvaluationDetails :formData="dialogData" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import EvaluationDetails from "./EvaluationDetails";

export default {
  props: ["eid"],
  data() {
    return {
      title: "test",
      dialogOpen: false,
      dialogData: {}
    };
  },
  filters: {
    formatDate: function(date) {
      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    }
  },
  methods: {
    openDialog(val) {
      this.dialogData = val;
      this.dialogOpen = true;
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "intern/getInternEvaluationLoading",
      list: "intern/evaluationList"
    })
  },
  mounted: function() {
    this.$store.dispatch("intern/getInternEvaluationList", {
      id: this.eid,
      fun: () => {
        this.$forceUpdate();
      }
    });
  },
  components: {
    EvaluationDetails
  }
};
</script>

<style scoped>
.form-loading {
  margin-bottom: 10px;
  font-size: 48px;
}
.box {
  width: 100%;
  text-align: center;
}
.evaluation-txt {
  padding: 8px 0;
}
</style>
