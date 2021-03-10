<template>
  <div>
    <p @click="openMessage">{{ name }}</p>
    <p>姓名翻转：{{ reverseName }}</p>
    <a-input v-model="name"></a-input>
    <a-input v-model="reverseName"></a-input>

    <p>
      姓名_新的，可以根据输入的翻转调整：<a-input
        v-model="reverseNewName"
      ></a-input>
    </p>
    <p>姓名翻转_新的，可以根据输入的翻转调整：{{ reverseNewName }}</p>

    <a-button @click="example">点击更改那么</a-button>
    <span title="悬停title">一个小段落</span>
    <user
      ref="userComp"
      :name="name"
      @handleClickSonMethod="handleClickSonMethod"
    />
    <p ref="aa">姓名： {{ name }}</p>
    <li v-for="n in evenNumbers" :key="n">{{ n }}</li>
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
      value: "hello world ~",
      numbers: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    reverseName: function() {
      return this.name
        .split("")
        .reverse()
        .join(""); // name是响应式依赖
      // return Date.now()   //  非响应式依赖
    },
    reverseNewName: {
      get: function() {
        return this.name
          .split("")
          .reverse()
          .join("");
      },
      set: function(val) {
        this.name = val
          .split("")
          .reverse()
          .join("");
      }
      // name是响应式依赖
      // return Date.now()   //  非响应式依赖
    },
    evenNumbers: function() {
      return this.numbers.filter(function(number) {
        return number % 2 === 0;
      });
    }
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
