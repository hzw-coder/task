<template>
  <div class="labels">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span class="labelsTitle">标签列表</span>
        <el-button @click="addDialogVisible = true" type="primary"
          >添加标签</el-button
        >
      </div>
      <el-table
        :data="labelsTableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="name" label="标签名称">
        </el-table-column>
        <el-table-column align="center" prop="countnum" label="所含任务数量">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditLabels(scope.row.id, scope.row.name)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="deleteLabels(scope.row.id, scope.row.countnum)"
              type="danger"
              >删除</el-button
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
    <!-- 添加对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addLabelsForm"
        :rules="addLabelsRules"
        ref="addFormRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入新的标签名称"
            v-model="addLabelsForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addLabels">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="edithandleClose"
    >
      <el-form
        :model="editLabelsForm"
        :rules="editLabelsRules"
        ref="editFormRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入新的标签名称"
            v-model="editLabelsForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editLabels">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "labels",
  mounted() {
    this.getLabelsList();
  },
  data() {
    return {
      labelsTableData: [],
      // get请求参数
      params: {
        curPage: 1, //当前页
        pageSize: 3, //每页数量
      },
      total: 0, //总数
      addDialogVisible: false,
      addLabelsForm: {
        name: "",
      },
      addLabelsRules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
      },
      saveName: "", //编辑框默认内容
      editDialogVisible: false,
      editLabelsForm: {},
      editLabelsRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },

  methods: {
    async getLabelsList() {
      // 发送请求
      let { data } = await this.$axios.get("/api/label_task", {
        params: this.params,
      });
      if (data.code == "200") {
        // 成功
        this.labelsTableData = data.data;
        this.total = data.total;
      }
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize;
      this.getLabelsList();
    },
    handleCurrentChange(newPage) {
      this.params.curPage = newPage;
      this.getLabelsList();
    },
    // 关闭对话框
    handleClose() {
      this.addDialogVisible = false;
      // 重置表单
      this.$refs["addFormRef"].resetFields();
    },
    edithandleClose() {
      this.editDialogVisible = false;
      // this.$refs["editFormRef"].resetFields();
    },
    // 取消对话框
    closeAddDialog() {
      this.addDialogVisible = false;
      // 重置表单
      this.$refs["addFormRef"].resetFields();
    },
    closeEditDialog() {
      this.editDialogVisible = false;
      // this.$refs["editFormRef"].resetFields();
    },

    // 添加
    async addLabels() {
      this.$refs["addFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let data = {
        name: this.addLabelsForm.name,
      };
      // 发送请求
      let result = await this.$axios.post("/api/addlabel", data);
      if (result.data.code !== "200") {
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "error",
        });
        return;
      } else {
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "success",
        });
        this.getLabelsList();
      }
      this.addDialogVisible = false;
      // 重置表单
      this.$refs["addFormRef"].resetFields();
    },
    // 打开编辑对话框
    async showEditLabels(id, name) {
      this.editDialogVisible = true;
      this.saveName = name;
      // 根据id查询分类
      let { data } = await this.$axios.get("/api/singlelabel", {
        params: { id: id },
      });
      if (data.code !== "200") {
        this.$message({
          type: "error",
          message: "获取失败!",
        });
        return;
      }
      this.editLabelsForm = data.data[0];
    },
    // 确认编辑
    async editLabels() {
      if (this.saveName == this.editLabelsForm.name) {
        // 没有修改,直接保存
        this.$message({
          showClose: true,
          message: "您未做出修改",
          type: "warning",
        });
        this.editDialogVisible = false;
        return;
      }
      // 预校验
      this.$refs["editFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let data = {
        id: this.editLabelsForm.id,
        name: this.editLabelsForm.name,
      };
      // 发送请求
      let result = await this.$axios.post("/api/editlabel", data);
      if (result.data.code !== "200") {
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "error",
        });
        return;
      } else {
        // 成功
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "success",
        });
      }
      this.editDialogVisible = false;
      this.getLabelsList();
    },
    // 删除
    deleteLabels(id, num) {
      this.$confirm("确定删除该标签么, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 判断是否可以删除
          if (num > 0) {
            this.$message({
              type: "error",
              message: "还有任务未完成，无法删除",
            });
            return;
          } else {
            // 发请求
            let result = await this.$axios.delete("/api/label", {
              data: { id: id },
            });
            if (result.data.code !== "200") {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
            // 成功
            this.getLabelsList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.labels {
  .el-card {
    .labelsTitle {
      margin-right: 20px;
    }
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