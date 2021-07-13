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
          <el-form-item label="任务分类" prop="region">
            <el-select v-model="addTaskForm.region" placeholder="请选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属标签" prop="type">
            <el-checkbox-group v-model="addTaskForm.type">
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
        region: "", //分类
        type: [], //所属标签
        desc: "", //描述
      },
      addTaskRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        region: [{ required: true, message: "请选择...", trigger: "change" }],
        type: [
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

    // 重置表单
    resetForm() {
      this.$refs["addTaskFormRef"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>