<template>
  <div>
    <el-row>
      <el-col :span="5">
        政治面貌:
        <el-select v-model="emp.politicId" style="width: 130px" size="mini" placeholder="政治面貌">
          <el-option v-for="item in politics" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        民族:
        <el-select v-model="emp.nationId" style="width: 130px" size="mini" placeholder="请选择民族">
          <el-option v-for="item in nations" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        职位:
        <el-select v-model="emp.posId" style="width: 130px" size="mini" placeholder="请选择职位">
          <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        职称:
        <el-select v-model="emp.jobLevelId" style="width: 130px" size="mini">
          <el-option v-for="item in joblevels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        聘用形式:
        <el-radio-group v-model="emp.engageForm">
          <el-radio label="劳动合同">劳动合同</el-radio>
          <el-radio style="margin-left: 15px" label="劳务合同">劳务合同</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="5">
        所属部门:
        <el-popover v-model="showOrHidePop" placement="right" title="请选择部门" trigger="manual">
          <el-tree
            :data="departments"
            :default-expand-all="true"
            :props="defaultProps"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          ></el-tree>
          <div
            slot="reference"
            style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"
            @click="showDepTree"
            v-bind:style="{color: depTextColor}"
          >{{emp.departmentName}}</div>
        </el-popover>
      </el-col>
      <el-col :span="10">
        入职日期:
        <el-date-picker
          v-model="beginDateScope"
          unlink-panels
          size="mini"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" :offset="4">
        <el-button size="mini" @click="cancelSearch">取消</el-button>
        <el-button icon="el-icon-search" type="primary" size="mini" @click="searchAdvanced">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EmpAdvancedSearch",
  props: ["politics", "nations", "positions", "joblevels", "deps"],
  data() {
    return {
      emp: {
        politicId: "",
        nationId: "",
        posId: "",
        jobLevelId: "",
        engageForm: "",
        departmentId: "",
        departmentName: "所属部门..."
      },
      showOrHidePop: false,
      depTextColor: "#c0c4cc",
      beginDateScope: "",
      defaultProps: {
        label: "name",
        isLeaf: "leaf",
        children: "children"
      },
      departments: []
    };
  },
  methods: {
    handleNodeClick(data) {
      this.emp.departmentName = data.name;
      this.emp.departmentId = data.id;
      this.showOrHidePop = false;
      this.depTextColor = "#606266";
    },
    showDepTree() {
      this.showOrHidePop = !this.showOrHidePop;
    },
    searchAdvanced: function() {
      this.$emit("search-Advanced", this.emp, this.beginDateScope);
    },
    cancelSearch: function() {
      (this.emp = {
        politicId: "",
        nationId: "",
        posId: "",
        jobLevelId: "",
        engageForm: "",
        departmentId: "",
        departmentName: "所属部门..."
      }),
        (this.beginDateScope = "");
      this.$emit("cancel-Search");
    }
  },
  mounted() {
    this.departments = this.deps;
  }
};
</script>
