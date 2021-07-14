<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>添加任务</span>
      </div>
      <div>
        <el-form
          :model="addTaskForm"
          :rules="addTaskRules"
          ref="addTaskFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input
              v-model="addTaskForm.name"
              placeholder="请输入任务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="category">
            <el-select v-model="categoryList" placeholder="请选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属标签" prop="labelList">
            <el-checkbox-group v-model="labelList">
              <el-checkbox label="美食" name="type"></el-checkbox>
              <el-checkbox label="活动" name="type"></el-checkbox>
              <el-checkbox label="学习" name="type"></el-checkbox>
              <el-checkbox label="生活" name="type"></el-checkbox>
              <el-checkbox label="娱乐" name="type"></el-checkbox>
              <el-checkbox label="家庭" name="type"></el-checkbox>
              <el-checkbox label="事业" name="type"></el-checkbox>
              <el-checkbox label="游戏" name="type"></el-checkbox>
              <el-checkbox label="财经" name="type"></el-checkbox>
              <el-checkbox label="体育" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="任务描述" prop="desc">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入描述内容"
              v-model="addTaskForm.desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm" type="primary">立即添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Addtask",

  data() {
    return {
      addTaskForm: {
        name: "", //名称
        desc: "", //描述
      },
      categoryList: [], // 任务分类
      labelList: [], //所属标签
      addTaskRules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        categoryList: [
          { required: true, message: "请选择...", trigger: "change" },
        ],
        labelList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一项标签",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请输入描述内容", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // this.getCategoryList();
    // this.getLabelList();
  },

  methods: {
    // 添加按钮
    submitForm() {
      this.$refs["addTaskFormRef"].validate((valid) => {
        if (!valid) {
          this.$message({
            showClose: true,
            message: "请正确填写信息",
            type: "warning",
          });
          return false;
        }
      });
    },
    // 获取分类列表
    async getCategoryList() {
      // 发送get请求
      let result = await this.$axios.get("http://localhost:3000/api/category");
      if (result.data.code == "200") {
        // 获取成功
        this.categoryList = result.data.data;
        // console.log(this.categoryList);
      }
    },
    // 获取标签列表
    async getLabelList() {
      // 发送请求
      let { data } = await this.$axios.get("http://localhost:3000/api/label");
      if (data.code == "200") {
        this.labelList = data.data;
        console.log(this.labelList);
      }
    },
    // 重置表单
    resetForm() {
      this.$refs["addTaskFormRef"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>