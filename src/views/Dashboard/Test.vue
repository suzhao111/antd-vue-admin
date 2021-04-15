<template>
  <div>
    <div>
      <p>组件的自定义v-model —— {{ colorStr }}</p>
      <button @click="clickAddComp">点击加载以下组件</button>
      <CustomVModel v-if="showComp" v-model="colorStr">
        <template v-slot="slotProps">
          来自子组件的slotData中的值：{{ slotProps.slotData.website }}
        </template>
      </CustomVModel>
    </div>

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
      <!-- <li v-for="n in evenNumbers" :key="n">{{ n }}</li> -->
      <h1 ref="hello">正文： {{ value }}</h1>
      <a-button type="danger" @click="get">点击</a-button>

      <div v-on:scroll.passive="onScroll">...</div>

      <!-- <ul> -->
      <div v-for="(item, index) in list" :key="index">
        <a-input v-model="list[index]">{{ item }}</a-input>
      </div>
      <a-input v-model="list.length"></a-input>
      <!-- </ul> -->
      <a-button @click="changeArray">点击修改list[1]的值</a-button>
      <p v-for="(val, key) in obj" :key="key">{{ key }} : {{ val }}</p>
      <a-input v-model="obj.name"></a-input>
      <a-input v-model="obj.nation"></a-input>
      <a-button @click="changeObj">点击修改obj.age的值</a-button>

      <ul id="ultest" style="background: pink">
        <li>1 <span style="color: red;">你好呀</span></li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script>
import User from "@/components/User";
import CustomVModel from "@/components/CustomVModel";
import random from "lodash/random";

export default {
  components: {
    User,
    CustomVModel
    // CustomVModel: () => import("@/components/CustomVModel") // 异步加载组件
  },
  data() {
    return {
      name: "lucy",
      value: "hello world ~",
      numbers: [1, 2, 3, 4, 5],
      list: [34, 35, 67],
      obj: {
        name: "susan",
        // age: "99"
        age: { time: 911 }
      },
      colorStr: "#ccc",
      showComp: false
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
      let ul = document.getElementById("ultest");
      console.log("取出接单========", ul);
      ul.addEventListener("click", function(e) {
        console.log(e.currentTarget);
        console.log(e.target);
      });
    });
  },
  methods: {
    clickAddComp() {
      this.showComp = !this.showComp;
    },
    colorChange(e) {
      this.colorStr = e;
    },
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
    },
    onScroll() {
      console.log("正在滚动……");
    },
    changeArray() {
      //   this.obj.age = random(100);
      //   this.obj.age = 20;
      //   this.list[1] = random(100);  // 不是响应式
      //   this.list.push(random(1000));  // 响应式
      //   this.$set(this.list, 1, random(100));  // 响应式

      console.log(this.list);

      //   this.obj.age = 20;
      //   console.log(this.obj);
    },
    changeObj() {
      this.obj.age.time = random(100);
      this.obj.nation = "china";
      //   this.obj.nation = random(200);
      //   delete this.obj.name;
      //   this.$set(this.obj, "nation", "usa");
      //   this.obj.age = random(100);
      console.log(this.obj);
    }
  },
  provide: function() {
    return { openMessage: this.openMessage };
  },
  beforeDestroy() {}
};

// let ul = document.getElementById("ultest");
//
</script>

<style></style>
