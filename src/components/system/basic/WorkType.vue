<template>
  <div>
    <!-- Add Button -->
    <div class="btn">
      <el-button @click="addBtn()" size="mini" type="primary"
        >添加工作内容</el-button
      >
    </div>

    <!-- DisplayTable -->
    <div>
      <el-table
        :data="workList"
        :row-class-name="tableRowClassName"
        border
        v-loading="isLoading"
      >
        <el-table-column align="left" label="编号" prop="id"></el-table-column>
        <el-table-column
          align="left"
          label="工作内容"
          prop="name"
        ></el-table-column>
        <el-table-column align="left" label="工作内容颜色">
          <template slot-scope="scope">
            <div :style="{ background: scope.row.color }" class="color"></div>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="status_formatter"
          align="left"
          label="状态"
          prop="status"
        ></el-table-column>
        <el-table-column align="left" label="操作" width="200px;">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.status == 1 ? true : false"
              @click.prevent="editBtn(scope.row)"
              size="mini"
              >修改</el-button
            >
            <el-button
              :disabled="scope.row.status == 1 ? true : false"
              @click.prevent="deleteWork(scope.row.guid, scope.row.id)"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Dialog -->
    <WorkDialog
      :row="openDialog.row"
      :title="openDialog.title"
      :type="openDialog.type"
      @close-dialog="closeAddWorking"
      v-if="openDialog.open"
    />
  </div>
</template>

<style>
.btn {
  text-align: right;
  padding-bottom: 20px;
}
th {
  font-size: small;
}
.color {
  min-width: 10px;
  max-width: 100px;
  height: 30px;
  border-radius: 5px;
}
.el-table .delete {
  background: oldlace;
}
</style>

<script>
import WorkDialog from "./WorkDialog";
import axios from "axios";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    WorkDialog
  },
  name: "WorkType",
  data() {
    return {
      isLoading: true,
      openDialog: {
        open: false
      }
    };
  },
  created() {
    this.$store.dispatch("workType/getWorkList", {
      updateLoading: () => {
        this.isLoading = false;
      }
    });
  },
  computed: {
    ...mapGetters({
      workList: "workType/workList"
    })
  },
  methods: {
    status_formatter(row, column) {
      if (row.status === 1) {
        return "已删除";
      } else {
        return "正常";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.result === 1) {
        return "delete";
      }
      return "";
    },
    addBtn: function() {
      this.openDialog = { open: true, title: "添加", type: "add" };
    },
    closeAddWorking: function() {
      this.openDialog = {
        open: false
      };
    },
    editBtn: function(row) {
      this.openDialog = { open: true, title: "编辑", type: "edit", row: row };
    },
    deleteWork(guid) {
      this.$confirm("此操作将永久删除该条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(resp => {
        this.$store.dispatch("workType/deleWork", {
          guid
        });
      });
    }
  }
};
</script>
