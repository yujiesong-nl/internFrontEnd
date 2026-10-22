<template>
  <div>
    <el-dialog :title="title" :visible.sync="open" width="25%">
      <el-form :model="workForm" :rules="rules" ref="refWorkform" class="form-box">
        <el-form-item :label-width="formLabelWidth" label="工作内容" prop="name">
          <el-input name="name" size="mini" v-model="workForm.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="内容颜色" prop="color">
          <div class="color-box">
            <el-color-picker size="mini" v-model="workForm.color"></el-color-picker>
          </div>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="open = false">取 消</el-button>
        <el-button
          :loading="loadingbtn"
          @click.prevent="saveWork('refWorkform')"
          type="primary"
        >{{ loadingbtntext }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.color-box {
  text-align: left;
}
.form-box {
  padding-bottom: 24px;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  name: "workDialog",
  props: ["title", "type", "row"],
  data() {
    return {
      open: true,
      loadingbtn: false,
      loadingbtntext: "确定",
      formLabelWidth: "80px",
      workForm: {
        name: "",
        color: "#000000"
      },
      rules: {
        name: [{ required: true, message: "请输入工作内容", trigger: "blur" }],
        color: [
          { required: true, message: "请选择工作颜色", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      data: state => state.workType.data
    })
  },
  methods: {
    saveWork: function(refWorkform) {
      if (this.row === undefined) {
        this.$refs[refWorkform].validate(valid => {
          if (valid) {
            var { name, color } = this.workForm;
            this.loadingbtn = true;
            this.loadingbtntext = "添加中...";
            this.$store.dispatch("workType/addWork", {
              name,
              color,
              closeLoadingbtn: () => {
                this.loadingbtn = false;
                this.loadingbtntext = "确定";
                this.open = false;
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$store.dispatch("workType/editWork", {
          guid: this.row.guid,
          form: this.workForm
        });
        this.open = false;
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
      this.workForm.name = row.name;
      this.workForm.color = row.color;
    }
  }
};
</script>
