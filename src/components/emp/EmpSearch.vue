<template>
  <div>
    <el-input
      placeholder="通过员工名搜索员工,记得回车哦..."
      clearable
      @change="keywordsChange"
      style="width: 300px;margin: 0px;padding: 0px;"
      size="mini"
      :disabled="advanceSearchViewVisible"
      @keyup.enter.native="searchEmp"
      prefix-icon="el-icon-search"
      v-model="keywords"
    ></el-input>
    <el-button
      type="primary"
      size="mini"
      style="margin-left: 5px"
      icon="el-icon-search"
      @click="searchEmp"
    >搜索</el-button>
    <el-button
      slot="reference"
      type="primary"
      size="mini"
      style="margin-left: 5px"
      @click="showAdvanceSearchView"
    >
      <i class="fa fa-lg" style="margin-right: 5px"></i>高级搜索
    </el-button>
  </div>
</template>

<script>
export default {
  name: "empSearch",
  props: [],
  data() {
    return {
      keywords: "",
      advanceSearchViewVisible: false
    };
  },
  methods: {
    keywordsChange: function(val) {
      if (val == "") {
        this.$emit("keywords-Change");
      }
    },
    searchEmp: function() {
      this.$emit("search-Emp", this.keywords);
    },
    showAdvanceSearchView: function() {
      this.$emit("show-AdvanceSearchView");
    }
  }
};
</script>
