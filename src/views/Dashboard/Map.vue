<template>
  <div>
    <a-date-picker @change="onChange" />

    <Chart :option="pieChartOption" style="height:600px;" />

    <!-- <pre v-highlightjs="chartCode"><code class="html"></code></pre> -->

    <!-- <chartCode></chartCode> -->
  </div>
</template>

<script>
// import chartCode from "!!raw-loader!@/components/Chart";
import Chart from "@/components/Chart";
import random from "lodash/random";

export default {
  components: {
    Chart
    // chartCode
  },
  data() {
    return {
      pieChartOption: {}
    };
  },
  mounted() {
    this.getPieChartData();
    // this.interval = setInterval(() => {
    //   this.getPieChartData();
    // }, 3000);
  },
  methods: {
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
