<template>
  <div>
    <div class="form-box">
      <div class="form-title">
        <h3>实习生实习评价表</h3>
      </div>
      <div class="form-title">
        <b>评价周期：</b>
        入职日期 {{formData.beginDate}} - {{formData.evaluationTime}}
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
        <div>{{item.radio | formatRadioValue}}</div>
        <div>{{item.comment}}</div>
      </div>
      <div class="item-row result-box">
        <div class="result">评估结果：{{formData.formResult | formatResult}}</div>
        <div class="head-box">
          评估人：
          <b>{{formData.head}}</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["formData"],
  filters: {
    formatDate: function(date) {
      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    },
    formatRadioValue: function(val) {
      return val === 1 ? "较好" : val === 2 ? "一般" : "较差";
    },
    formatResult: function(val) {
      return val === "1" ? "继续参与实习" : "淘汰";
    }
  }
};
</script>

<style scoped>
.form-box {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
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
