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
        <el-menu-item @click="showPath" index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item @click="showPath" index="/addtask">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加任务</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="showPath" index="/task">
              <i class="el-icon-document"></i>
              <span slot="title">任务列表</span>
            </el-menu-item>
            <el-menu-item @click="showPath" index="/category">
              <i class="el-icon-menu"></i>
              <span slot="title">分类列表</span>
            </el-menu-item>
            <el-menu-item @click="showPath" index="/label">
              <i class="el-icon-price-tag"></i>
              <span slot="title">标签列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item @click="showPath" index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">提交反馈</span>
        </el-menu-item>
        <el-menu-item @click="showPath" index="5">
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
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
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
    };
  },
  mounted() {
    // 显示激活项
    this.showPath();
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
    showPath() {
      this.activePath = this.$route.path;
    },
    handleCommand(command) {
      switch (command) {
        case "home":
          // 跳转首页
          this.$router.push("/welcome");
          // 改变激活菜单
          this.activePath = "/welcome";
          break;
        case "personal":
          this.$message({
            message: "功能暂未开放,请期待",
            type: "warning",
          });
          break;
        case "logout":
          this.$confirm("确定退出登录?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              // 清除token
              window.localStorage.clear();
              this.$message({
                type: "success",
                message: "退出登录成功!",
              });
              // 跳转到登录页面
              // this.$router.replace("/login");
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