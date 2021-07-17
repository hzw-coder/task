<template>
  <div class="label">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span class="categoryTitle">标签列表</span>
        <el-button @click="dialogVisible = true" type="primary"
          >添加标签</el-button
        >
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="date" label="标签名称">
        </el-table-column>
        <el-table-column align="center" prop="name" label="所含任务数量">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="">
            <el-button @click="dialogVisible = true" size="mini"
              >编辑</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入新的标签名称"
            v-model="addForm.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "label",

  data() {
    return {
      // 表格数据
      labelTableData: [],
      dialogVisible: false,
      addForm: {
        name: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    getTableData,
  },
};
</script>

<style lang="less" scoped>
.label {
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