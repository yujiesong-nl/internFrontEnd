<template>
  <div>
    <el-upload
      :show-file-list="false"
      accept="application/vnd.ms-excel"
      action="/employee/basic/importEmp"
      :on-success="fileUploadSuccess"
      :on-error="fileUploadError"
      :disabled="fileUploadBtnText=='正在导入'"
      :before-upload="beforeFileUpload"
      style="display: inline"
    >
      <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'">
        <i class="fa fa-lg fa-level-up" style="margin-right: 5px"></i>
        {{fileUploadBtnText}}
      </el-button>
    </el-upload>
    <el-button type="success" size="mini" @click="exportEmps">
      <i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>导出数据
    </el-button>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
  </div>
</template>

<script>
export default {
  name: "empManipulation",
  data() {
    return {
      fileUploadBtnText: "导入数据"
    };
  },
  methods: {
    fileUploadSuccess(response, file, fileList) {
      if (response) {
        this.$message({ type: response.status, message: response.msg });
      }
      this.loadEmps();
      this.fileUploadBtnText = "导入数据";
    },
    fileUploadError(err, file, fileList) {
      this.$message({ type: "error", message: "导入失败!" });
      this.fileUploadBtnText = "导入数据";
    },
    beforeFileUpload(file) {
      this.fileUploadBtnText = "正在导入";
    },
    exportEmps() {
      window.open("/employee/basic/exportEmp", "_parent");
    },
    showAddEmpView() {
      this.$emit("show-AddEmpView");
    }
  }
};
</script>
