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
      <el-form-item label="验证码" prop="captcha">
        <el-input
          placeholder="请输入验证码"
          v-model="loginForm.captcha"
          class="captcha"
        ></el-input>
        <img
          class="captcha_img"
          ref="img_captchaRef"
          title="点击刷新验证码"
          src="/api/login/img_captcha"
          alt="暂无验证码"
          @click="changeCaptcha"
        />
      </el-form-item>
      <el-button
        @click="login"
        style="width: 250px; margin: 0px 0px 30px 100px"
        type="primary"
        >登录</el-button
      >
      <div class="tips">用户名:admin,密码:123456</div>
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
        captcha: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.changeCaptcha();
  },
  methods: {
    // 刷新验证码
    changeCaptcha() {
      this.$refs.img_captchaRef.src =
        "/api/login/img_captcha?time" + new Date();
    },
    // 登录
    async login() {
      // 前端预校验
      this.$refs["ruleFormRef"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let postData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        captcha: this.loginForm.captcha,
      };
      // 发送请求
      let result = await this.$axios.post("/api/login", postData);
      if (result.data.code == "200") {
        window.localStorage.setItem("token", result.data.token);
        this.$message({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        this.$router.replace("/home");
      } else if (result.data.code !== "200") {
        this.$message({
          showClose: true,
          message: result.data.msg,
          type: "error",
        });
        // 清空表单
        this.$refs["ruleFormRef"].resetFields();
        return false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.loginPage {
  .loginTitle {
    text-align: center;
    margin: 20px 0;
  }
  border-radius: 8px;
  box-shadow: 0px 0px 8px;
  margin: 150px auto;
  width: 400px;
  border: 1px solid #e0e0e0;
  .el-form {
    padding-right: 50px;
    // 验证码框
    .captcha {
      width: 120px;
      margin-right: 10px;
    }
    // 验证码图像
    .captcha_img {
      vertical-align: middle;
      width: 110px;
      height: 45px;
    }
    .tips {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>