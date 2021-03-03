<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/map/js/china.js"; //引入zhongguo 地图
import debounce from "lodash/debounce"; // 防抖
import { addListener, removeListener } from "resize-detector"; // 监听
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // option: {
    //   handle(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    console.log("溢出");
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chartDom = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>
