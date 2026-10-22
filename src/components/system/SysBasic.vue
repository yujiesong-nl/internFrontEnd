<template>
  <div style="margin-top: 10px">
    <el-tabs type="card" v-model="defaultTab">
      <el-tab-pane label="部门管理" name="depMana">
        <dep-mana v-if="defaultTab==='depMana'" />
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="positionMana">
        <pos-mana state="position" v-if="defaultTab==='positionMana'" />
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="jobTitleMana">
        <pos-mana state="jobtitle" v-if="defaultTab==='jobTitleMana'" />
      </el-tab-pane>
      <el-tab-pane label="权限组" name="menuRole">
        <menu-role v-if="defaultTab==='menuRole'" />
      </el-tab-pane>
      <el-tab-pane label="工作内容" name="workType">
        <work-type v-if="defaultTab==='workType'" />
      </el-tab-pane>
      <el-tab-pane label="项目管理" name="ProjectMana">
        <pro-mana v-if="defaultTab==='ProjectMana'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MenuRole from "./basic/MenuRole.vue";
import DepMana from "./basic/DepMana.vue";
import JobTitleMana from "./basic/JobTitleMana.vue";
import PosMana from "./basic/PosMana.vue";
import WorkType from "./basic/WorkType.vue";
import ProjectMana from "./basic/ProjectMana.vue";
export default {
  data() {
    return {
      defaultTab: "depMana"
    };
  },
  methods: {},
  components: {
    "menu-role": MenuRole,
    "dep-mana": DepMana,
    "jobtitle-mana": JobTitleMana,
    "pos-mana": PosMana,
    "work-type": WorkType,
    "pro-mana": ProjectMana
  }
};
</script>