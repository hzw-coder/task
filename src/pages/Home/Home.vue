<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加任务</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <i class="el-icon-document"></i>
              <span slot="title">任务列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类列表</span>
            </el-menu-item>
            <el-menu-item index="1-3">
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
      <el-header
        >欢迎来到任务系统
        <i class="el-icon-s-fold">收起</i>
        <i class="el-icon-s-unfold">展开</i>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false,
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
</style>