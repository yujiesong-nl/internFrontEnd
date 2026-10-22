<template>
  <div>
    <!-- Add Button -->
    <div class="btn">
      <el-button @click="addBtn()" size="mini" type="primary">添加项目</el-button>
    </div>
    <!-- DisplayTable -->
    <div>
      <el-table
        :data="projectList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        v-loading="isLoading"
      >
        <el-table-column align="left" label="编号" type="index" width="200px;"></el-table-column>
        <el-table-column align="left" label="项目名称" prop="name"></el-table-column>
        <el-table-column align="left" label="状态" prop="isDelete">
          <template slot-scope="scope">
            <div>{{scope.row.isDelete |f1}}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="200px;">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.isDelete==1?true:false"
              @click.prevent="editBtn(scope.row)"
              size="mini"
            >修改</el-button>
            <el-button
              :disabled="scope.row.isDelete==1?true:false"
              @click.prevent="delBtn(scope.row.guid)"
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Pagination -->
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        :total="total"
        @current-change="current_change"
        background
        layout="total,prev, pager, next"
      ></el-pagination>
    </div>
    <!-- Dialog -->
    <ProjectDialog
      :row="openDialog.row"
      :title="openDialog.title"
      :type="openDialog.type"
      @close-dialog="closeAddProject"
      v-if="openDialog.open"
    />
  </div>
</template>

<style>
.btn {
  text-align: right;
  margin-bottom: 20px;
}
th {
  font-size: small;
}
.el-table .warning {
  background: oldlace;
}
.pagination {
  margin-top: 10px;
}
</style>

<script>
import ProjectDialog from "./ProjectDialog";
import { mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    ProjectDialog
  },
  name: "ProjectMana",
  data() {
    return {
      total: "10",
      pagesize: 10,
      currentPage: 1,
      dialogVisible: false,
      openDialog: {
        open: false
      }
    };
  },
  filters: {
    f1(isDelete) {
      if (isDelete == "1") {
        return "已删除";
      } else {
        return "正常";
      }
    }
  },
  created() {
    this.$store.dispatch("projectMana/getProjectList");
    this.total = this.projectList.length;
  },
  computed: {
    ...mapGetters({
      projectList: "projectMana/projectList"
    }),
    ...mapState({
      isLoading: state => state.projectMana.isLoading
    })
  },
  watch: {
    projectList: {
      handler() {
        this.total = this.projectList.length;
      },
      immediate: true
    }
  },
  methods: {
    addBtn: function() {
      this.openDialog = { open: true, title: "添加", type: "add" };
    },
    closeAddProject: function() {
      this.openDialog = {
        open: false
      };
    },
    editBtn: function(row) {
      this.openDialog = { open: true, title: "编辑", type: "edit", row: row };
    },
    delBtn: function(guid) {
      this.$confirm("此操作将删除该条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(resp => {
        this.$store.dispatch("projectMana/delProject", { guid });
      });
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>
