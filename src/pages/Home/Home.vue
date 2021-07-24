<template>
  <el-container class="home">
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
        text-color="#ffffff"
        background-color="#304156"
        router
      >
        <el-menu-item index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/addtask">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加任务</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/task">
              <i class="el-icon-document"></i>
              <span slot="title">任务列表</span>
            </el-menu-item>
            <el-menu-item index="/category">
              <i class="el-icon-menu"></i>
              <span slot="title">等级列表</span>
            </el-menu-item>
            <el-menu-item index="/label">
              <i class="el-icon-price-tag"></i>
              <span slot="title">标签列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">提交反馈</span>
        </el-menu-item> -->
        <el-menu-item index="/statistics">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="icon">
          <i @click="toggleIcon" :class="iconClass"></i>
        </span>
        <!-- 头像区域 -->
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar
            ><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="password" disabled
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 修改密码 -->
    <el-dialog
      title="提示"
      :visible.sync="updateDialogVisible"
      width="30%"
      :before-close="updatehandleClose"
    >
      <el-form
        :model="updatePasswordForm"
        :rules="updatePasswordRules"
        ref="updateFormRef"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="old_password">
          <el-input
            placeholder="请输入旧密码"
            prefix-icon="el-icon-unlock"
            show-password
            v-model="updatePasswordForm.old_password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input
            placeholder="请输入新密码"
            prefix-icon="el-icon-unlock"
            show-password
            v-model="updatePasswordForm.new_password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="new_password2">
          <el-input
            placeholder="请确认新密码"
            prefix-icon="el-icon-unlock"
            show-password
            v-model="updatePasswordForm.new_password2"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateDialog">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>



<script>
export default {
  name: "home",
  data() {
    return {
      // 默认展开
      isCollapse: false,
      iconClass: "el-icon-s-fold",
      activePath: "",
      // 修改密码
      updatePasswordForm: {
        old_password: "",
        new_password: "",
        new_password2: "",
      },
      updateDialogVisible: false,
      // 密码验证规则
      updatePasswordRules: {
        old_password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
        ],
        new_password2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // // 显示激活项
    // this.showPath();
    this.activePath = this.$route.path;
  },
  // 监听路由的变化改变激活项
  watch: {
    $route(to, from) {
      this.activePath = to.path;
    },
  },
  methods: {
    toggleIcon() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        // 收起
        this.iconClass = "el-icon-s-unfold";
      } else {
        // 展开
        this.iconClass = "el-icon-s-fold";
      }
    },
    handleCommand(command) {
      switch (command) {
        case "home":
          // 跳转首页
          this.$router.push("/welcome");
          break;
        case "password":
          this.updateDialogVisible = true;
          break;
        case "logout":
          this.$confirm("确定退出登录?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              let result = await this.$axios.post("/api/logout");
              if (result.data.code == "200") {
                // 清除token
                window.localStorage.clear();
                this.$message({
                  type: "success",
                  message: result.data.msg,
                });
                this.$router.replace("/login");
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消退出登录",
              });
            });
          break;
      }
    },
    updatehandleClose() {
      this.updateDialogVisible = false;
      this.$refs["updateFormRef"].resetFields();
    },
    closeUpdateDialog() {
      this.updateDialogVisible = false;
      this.$refs["updateFormRef"].resetFields();
    },
    // 确认修改密码
    async updatePassword() {
      this.$refs["updateFormRef"].validate((valid) => {
        if (!valid) {
          return false;
        }
      });
      let data = {
        old_password: this.updatePasswordForm.old_password,
        new_password: this.updatePasswordForm.new_password,
        new_password2: this.updatePasswordForm.new_password2,
      };
      let result = await this.$axios.post("/api/password", data);
      if (result.data.code == "401") {
        this.$message({
          message: result.data.msg,
          type: "warning",
        });
      } else if (result.data.code == "200") {
        this.$message({
          message: result.data.msg,
          type: "success",
        });
        this.updateDialogVisible = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-aside {
    background-color: #304156;
    .el-menu {
      border: none;
    }
  }

  .el-header {
    background-color: #cecece;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .icon {
      font-size: 30px;
    }
    .el-dropdown {
      line-height: 60px;
      .el-dropdown-link {
        // 设置头像垂直居中
        height: 60px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>