<template>
  <div class="loginPage">
    <h4 class="loginTitle">登录</h4>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="ruleFormRef"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-unlock"
          show-password
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          placeholder="请输入验证码"
          v-model="loginForm.code"
          class="code"
        ></el-input>
        <img src="" style="width: 120px" alt="" />
      </el-form-item>
      <el-button style="width: 250px; margin: 0px 0px 30px 100px" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在  到 20 个字符", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
};
</script>
<style lang="less" scoped>
.loginPage {
  .loginTitle {
    text-align: center;
  }
  border-radius: 8px;
  box-shadow: 0px 0px 8px;
  margin: 150px auto;
  width: 400px;
  border: 1px solid #e0e0e0;
  .el-form {
    padding-right: 50px;
    .code {
      width: 120px;
      margin-right: 10px;
    }
  }
}
</style>