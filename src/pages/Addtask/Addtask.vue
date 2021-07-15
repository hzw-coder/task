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
          <el-form-item label="任务等级" prop="selectValue">
            <el-select
              v-model="addTaskForm.selectValue"
              clearable
              placeholder="请选择等级"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属标签" prop="checkList">
            <el-checkbox-group :max="1" v-model="addTaskForm.checkList">
              <el-checkbox
                v-for="item in labelList"
                :key="item.id"
                :label="item.name"
                @change="checkChange"
              ></el-checkbox>
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
        selectValue: "", //下拉框的选中值
        checkList: [],
      },
      categoryList: [], // 任务等级
      labelList: [], //所属标签
      selectedId: "", //保存所选等级id
      checkedIdList: [], //保存所有checkbox选中的id
      addTaskRules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        selectValue: [
          {
            required: true,
            message: "请选择任务等级",
            trigger: "change",
          },
        ],
        checkList: [
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
    this.getCategoryList();
    this.getLabelList();
  },
  // 计算属性
  computed: {
    categoryId() {
      let newArr = this.categoryList.filter((x) => {
        return x.name == this.addTaskForm.selectValue;
      });
      return newArr[0].id;
    },
    labelId() {},
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
    // 获取等级列表
    async getCategoryList() {
      // 发送get请求
      let result = await this.$axios.get("http://localhost:3000/api/category");
      if (result.data.code == "200") {
        // 获取成功
        this.categoryList = result.data.data;
        console.log(this.categoryList);
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
    checkChange() {
      console.log(this.addTaskForm.checkList);
    },
  },
};
</script>

<style lang="less" scoped>
</style>