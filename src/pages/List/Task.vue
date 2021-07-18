<template>
  <div class="task">
    <div class="search">
      <el-input
        clearable
        v-model="taskName"
        placeholder="输入任务名称进行搜索"
      ></el-input>
      <div class="selection">
        <label>任务等级：</label>
        <el-select v-model="cateId" clearable placeholder="请选择">
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
        <el-select v-model="labelId" clearable placeholder="请选择">
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
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="date"
          label="任务名称"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="name" label="任务描述"> </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "task",
  mounted() {
    this.getAllCategoryList();
    this.getAllLabelList();
  },
  data() {
    return {
      taskName: "",
      cateOptions: [],
      labelOptions: [],
      cateId: "",
      labelId: "",
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
      currentPage: 1,
    };
  },
  methods: {
    // 获取等级列表
    async getAllCategoryList() {
      let { data } = await this.$axios.get(
        "http://localhost:3000/api/category"
      );
      if (data.code == "200") {
        this.cateOptions = data.data;
      }
    },
    // 获取标签列表
    async getAllLabelList() {
      let { data } = await this.$axios.get("http://localhost:3000/api/label");
      if (data.code == "200") {
        this.labelOptions = data.data;
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    searchTask() {
      console.log(this.cateId, this.labelId);
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