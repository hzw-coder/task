<template>
  <div class="task">
    <div class="search">
      <el-input
        clearable
        v-model="params.name"
        placeholder="输入任务名称进行搜索"
      ></el-input>
      <div class="selection">
        <label>任务等级：</label>
        <el-select v-model="params.category_id" clearable placeholder="请选择">
          <el-option
            v-for="item in cateOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="selection">
        <label>标签分类：</label>
        <el-select v-model="params.label_id" clearable placeholder="请选择">
          <el-option
            v-for="item in labelOptions"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchbtn">
        <el-button @click="searchTask" type="primary">查询</el-button>
      </div>
    </div>
    <el-card shadow="hover" class="box-card">
      <el-table
        :data="taskTableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="name"
          label="任务名称"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="description" label="任务描述"> </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                showEditTask(
                  scope.row.id,
                  scope.row.name,
                  scope.row.description
                )
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="deleteTask(scope.row.id)"
              type="primary"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.curPage"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="edithandleClose"
    >
      <el-form
        :model="editTaskForm"
        :rules="ediTtaskRules"
        ref="editFormRef"
        class="demo-ruleForm"
      >
        <el-form-item label="任务名称" prop="name">
          <el-input
            placeholder="请输入任务名称"
            v-model="editTaskForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入任务描述"
            v-model="editTaskForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "task",
  mounted() {
    this.getTaskList();
    this.getAllCategoryList();
    this.getAllLabelList();
  },
  data() {
    return {
      cateOptions: [],
      labelOptions: [],
      params: {
        name: "",
        category_id: "",
        label_id: "",
        curPage: 1, //当前页
        pageSize: 5, //每页数量
      },
      taskTableData: [],
      total: 0,
      editDialogVisible: false,
      // 修改表单
      editTaskForm: {},
      nameValue: "",
      descriptValue: "",
      ediTtaskRules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入任务描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取等级列表
    async getAllCategoryList() {
      let { data } = await this.$axios.get("/api/category");
      if (data.code == "200") {
        this.cateOptions = data.data;
      }
    },
    // 获取标签列表
    async getAllLabelList() {
      let { data } = await this.$axios.get("/api/label");
      if (data.code == "200") {
        this.labelOptions = data.data;
      }
    },
    // 获取任务列表
    async getTaskList() {
      // 发送请求
      let { data } = await this.$axios.get("/api/task", {
        params: this.params,
      });
      if (data.code == "200") {
        // 成功
        this.taskTableData = data.data;
        this.total = data.total;
      }
    },
    async showEditTask(id, name, desc) {
      this.nameValue = name;
      this.descriptValue = desc;
      this.editDialogVisible = true;
      // 请求单条任务
      let { data } = await this.$axios.get("/api/singletask", {
        params: { id: id },
      });
      if (data.code !== "200") {
        this.$message({
          type: "error",
          message: "获取失败!",
        });
        return;
      }
      this.editTaskForm = data.data[0];
    },
    async editTask() {
      if (
        this.nameValue == this.editTaskForm.name &&
        this.descriptValue == this.editTaskForm.description
      ) {
        // 没有修改,直接保存
        this.$message({
          showClose: true,
          message: "您未做出修改",
          type: "warning",
        });
        this.editDialogVisible = false;
        return;
      }
      this.$refs["editFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      // 发请求
      let data = {
        id: this.editTaskForm.id,
        name: this.editTaskForm.name,
        description: this.editTaskForm.description,
      };
      let result = await this.$axios.post("/api/edittask", data);
      if (result.data.code !== "200") {
        this.$message({
          showClose: true,
          message: "修改失败",
          type: "error",
        });
        return;
      } else {
        // 成功
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      }
      this.editDialogVisible = false;
      this.getTaskList();
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize;
      this.getTaskList();
    },
    handleCurrentChange(newPage) {
      this.params.curPage = newPage;
      this.getTaskList();
    },
    // 搜索框方法
    searchTask() {
      this.getTaskList();
    },
    // 标记完成
    deleteTask(id) {
      this.$confirm("确定完成该任务么, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$axios.delete("/api/task", {
            data: { id: id },
          });
          if (result.data.code !== "200") {
            this.$message({
              type: "error",
              message: "标记失败!",
            });
          }
          // 成功
          this.getTaskList();
          this.$message({
            type: "success",
            message: "标记成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消完成",
          });
        });
    },
    edithandleClose() {
      this.editDialogVisible = false;
      this.$refs["editFormRef"].resetFields();
    },
    closeEditDialog() {
      this.editDialogVisible = false;
      // 重置表单
      this.$refs["editFormRef"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.task {
  .search {
    display: flex;
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    background-color: #b3c0d1;
    box-sizing: border-box;
    .el-input {
      flex: 5;
    }
    .selection {
      display: flex;
      justify-content: center; //主轴方向居中对齐
      align-items: center; //侧轴方向居中对齐
      flex: 8;
    }
    .searchbtn {
      flex: 3;
    }
  }
  .el-card {
    margin-top: 20px;
    .el-table {
      margin-bottom: 20px;
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>