<template>
  <el-container class="home">
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
        text-color="#ffffff"
        background-color="#304156"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加任务</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <i class="el-icon-document"></i>
              <span slot="title">任务列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类列表</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-price-tag"></i>
              <span slot="title">标签列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-comment"></i>
          <span slot="title">提交反馈</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="homeHeader">
        <span class="icon">
          <i @click="toggleIcon" :class="iconClass"></i>
        </span>
        <!-- 头像区域 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>欢迎来到任务系统</el-main>
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
    };
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

  .homeHeader {
    background-color: #cecece;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .icon {
      height: 50px;
      width: 50px;
      font-size: 30px;
    }
  }
}
</style>