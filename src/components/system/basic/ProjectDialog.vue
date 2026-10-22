<template>
  <div>
    <el-dialog :title="title" :visible.sync="open" width="25%">
      <el-form :model="proForm" :rules="rules" ref="refProForm">
        <el-form-item :label-width="formLabelWidth" label="项目组名称" prop="name">
          <el-input name="name" size="mini" v-model="proForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="open = false">取 消</el-button>
        <el-button
          :disabled="!proForm.name"
          :loading="loadingbtn"
          @click="saveProject('refProForm')"
          type="primary"
        >{{loadingbtntext}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "projectDialog",
  props: ["title", "type", "row"],
  data() {
    return {
      open: true,
      loadingbtn: false,
      loadingbtntext: "确定",
      formLabelWidth: "100px",
      proForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入项目组名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      data: state => state.projectMana.data
    })
  },
  methods: {
    saveProject(refProForm) {
      if (this.row === undefined) {
        this.$refs[refProForm].validate(valid => {
          if (valid) {
            this.loadingbtn = true;
            this.loadingbtntext = "添加中...";
            this.$store.dispatch("projectMana/addProject", {
              name: this.proForm.name,
              closeLoadingbtn: () => {
                this.loadingbtn = false;
                this.loadingbtntext = "确定";
              },
              closeDialog: () => {
                this.open = false;
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[refProForm].validate(valid => {
          if (valid) {
            this.$store.dispatch("projectMana/editProject", {
              guid: this.row.guid,
              form: this.proForm
            });
            this.open = false;
          } else {
            return false;
          }
        });
      }
    }
  },
  watch: {
    open(val) {
      if (val === false) {
        this.$emit("close-dialog");
      }
    }
  },
  created() {
    const { type, row } = this;
    if (type === "edit") {
      this.proForm.name = row.name;
    }
  }
};
</script>
