// 自定义 v-model
<template>
  <div>
    <input
      type="text"
      :value="text1"
      @input="$emit('change1', $event.target.value)"
    />
    <!-- 
      1、上面的input 使用了 ：value ， 而不是v-model
      2、上面的change1 和 model.event 对应
      3、text1 和 属性对应
    -->

    <slot :slotData="slotData"> </slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slotData: {
        name: "vue",
        website: "shuangyue.com"
      }
    };
  },
  model: {
    prop: "text1",
    event: "change1"
  },
  props: {
    text1: {
      type: String,
      default: ""
    }
  },
  created() {
    console.log("comp created");
  },
  beforeDestroy() {
    console.log("comp beforeDestroy");
  }
};
</script>

<style></style>
