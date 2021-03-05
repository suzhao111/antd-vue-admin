<template>
  <div>
    子组件名称 {{ userName }}
    <p style="color: red;background:pink;" @click="emitFatherMethod">
      父组件传来的值 {{ name }}， 点击后 使用 this.$parent.openMessage();
      触发事件
    </p>
    <p style="color: red;background:pink;" @click="openMessage">
      父组件传来的值 {{ name }}， 点击后，使用依赖注入的方法 触发事件
    </p>
    <p
      style="color: red;background:pink;"
      @click="$emit('handleClickSonMethod')"
    >
      父组件传来的值 {{ name }}， 点击后，使用 $emit('handleClickSonMethod')
      触发事件
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: [String]
  },
  data() {
    return {
      userName: "alex"
    };
  },

  beforeCreate() {
    console.log(
      "子组件    beforeCreate   ,userName",
      this.userName,
      this.$parent.$data.name
    );
  },
  created() {
    // console.log("子组件    created    ,userName", this.userName);
  },
  mounted() {
    console.log("子组件    mounted", this.$parent.$data.name);
  },
  beforeDestroy() {
    console.log("子组件  before destroy");
  },
  methods: {
    emitFatherMethod() {
      this.$parent.openMessage();
    }
  },
  inject: ["openMessage"]
};
</script>

<style></style>
