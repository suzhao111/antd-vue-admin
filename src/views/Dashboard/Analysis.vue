<template>
  <div>
    分析分析分析
    <Chart :option="chartOption" style="height:400px" />
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import random from "lodash/random";
// import axios from "axios";
import request from "@/utils/request";

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
      //   this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //     () => random(100)
      //   );
      //   this.chartOption = { ...this.chartOption }; // 如果组件中不用深度监听
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        // url: "/api/dashbord/chart11",
        url: "/api/dashbord/chart",
        method: "GET",
        params: { ID: 12345 }
      })
        //   axios
        //     .get("/api/dashbord/chart", { params: { ID: 12345 } }) // 在config中设置代理
        .then(response => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data.map(() => random(100)) // mock数据
              }
            ]
          };
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
