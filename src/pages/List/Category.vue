<template>
  <div class="category">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span class="categoryTitle">分类列表</span>
        <el-button @click="addDialogVisible = true" type="primary"
          >添加分类</el-button
        >
      </div>
      <el-table
        :data="categoryTableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="name" label="等级名称">
        </el-table-column>
        <el-table-column align="center" prop="countnum" label="所含任务数量">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditCate(scope.row.id, scope.row.name)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="deleteCate(scope.row.id, scope.row.countnum)"
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
        :model="addCategoryForm"
        :rules="addCategoryRules"
        ref="addFormRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入新的分类名称"
            v-model="addCategoryForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
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
        :model="editCategoryForm"
        :rules="editCategoryRules"
        ref="editFormRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入新的分类名称"
            v-model="editCategoryForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Category",
  mounted() {
    this.getCategoryList();
  },
  data() {
    return {
      categoryTableData: [],
      // get请求参数
      params: {
        curPage: 1, //当前页
        pageSize: 3, //每页数量
      },
      total: 0, //总数
      addDialogVisible: false,
      addCategoryForm: {
        name: "",
      },
      addCategoryRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      saveName: "", //编辑框默认内容
      editDialogVisible: false,
      editCategoryForm: {},
      editCategoryRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },

  methods: {
    async getCategoryList() {
      // 发送请求
      let { data } = await this.$axios.get("/api/category_task", {
        params: this.params,
      });
      if (data.code == "200") {
        // 成功
        this.categoryTableData = data.data;
        this.total = data.total;
      }
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize;
      this.getCategoryList();
    },
    handleCurrentChange(newPage) {
      this.params.curPage = newPage;
      this.getCategoryList();
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
    async addCategory() {
      this.$refs["addFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let data = {
        name: this.addCategoryForm.name,
      };
      // 发送请求
      let result = await this.$axios.post("/api/addcategory", data);
      console.log(result);
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
        this.getCategoryList();
      }
      this.addDialogVisible = false;
      // 重置表单
      this.$refs["addFormRef"].resetFields();
    },
    // 打开编辑对话框
    async showEditCate(id, name) {
      this.editDialogVisible = true;
      this.saveName = name;
      // 根据id查询分类
      let { data } = await this.$axios.get("/api/singlecategory", {
        params: { id: id },
      });
      if (data.code !== "200") {
        this.$message({
          type: "error",
          message: "获取失败!",
        });
        return;
      }
      this.editCategoryForm = data.data[0];
    },
    // 确认编辑
    async editCategory() {
      if (this.saveName == this.editCategoryForm.name) {
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
        id: this.editCategoryForm.id,
        name: this.editCategoryForm.name,
      };
      // 发送请求
      let result = await this.$axios.post("/api/editcategory", data);
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
      this.getCategoryList();
    },
    // 删除
    deleteCate(id, num) {
      this.$confirm("确定删除该等级么, 是否继续?", "提示", {
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
            let result = await this.$axios.delete("/api/category", {
              data: { id: id },
            });
            if (result.data.code !== "200") {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
            // 成功
            this.getCategoryList();
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
.category {
  .el-card {
    .categoryTitle {
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