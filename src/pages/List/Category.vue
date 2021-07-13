<template>
  <div class="category">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span class="categoryTitle">分类列表</span>
        <el-button @click="dialogVisible = true" type="primary"
          >添加分类</el-button
        >
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="date" label="分类名称">
        </el-table-column>
        <el-table-column align="center" prop="name" label="所含任务数量">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="">
            <el-button size="mini" @click="dialogVisible = true"
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
            placeholder="请输入新的分类名称"
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
  name: "Category",

  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogVisible: false,
      addForm: {
        name: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },

  methods: {
    handleClose() {},
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