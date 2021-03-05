<template>
  <div>
    <p @click="openMessage">{{ name }}</p>
    <a-button @click="example">点击更改那么</a-button>
    <span title="悬停title">一个小段落</span>
    <user
      ref="userComp"
      :name="name"
      @handleClickSonMethod="handleClickSonMethod"
    />
    <p ref="aa">姓名： {{ name }}</p>

    <h1 ref="hello">正文： {{ value }}</h1>
    <a-button type="danger" @click="get">点击</a-button>
  </div>
</template>

<script>
import User from "@/components/User";

export default {
  components: {
    User
  },
  data() {
    return {
      name: "lucy",
      value: "hello world ~"
    };
  },
  beforeCreate() {
    // console.log("before create", this.name);
  },
  created() {
    // console.log(" create", this.name);
    // let that = this;
    // that.$nextTick(function() {
    //   console.log("nextTick dom 已经更新了", that.$refs.aa.innerHTML);
    //   that.$refs.aa.innerHTML = "created中更改了按钮内容"; //写入到DOM元素
    // });
  },
  beforeMount() {
    // console.log(" beforeMount", this.name );
  },

  mounted() {
    console.log(
      " mounted",
      this.name,
      this.$refs,
      this.$refs.userComp.userName,
      this.$root
    );
    this.$nextTick(() => {
      // todo
    });
  },
  methods: {
    example() {
      // 修改数据
      let that = this;
      this.name = "韩梅梅";
      console.log("dom没有更改", that.$refs.aa.innerHTML, that.name); // DOM 还没有更新
      debugger;

      this.$nextTick(function() {
        console.log("dom更改", that.$refs.aa.innerHTML, that.name);
      });
    },
    get() {
      this.value = "你好啊";
      console.log(this.$refs["hello"].innerText);
      this.$nextTick(() => {
        console.log(this.$refs["hello"].innerText);
      });
    },
    openMessage() {
      console.log("触发openMessage");
      this.$message.info("提示框");
    },
    handleClickSonMethod() {
      console.log("触发了自定义的方法");
      this.openMessage();
    }
  },
  provide: function() {
    return { openMessage: this.openMessage };
  },
  beforeDestroy() {}
};
</script>

<style></style>
