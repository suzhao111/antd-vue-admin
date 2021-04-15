<template>
  <div>
    <a-date-picker @change="onChange" />

    <Chart :option="chartOption" style="height:400px" />
    <chartCode></chartCode>

    <Chart :option="mapChartOption" style="height:400px; widht: 400px" />
    <Chart :option="lineChartOption" style="height:600px;" />
    <Chart :option="pieChartOption" style="height:600px;" />
  </div>
</template>

<script>
import chartCode from "!!raw-loader!@/components/Chart";
// import Chart from "@/components/Chart";
import random from "lodash/random";
// import axios from "axios";
import request from "@/utils/request";

export default {
  components: {
    // Chart,
    chartCode,
    Chart: () => import("@/components/Chart") // 异步加载组件
  },
  data() {
    return {
      chartOption: {},
      lineChartOption: {
        title: {
          text: "折线图"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      },
      mapChartOption: {},
      pieChartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    this.getCompChartData();
    this.interval = setInterval(() => {
      this.getChartData();
      this.getCompChartData();
      this.getPieChartData();
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
              text: "柱状图"
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
    },

    getCompChartData() {
      this.mapChartOption = {
        title: {
          text: "中国地图"
        },
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: ["10", "23", "46", "55", "5"]
        },
        visualMap: {
          min: 0,
          max: 100,
          left: "10%",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          color: ["#0b50b9", "#c3e2f4"]
        },
        selectedMode: "single",
        series: [
          {
            name: "数量",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowOffsetX: 10,
                shadowOffsetY: 10,
                shadowBlur: 10,
                borderWidth: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: random(100) },
              { name: "天津", value: random(100) },
              { name: "上海", value: random(100) },
              { name: "重庆", value: random(100) },
              { name: "河北", value: random(100) },
              { name: "河南", value: random(100) },
              { name: "云南", value: random(100) },
              { name: "辽宁", value: random(100) },
              { name: "黑龙江", value: random(100) },
              { name: "湖南", value: random(100) },
              { name: "安徽", value: random(100) },
              { name: "山东", value: random(100) },
              { name: "新疆", value: random(100) },
              { name: "江苏", value: random(100) },
              { name: "浙江", value: random(100) },
              { name: "江西", value: random(100) },
              { name: "湖北", value: random(100) },
              { name: "广西", value: random(100) },
              { name: "甘肃", value: random(100) },
              { name: "山西", value: random(100) },
              { name: "内蒙古", value: random(100) },
              { name: "陕西", value: random(100) },
              { name: "吉林", value: random(100) },
              { name: "福建", value: random(100) },
              { name: "贵州", value: random(100) },
              { name: "广东", value: random(100) },
              { name: "青海", value: random(100) },
              { name: "西藏", value: random(100) },
              { name: "四川", value: random(100) },
              { name: "宁夏", value: random(100) },
              { name: "海南", value: random(100) },
              { name: "台湾", value: random(100) },
              { name: "香港", value: random(100) },
              { name: "澳门", value: random(100) }
            ]
          }
        ]
      };
    },

    getPieChartData() {
      this.pieChartOption = {
        title: { text: "饼状图" },
        tooltip: {},
        lengend: {},
        series: [
          {
            name: "销售量",
            type: "pie",
            data: [
              { name: "西北地区", value: random(100) },
              { name: "西南地区", value: random(100) },
              { name: "东北地区", value: random(100) },
              { name: "华南地区", value: random(100) }
            ]
          }
        ]
      };
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
