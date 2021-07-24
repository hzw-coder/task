<template>
  <div class="statistics">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>数据统计</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            待完成：{{ unCompletedCount }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            上周完成：{{ lastWeekCount }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            上月完成：{{ lastMonthCount }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            已完成：{{ completedCount }}
          </div></el-col
        >
      </el-row>
    </el-card>
    <!-- 基础统计 -->
    <el-row class="dataheight">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            id="baseChart"
            style="width: 100%; height: 100%"
            ref="baseChart"
          ></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="dataheight">
      <!-- 最近一周 -->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div
            id="leftChart"
            style="width: 100%; height: 100%"
            ref="leftChart"
          ></div>
        </div>
      </el-col>
      <!-- 最近几周 -->
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <div
            id="rightChart"
            style="width: 100%; height: 100%"
            ref="rightChart"
          ></div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "statistics",
  mounted() {
    this.getData();
    // 设置图表宽度自适应
    window.addEventListener("resize", () => {
      this.baseChart.resize();
      this.leftChart.resize();
      this.rightChart.resize();
    });
    this.baseinit();
    this.leftinit();
    this.rightinit();
  },
  data() {
    return {
      baseChart: null,
      leftChart: null,
      rightChart: null,
      unCompletedCount: 0, //待完成
      lastWeekCount: 0, //上周
      lastMonthCount: 0, //上月
      completedCount: 0, //已完成
      latelyweekdata: [], //最近7天
      latelymonthdata: [], //最近几周
      leftXdata: [],
      leftYdatd: [],
      rightXdata: [],
      rightYdata: [],
    };
  },
  methods: {
    // 获取数据
    async getData() {
      // 发请求获取数据
      let { data } = await this.$axios.get("/api/data");
      if (data.code !== "200") {
        this.$message({
          type: "error",
          message: "暂无数据!",
        });
        return;
      }
      this.unCompletedCount = data.uncompletedcount;
      this.lastWeekCount = data.lastweekcount;
      this.lastMonthCount = data.lastmonthcount;
      this.completedCount = data.completedcount;
      this.latelyweekdata = data.latelyweekdata;
      this.latelymonthdata = data.latelymonthdata;
      this.latelyweekdata.forEach((item, index) => {
        // 获取x轴和y轴数据
        this.leftXdata.push(item.click_date);
        this.leftYdatd.push(item.count);
      });
      this.latelymonthdata.forEach((item, index) => {
        // 获取x轴和y轴数据
        this.rightXdata.push(item.click_date);
        this.rightYdata.push(item.count);
      });
      /*
      把绘图的方法放在$nextTick里，是因为图表不一定是固定的，
      还可能需要根据后端返回的数据动态渲染DOM结构
      */
      // 动态渲染数据
      this.$nextTick(() => {
        // 数据渲染完成后再执行
        this.baseinit();
        this.leftinit();
        this.rightinit();
      });
    },

    baseinit() {
      // 初始化
      this.baseChart = this.$echarts.init(this.$refs.baseChart);
      let option = {
        // 标题
        title: {
          text: "数据统计",
        },
        // 各种工具栏
        toolbox: {
          show: true,
          feature: {
            magicType: {
              type: ["line", "bar"],
            },
          },
        },
        color: ["#409EFF"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        // 图例组件
        legend: {
          data: [{ name: "任务数量" }],
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          type: "category",
          name: "完成情况",
          data: ["待完成", "上周完成", "上月完成", "已完成"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [
          {
            data: [
              { value: this.unCompletedCount, itemStyle: { color: "#C0C0C0" } },
              this.lastWeekCount,
              this.lastMonthCount,
              this.completedCount,
            ],
            type: "bar",
            name: "任务数量",
          },
        ],
      };
      // 传入数据
      this.baseChart.setOption(option);
    },
    leftinit() {
      // 初始化
      this.leftChart = this.$echarts.init(this.$refs.leftChart);
      // 配置数据
      let option = {
        // 标题
        title: {
          text: "近七天完成情况",
        },

        color: ["#BBFFFF"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 图例组件
        legend: {
          data: [{ name: "任务数量" }],
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          type: "category",
          data: this.leftXdata,
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [
          {
            data: this.leftYdatd,
            type: "bar",
            name: "任务数量",
          },
        ],
      };
      // 传入数据
      this.leftChart.setOption(option);
    },
    rightinit() {
      // 初始化
      this.rightChart = this.$echarts.init(this.$refs.rightChart);
      let option = {
        // 标题
        title: {
          text: "上周完成情况",
        },

        color: ["#87CEFF"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        // 图例组件
        legend: {
          data: [{ name: "任务数量" }],
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          type: "category",
          data: this.rightXdata,
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [
          {
            data: this.rightYdata,
            type: "line",
            name: "任务数量",
            smooth: true,
          },
        ],
      };
      // 传入数据
      this.rightChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.statistics {
  .el-card {
    margin-bottom: 20px;
    .grid-content {
      text-align: center;
    }
  }
  .dataheight {
    height: 500px;
    .el-col {
      height: 100%;
      div {
        height: 100%;
      }
    }
  }
}
</style>