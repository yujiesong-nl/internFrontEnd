<template>
  <div>
    <div v-if="isLoading">
      <i class="el-icon-loading form-loading"></i>
    </div>
    <div class="form-box" v-if="!isLoading">
      <div class="form-title">
        <h3>实习生三方签约申请</h3>
      </div>
      <div>
        <b>评估历史</b>
      </div>
      <div>
        <EvaluationList :eid="evaluation.id" />
      </div>
      <div>
        <div style="float:left;margin-right:50%">
          <span
            class="item-name"
          >申请时间：{{evaluation.internDate?evaluation.internDate:null | dateFilter}}</span>
        </div>
        <div>
          <span class="item-name">申请人：{{evaluation.internName ? evaluation.internName : null}}</span>
        </div>
      </div>
      <div>
        <div>
          <span class="item-name">申请人评价：</span>
        </div>
        <div class="comment">
          <p>{{evaluation.internComment ? evaluation.internComment : null}}</p>
        </div>
      </div>

      <div>
        <div style="float:left;margin-right:50%">
          <span class="item-name">确认时间：{{dateNow}}</span>
        </div>
        <div>
          <span class="item-name">直属领导：{{evaluation.leaderName?evaluation.leaderName:null}}</span>
        </div>
      </div>
      <div>
        <div>
          <span class="item-name">直属领导评价：</span>
        </div>
        <div>
          <el-input :rows="2" placeholder="请输入内容" type="textarea" v-model="comment"></el-input>
        </div>
      </div>
      <div>
        <el-button
          :disabled="isLoading"
          @click="submitForm"
          class="form-submit"
          type="primary"
        >提交实习生三方签约申请</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import EvaluationList from "../intern/EvaluationList";

export default {
  components: {
    EvaluationList
  },
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.leaderEva.isLoading,
      evaluation: state => state.leaderEva.data
    }),
    dateNow() {
      let date = new Date();
      return this.timeFormat(date);
    }
  },
  methods: {
    timeFormat(date) {
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
    submitForm() {
      this.$store.dispatch("leaderEva/sendEvaluation", {
        comment: this.comment,
        guid: this.$route.params.urlKey,
        name: this.evaluation.internName
      });
    }
  },
  filters: {
    dateFilter(date) {
      let i = date.indexOf("T");
      return date.substr(0, i);
    }
  },
  created() {
    this.$store.dispatch("intern/getInternList");
    this.$store.dispatch("leaderEva/getEvaluation", {
      guid: this.$route.params.urlKey
    });
  }
};
</script>

<style scoped>
.comment {
  width: 100%;
  max-width: 1165px;
  margin: 20px auto;
  border-radius: 4px;
  padding: 16px;
}
.form-loading {
  margin-bottom: 100px;
  font-size: 48px;
}
.form-box {
  width: 100%;
  max-width: 1200px;
  border: 2px solid #ccc;
  margin: 20px auto;
  border-radius: 10px;
  padding: 16px;
}
.form-box div {
  margin-bottom: 16px;
  text-align: left;
}
.form-box .form-title {
  text-align: center;
}
.item-name {
  font-weight: bold;
  color: #405229;
}
.form-submit {
  width: 100%;
}
</style>
