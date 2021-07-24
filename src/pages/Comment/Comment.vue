<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>提交反馈</span>
      </div>
      <div>
        <el-form
          :model="commentForm"
          :rules="commentRules"
          ref="commentFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="反馈标题" prop="title">
            <el-input
              v-model="commentForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="反馈描述" prop="describe">
            <el-input
              v-model="commentForm.describe"
              placeholder="请输入描述内容"
            ></el-input>
          </el-form-item>
          <el-form-item class="commentBtn">
            <el-button type="primary" @click="submitComment"
              >立即创建</el-button
            >
            <el-button @click="resetComment">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "comment",

  data() {
    return {
      commentForm: {
        title: "",
        describe: "",
      },
      //   规则
      commentRules: {
        title: [{ required: true, message: "请输入反馈标题", trigger: "blur" }],
        describe: [
          { required: true, message: "请输入描述内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 提交反馈
    async submitComment() {
      this.$refs["commentFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let data = {
        title: this.commentForm.title,
        description: this.commentForm.describe,
      };
      // 发送请求
      let result = await this.$axios.post("/api/comment", data);
      if (result.data.code !== "200") {
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "error",
        });
      } else {
        // 成功
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "success",
        });
        this.resetComment();
      }
    },
    // 重置
    resetComment() {
      this.$refs["commentFormRef"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  width: 80%;
  margin: 0 auto;
  .commentBtn {
    text-align: center;
  }
}
</style>