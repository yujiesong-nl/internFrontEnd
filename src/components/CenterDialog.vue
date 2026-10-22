<template>
  <el-dialog :title="title" :visible.sync="open" width="33%">
    <div class="form">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="姓名:">
          <span>{{user.name}}</span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户名:">
          <span>{{user.username}}</span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="新密码:" prop="password">
          <el-input style="width:200px" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确认密码:" prop="checkPassword">
          <div>
            <el-input style="width:200px" type="password" v-model="form.checkPassword"></el-input>
            <el-button
              :disabled="!(form.password && form.checkPassword)"
              :loading="pwdBtnLoading"
              @click="savePassword('form')"
              type="primary"
            >保存密码</el-button>
          </div>
        </el-form-item>
        <el-form-item
          v-if="this.user.roles[0].nameZh==='实习生'"
          :label-width="formLabelWidth"
          label="项目:"
        >
          <div v-if="!(this.getEmpProLoading || this.getAllProLoading)">
            <el-select
              multiple
              filterable
              placeholder="请选择"
              style="width:200px"
              v-model="form.projects"
            >
              <el-option
                v-for="item in projectsList"
                :key="item.guid"
                :label="item.name"
                :value="item.guid"
              ></el-option>
            </el-select>

            <el-button
              type="primary"
              @click="saveProject"
              :loading="proBtnLoading"
              :disabled="saveProjectDisable"
            >保存项目</el-button>
          </div>

          <div v-if="this.getEmpProLoading || this.getAllProLoading">
            <i class="el-icon-loading project-loading"></i>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<style>
.form {
  text-align: left;
  padding-bottom: 24px;
}
.project-loading {
  font-size: 20px;
}
</style>


<script>
import { mapGetters, mapState } from "vuex";
import { getRequest } from "../utils/api";
import Vue from "vue";

export default {
  name: "center",
  props: ["title", "dialogloading"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "80px",
      form: {
        password: "",
        checkPassword: "",
        projects: null
      },
      open: true,
      rules: {
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.projectsList.length === 0) {
      this.$store.dispatch("projectMana/getProjectList");
    }
    if (!this.empProjects) {
      this.$store.dispatch("perCenter/getEmpProjects");
    } else {
      this.form.projects = this.empProjects;
    }
  },
  watch: {
    open(val) {
      if (val === false) {
        this.$emit("close-dialog");
      }
    },
    empProjects(val) {
      if (!this.form.projects) {
        this.form.projects = val;
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    ...mapGetters({
      projectsList: "projectMana/projectList"
    }),
    ...mapState({
      empProjects: state => state.perCenter.empProjectsList,
      getEmpProLoading: state => state.perCenter.isLoading,
      getAllProLoading: state => state.projectMana.isLoading,
      pwdBtnLoading: state => state.perCenter.pwdLoading,
      proBtnLoading: state => state.perCenter.proLoading
    }),
    saveProjectDisable: function() {
      var A = this.empProjects.slice();
      var B = this.form.projects.slice();
      return (
        A.length === B.length &&
        A.every(a => B.some(b => a === b)) &&
        B.every(_b => A.some(_a => _a === _b))
      );
    }
  },
  methods: {
    savePassword(form) {
      this.$refs[form].validateField("checkPassword", valid => {
        if (!valid) {
          this.$store.dispatch("perCenter/updatePwd", {
            password: this.form.password,
            clearPwd: () => {
              (this.form.password = ""), (this.form.checkPassword = "");
            }
          });
        } else {
          return false;
        }
      });
    },
    saveProject() {
      this.$store.dispatch("perCenter/updateProject", {
        projects: this.form.projects
      });
    }
  }
};
</script>
