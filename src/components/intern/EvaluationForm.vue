<template>
  <div>
    <div v-if="isLoading">
      <i class="el-icon-loading form-loading"></i>
    </div>
    <div v-if="!isLoading" class="form-box">
      <div class="form-title">
        <h3>实习生实习评价表</h3>
      </div>
      <div class="form-title">
        <b>评价周期：</b>
        入职日期 {{formData.beginDate}} - {{toDay | formatDate}}
      </div>
      <div>
        <b>实习生名称：</b>
        {{formData.name}}
      </div>
      <div>
        <b>所在项目：</b>
        {{formData.projectName}}
      </div>
      <div class="item-row" :key="item.id" v-for="item in formData.formList">
        <div>
          <span class="item-name">{{item.itemName}}：</span>
          {{item.describe}}
        </div>
        <div>
          <el-radio-group v-model="value.radioValue[item.id]">
            <el-radio :label="1" class="good">较好</el-radio>
            <el-radio :label="2" class="ordinary">一般</el-radio>
            <el-radio :label="3" class="bad">较差</el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="value.comment[item.id]"></el-input>
        </div>
      </div>
      <div class="item-row result-box">
        <div class="result">
          评估结果：
          <el-radio-group class="result-radio" v-model="value.formResult">
            <el-radio :label="1">继续参与实习</el-radio>
            <el-radio :label="0">淘汰</el-radio>
          </el-radio-group>
        </div>
        <div class="head-box">
          评估人：
          <b>{{formData.head}}</b>
        </div>
      </div>
      <div>
        <el-button
          type="primary"
          class="form-submit"
          @click="submitForm"
          :disabled="submitDisabled"
        >提交实习生评价</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      toDay: new Date(),
      value: {
        radioValue: {},
        comment: {},
        formResult: 1
      }
    };
  },
  filters: {
    formatDate: function(date) {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      this.$confirm("请确认表单内容，提交后将无法修改！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var form = {
          id: this.$route.params.id,
          value: {
            formList: _this.formData.formList.map(item => ({
              id: item.id,
              radio: _this.value.radioValue[item.id],
              comment: _this.value.comment[item.id]
            })),
            formResult: _this.value.formResult
          },
          successFun: () => {
            _this.$router.push("/evaluation/success");
          }
        };
        _this.$store.dispatch("evaluationForm/saveEvaluationForm", form);
      });
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.evaluationForm.isLoading,
      formData: state => state.evaluationForm.data
    }),
    submitDisabled() {
      return !this.formData.formList.every(
        item => this.value.radioValue[item.id] !== undefined
      );
    }
  },
  mounted: function() {
    this.$store.dispatch(
      "evaluationForm/getEvaluationForm",
      this.$route.params.id
    );
  }
};
</script>

<style scoped>
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
.item-row {
  padding-top: 16px;
}
.item-name {
  font-weight: bold;
  color: #405229;
}
.result {
  font-weight: bold;
  font-size: 20px;
  color: #405229;
}
.result-radio {
  margin-top: 16px;
}
.result-radio-button {
  width: 200px;
}
.result-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.head-box {
  padding: 16px 16px;
}
.head-box b {
  font-weight: bold;
  font-size: 20px;
  color: #405229;
}
.form-submit {
  width: 100%;
}
.good {
  color: rgb(40, 185, 40);
  font-weight: bold;
}
.bad {
  color: rgb(185, 40, 64);
  font-weight: bold;
}
.ordinary {
  font-weight: bold;
}
</style>
