<template>
  <div>
    <el-container>
      <el-header
        style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
      >
        <!-- 搜索 -->
        <div style="display: inline">
          <EmpSearch
            @keywords-Change="keywordsChange"
            @search-Emp="searchEmp"
            @show-AdvanceSearchView="showAdvanceSearchView"
          ></EmpSearch>
        </div>
        <!-- 导入导出添加 -->
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <EmpManipulation @show-AddEmpView="showAddEmpView"></EmpManipulation>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <!-- 高级搜索 -->
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible"
            >
              <EmpAdvancedSearch
                :deps="deps"
                :joblevels="joblevels"
                :nations="nations"
                :politics="politics"
                :positions="positions"
                @cancel-Search="cancelSearch"
                @search-Advanced="searchAdvanced"
              ></EmpAdvancedSearch>
            </div>
          </transition>
          <!-- 信息列表 -->
          <el-table
            :data="emps"
            @selection-change="handleSelectionChange"
            border
            size="mini"
            stripe
            style="width: 100%"
            v-loading="tableLoading"
          >
            <el-table-column align="left" type="selection" width="30"></el-table-column>
            <el-table-column align="left" fixed label="姓名" prop="name" width="90"></el-table-column>
            <el-table-column align="left" label="工号" prop="workID" width="85"></el-table-column>
            <el-table-column label="性别" prop="gender" width="50"></el-table-column>
            <el-table-column align="left" label="出生日期" width="85">
              <template slot-scope="scope">{{ scope.row.birthday | formatDate}}</template>
            </el-table-column>
            <el-table-column align="left" label="身份证号码" prop="idCard" width="150"></el-table-column>
            <el-table-column label="婚姻状况" prop="wedlock" width="70"></el-table-column>
            <el-table-column label="民族" prop="nation.name" width="50"></el-table-column>
            <el-table-column label="籍贯" prop="nativePlace" width="80"></el-table-column>
            <el-table-column label="政治面貌" prop="politicsStatus.name"></el-table-column>
            <el-table-column align="left" label="电子邮件" prop="email" width="180"></el-table-column>
            <el-table-column label="电话号码" prop="phone" width="100"></el-table-column>
            <el-table-column align="left" label="联系地址" prop="address" width="220"></el-table-column>
            <el-table-column align="left" label="所属部门" prop="department.name" width="100"></el-table-column>
            <el-table-column align="left" label="职位" prop="position.name" width="100"></el-table-column>
            <el-table-column align="left" label="职称" prop="jobLevel.name" width="100"></el-table-column>
            <el-table-column label="聘用形式" prop="engageForm"></el-table-column>
            <el-table-column align="left" label="入职日期" width="85">
              <template slot-scope="scope">{{ scope.row.beginDate | formatDate}}</template>
            </el-table-column>
            <el-table-column align="left" label="转正日期" width="85">
              <template slot-scope="scope">{{ scope.row.conversionTime | formatDate}}</template>
            </el-table-column>
            <el-table-column align="left" label="合同起始日期" width="95">
              <template slot-scope="scope">{{ scope.row.beginContract | formatDate}}</template>
            </el-table-column>
            <el-table-column align="left" label="合同截至日期" width="95">
              <template slot-scope="scope">{{ scope.row.endContract | formatDate}}</template>
            </el-table-column>
            <el-table-column align="left" label="合同期限" width="70">
              <template slot-scope="scope">{{ scope.row.contractTerm}}年</template>
            </el-table-column>
            <el-table-column align="left" label="最高学历" prop="tiptopDegree"></el-table-column>
            <el-table-column fixed="right" label="操作" width="265">
              <template slot-scope="scope">
                <el-button
                  @click="showEditEmpView(scope.row)"
                  size="mini"
                  style="padding: 3px 4px 3px 4px;margin: 2px"
                >编辑</el-button>
                <el-button
                  @click="resetEmp(scope.row.id)"
                  size="mini"
                  style="padding: 3px 4px 3px 4px;margin: 2px"
                >重置密码</el-button>
                <el-button
                  size="mini"
                  style="padding: 3px 4px 3px 4px;margin: 2px"
                  type="primary"
                >查看高级资料</el-button>
                <el-button
                  @click="deleteEmp(scope.row.id)"
                  size="mini"
                  style="padding: 3px 4px 3px 4px;margin: 2px"
                  type="danger"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 批量删除按钮 -->
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button
              :disabled="multipleSelection.length==0"
              @click="deleteManyEmps"
              size="mini"
              type="danger"
              v-if="emps.length>0"
            >批量删除</el-button>
            <!-- 分页 -->
            <el-pagination
              :current-page="currentPage"
              :hide-on-single-page="true"
              :page-size="10"
              :total="totalCount"
              @current-change="currentChange"
              background
              layout="total,prev, pager, next"
            ></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- 添加对话框 -->
    <div>
      <EmpDialog
        :deps="deps"
        :joblevels="joblevels"
        :nations="nations"
        :politics="politics"
        :positions="positions"
        :row="openDialog.row"
        :title="openDialog.title"
        :type="openDialog.type"
        @close-dialog="closeDialog"
        v-if="openDialog.open"
      ></EmpDialog>
    </div>
    <div>{{this.openDialog.title}}</div>
  </div>
</template>
<script>
import EmpSearch from "./EmpSearch";
import EmpManipulation from "./EmpManipulation";
import EmpDialog from "./EmpDialog";
import EmpAdvancedSearch from "./EmpAdvancedSearch";
export default {
  components: {
    EmpSearch,
    EmpManipulation,
    EmpDialog,
    EmpAdvancedSearch
  },
  data() {
    return {
      openDialog: {
        open: false
      },

      nations: "",
      politics: "",
      deps: [],
      positions: "",
      joblevels: "",
      emps: [],
      keyWords: "",

      advanceSearchViewVisible: false,
      beginDateScope: "",
      emp: {
        politicId: "",
        nationId: "",
        posId: "",
        jobLevelId: "",
        engageForm: "",
        departmentId: ""
      },
      tableLoading: false,
      multipleSelection: [],

      currentPage: 1,
      totalCount: 0
    };
  },
  mounted: function() {
    this.initData();
    this.loadEmps();
  },
  methods: {
    resetEmp: function(id) {
      this.putRequest("/employee/basic/ResetPasswordByEmpId", { id }).catch(
        error => {
          Message.error(" 出错了哦");
        }
      );
    },
    initData: function() {
      this.getRequest("/employee/basic/basicdata").then(resp => {
        if (resp && resp.status == 200) {
          const data = resp.data;
          this.nations = data.nations;
          this.politics = data.politics;
          this.deps = data.deps;
          this.positions = data.positions;
          this.joblevels = data.joblevels;
        }
      });
    },
    loadEmps() {
      this.tableLoading = true;
      this.getRequest(
        "/employee/basic/emp?page=" +
          this.currentPage +
          "&size=10&keywords=" +
          this.keyWords +
          "&politicId=" +
          this.emp.politicId +
          "&nationId=" +
          this.emp.nationId +
          "&posId=" +
          this.emp.posId +
          "&jobLevelId=" +
          this.emp.jobLevelId +
          "&engageForm=" +
          this.emp.engageForm +
          "&departmentId=" +
          this.emp.departmentId +
          "&beginDateScope=" +
          this.beginDateScope
      ).then(resp => {
        this.tableLoading = false;
        if (resp && resp.status == 200) {
          const data = resp.data;
          this.emps = data.emps;
          this.totalCount = data.count;
        }
      });
    },
    searchEmp: function(empName) {
      this.keyWords = empName;
      this.loadEmps();
    },
    keywordsChange: function() {
      this.loadEmps();
    },
    showAdvanceSearchView: function() {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
    },
    cancelSearch: function() {
      this.showAdvanceSearchView();
      this.loadEmps();
    },
    searchAdvanced: function(emp, beginDateScope) {
      this.emp = emp;
      this.beginDateScope = beginDateScope;
      this.loadEmps();
    },
    showAddEmpView: function() {
      this.openDialog = { open: true, title: "添加", type: "add" };
    },
    showEditEmpView: function(row) {
      this.openDialog = { open: true, title: "编辑", type: "edit", row };
    },
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.loadEmps();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteEmp: function(id) {
      this.doDelete(id);
    },
    deleteManyEmps() {
      this.$confirm(
        "此操作将删除[" + this.multipleSelection.length + "]条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let ids = "";
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids += this.multipleSelection[i].id + ",";
        }
        this.doDelete(ids);
      });
    },
    doDelete(ids) {
      this.tableLoading = true;
      var _this = this;
      this.deleteRequest("/employee/basic/emp/" + ids).then(resp => {
        _this.tableLoading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          _this.loadEmps();
        }
      });
    },
    closeDialog: function() {
      this.openDialog = {
        open: false
      };
    }
  }
};
</script>
<style>
.el-dialog__body {
  padding-top: 0px;
  padding-bottom: 0px;
}
body .el-table th.gutter {
  display: table-cell !important;
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
