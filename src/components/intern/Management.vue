<template>
  <div>
    <div class="intern-management-button">
      <el-button
        :loading="sandInternEvaluateLoading"
        size="mini"
        type="primary"
        @click="sendEvaluate()"
      >发送实习生评价</el-button>
    </div>
    <div>
      <el-table
        :data="internList"
        v-loading="isLoading || sandInternEvaluateLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <EvaluationList :eid="scope.row.id" />
          </template>
        </el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="school" label="毕业学院" width="180"></el-table-column>
        <el-table-column prop="head" label="负责人" width="100"></el-table-column>
        <el-table-column prop="beginDate" label="入职时间" width="100"></el-table-column>
        <el-table-column label="实习生评价" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.evaluateNumber === 0">未完成评价</span>
            <span v-if="scope.row.evaluateNumber > 0">
              已完成
              <b class="complete-evaluate">{{scope.row.evaluateNumber}}封</b> 评价
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluationResult"
          sortable
          label="评价结果"
          width="130"
          :filters="[{text: '继续参与实习', value: true}, {text: '淘汰', value: false},{text:'未评价',value:null}]"
          :filter-method="evaluationHandler"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.evaluationResult!==null"
              :type="scope.row.evaluationResult ? 'success':'warning'"
              disable-transitions
            >{{scope.row.evaluationResult ? '继续参与实习':'淘汰'}}</el-tag>
            <span v-if="scope.row.evaluationResult===null">未评价</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="signContract"
          sortable
          label="是否提交签约申请"
          width="180"
          :filters="[{text:'已提交',value:true},{text:'未提交',value:false}]"
          :filter-method="signHandler"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.signContract ? 'success' : 'warning'"
              disable-transitions
            >{{scope.row.signContract | formatSignContract}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="signType"
          label="签约申请状态"
          :filters="[{text:'未申请签约',value:null},{text:'等待负责人评价',value:0},{text:'等待部门负责人评价',value:1},{text:'已完成评价',value:2}]"
          :filter-method="signTypeHandler"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.signType!==null"
              :type="scope.row.signType===0 ? 'primary' : scope.row.signType===1 ? 'success':'warning'"
              disable-transitions
            >{{scope.row.signType===0 ? '等待负责人评价' : scope.row.signType===1 ? '等待部门负责人评价':'已完成评价'}}</el-tag>
            <span v-if="scope.row.signType===0">未申请签约</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.intern-management-button {
  margin-bottom: 20px;
  text-align: right;
}
.complete-evaluate {
  color: rgb(69, 160, 96);
}
</style>
<script>
import { mapState, mapGetters } from "vuex";
import EvaluationList from "./EvaluationList";

export default {
  data() {
    return {
      emps: [],
      multipleSelection: []
    };
  },
  filters: {
    formatSignContract: function(value) {
      return value ? "已提交" : "未提交";
    },
    formatEvaluate: function(value) {
      return value === 0
        ? "未发送评价表"
        : value === 1
        ? "已发送评价表"
        : "已填写评价表";
    }
  },
  methods: {
    evaluationHandler(value, row) {
      return row.evaluationResult === value;
    },
    signHandler(value, row) {
      return row.signContract === value;
    },
    signTypeHandler(value, row) {
      return row.signType === value;
    },
    sendEvaluate() {
      const needSandEmail = this.multipleSelection.filter(
        item => item.evaluate !== 2
      );
      if (needSandEmail.length > 0) {
        this.$confirm(
          "是否发送评价表到负责人？已评价实习生将不发送！",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.$store.dispatch("intern/sandInternEvaluate", needSandEmail);
        });
      } else {
        this.$notify({
          type: "warning",
          title: "没有选择未评价的实习生",
          message: "请选择正确的实习生",
          position: "bottom-right"
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
    ...mapGetters({
      internList: "intern/internList"
    }),
    ...mapState({
      isLoading: state => state.intern.isLoading,
      sandInternEvaluateLoading: state => state.intern.sandInternEvaluateLoading
    })
  },
  mounted: function() {
    this.$store.dispatch("intern/getInternList");
  },
  components: {
    EvaluationList
  }
};
</script>
