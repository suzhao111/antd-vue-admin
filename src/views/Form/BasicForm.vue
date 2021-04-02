<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'fieldA',
            {
              initialValue: fieldA,
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>

    <!-- <div class="div1">我是第一个</div>
    <div class="div2">我是第二个</div> -->

    <!-- bfc -->
    <!-- <div class="container bfc">
      <img
        class="left"
        src="https://tp-app.oss-cn-hangzhou.aliyuncs.com/ios/logo_white.png"
        alt=""
      />
      <p class="">bfc一段文字示例</p>
    </div> -->

    <!-- <div class="content">
      <div class="header">头部</div>
      <div class="container">
        <div class="center col fl">中间内容</div>
        <div class="left col fl">左侧内容</div>
        <div class="right col fl">右侧内容</div>
      </div>
      <div class="footer">footer</div>
    </div> -->
    <!-- 
    <div class="box">
      <div class="flex flex1"></div>
      <div class="flex flex2"></div>
      <div class="flex flex3"></div>
    </div> -->

    <!-- <input id="ipt" type="text" /> -->
  </div>
</template>

<script>
// import { resolve } from "dns";
export default {
  data() {
    this.form = this.$form.createForm(this); // input中就不能使用双向绑定了，而是用v-decorator将数据托管给form
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      fieldB: ""
      //   fieldAStatus: "",
      //   fieldBStatus: "",
      //   fielAHelp: "",
      //   fielBHelp: ""
    };
  },
  mounted() {
    setTimeout(() => {
      //   console.log(this.fieldA);
      this.form.setFieldsValue({ fieldA: "hello world" });
      //   console.log(this.fieldA); // 不会改变，还是hello
    }, 3000);
  },

  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          Object.assign(this, values); // 表单提交后，将数据同步给其他组件
        }
      });
    }
  }
};

// ================================== 练习  测试  ==================================
// 对象的深拷贝
// let obj1 = {
//   a: "start",
//   b: {
//     x: "hello",
//     y: 300
//   },
//   c: ["中文", "英文"]
// };
// obj1.fun = function() {
//   console.log(this.c);
// };
// obj1.prototype.publicFun = function() {
//   console.log(this.b.x);
// };
// function deepClone(startObj) {
//   let obj = startObj.constructor === Array ? [] : {};
//   for (let i in startObj) {
//     console.log(i);
//     // 如果不想拷贝原型上的属性
//     // if (startObj.hasOwnProperty(i)) {
//     if (typeof startObj[i] === "object") {
//       obj[i] = deepClone(startObj[i]);
//     } else {
//       obj[i] = startObj[i];
//     }
//     // }
//   }
//   return obj;
// }
// let copyObj = deepClone(obj1);
// console.log(copyObj);
// let obj2 = JSON.parse(JSON.stringify(obj1));
// let obj2 = JSON.stringify(obj1.fun);
// obj1.c[1] = "faguo";
// console.log(obj1, copyObj, obj2);
// copyObj.fun();
// obj1.fun();
// obj1.publicFun();
// copyObj.publicFun();
// obj2.publicFun();

// js舍入误差

// 暂时性死区
// var a = 1;
// {
//   console.log(a);
//   const a = 3; // {}中一但有let  const  块级作用域就会形成一个封闭作用域，与外界无关。在这数据声明之前访问数据，会报错，造成暂时性死区
//   console.log(a);
// }
// console.log(a);

// 闭包
// var btns = [{ name: "b1" }, { name: "b2" }, { name: "b3" }];
// function bind() {
//   for (let i = 0; i < btns.length; i++) {
//     //   for (var i = 0; i < btns.length; i++) {
//     // (function fun(a) {
//     //   btns[i].fun = function() {
//     //     console.log(a);
//     //   };
//     // })(i);

//     btns[i].fun = function() {
//       console.log(i);
//     };
//   }
// }
// bind();
// console.log(btns);
// btns[1].fun();
// btns[2].fun();
// btns[0].fun();

// 原型
// let name = "kkkkk";
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.run = function() {
//     let that = this;
//     console.log("run", that.name);
//   };
// }
// Person.prototype.run = function() {
//   console.log("run,", this.name);
// };
// Person.prototype.publicData = "public";
// let p1 = new Person("lihua", 34);
// let p2 = new Person("wagnlei", 27);
// p2.grade = { math: 90, english: 80 };
// let p4 = { ...p2, nation: "china" }; // 浅拷贝
// p2.name = "suzhao";
// p2.grade.math = 100;
// console.log(p1, p2, p4);
// p1.run();
// p2.run();

// 深拷贝可以拷贝到原型上的方法，但是此时run方法是暴露在对象中的，而不是在__proto__内部
// p1  p2 构造函数来的对象，其__proto__里面的constructor 是Person
// copy是深拷贝p2来的，其__proto__里面的constructor是Object
// let copy = deepClone(p2);
// copy.name = "susususu";
// console.log(Person.prototype);
// console.log(copy);
// copy.run();

// let p3 = {
//   name: "call test",
//   run() {
//     console.log("nihao", this.name);
//   }
// };
// p3.run();
// p3.run.call(p2);
// 以上，call的实现原理：如下三行代码
// p2.m = p3.run;
// p2.m();
// delete p2.m;

// let fn = copy.run.bind(copy);
// fn();

// Object.defineProperty(obj, property, descriptor)
// var dataObj = {};
// function reactive(obj, key, val) {
//   Object.defineProperty(obj, key, {
//     get() {
//       console.log("触发get方法=====", key, val);
//       return val;
//     },
//     set(newVal) {
//       if (newVal !== val) {
//         console.log("触发set方法=====", key, val);
//         val = newVal;
//       }
//     }
//   });
// }
// reactive(dataObj, "age", 12);
// console.log(dataObj.age);
// dataObj.age = 18;
// console.log(dataObj.age);

// promise练习++++++++++++++===================
// let p = new Promise((resolve, reject) => {
//   let a = 1;
//   if (a > 0) {
//     resolve();
//   } else {
//     reject();
//   }
// }).then(
//   () => {
//     console.log("成功");
//   },
//   () => {
//     console.log("失败");
//   }
// );
// p.then();

// function ajax(url) {
//   let xhr = new XMLHttpRequest();
//   //   xhr.overrideMimeType("application/json");
//   xhr.open("GET", url, true);
//   xhr.send();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//       if (xhr.status == 200 || xhr.status == 0) {
//         //请求本地txt文件时状态码是0。
//         alert(xhr.responseText);
//       } else {
//         alert(xhr.status);
//       }
//     }
//   };

//   xhr.onreadystatechange = function() {
//     console.log("dayin=====", xhr, xhr.status);
//     if (xhr.readyState === 4 && xhr.status === "200") {
//       console.log("请求结果========", xhr.responseText);
//     } else {
//       console.log("请求失败========", xhr.statusText);
//     }
//   };
// }
// ajax("./a.json");
// function fun(num, time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(num);
//       if (num !== 2) {
//         resolve(`${num}, 成功了`);
//         // reject(`${num}, 失败了；；；；`);
//       } else {
//         reject(`${num}, 失败了；；；；`);
//         // Promise.reject("shib");
//       }
//     }, time);
//   });
// }
// let f1 = fun(1, 1000);
// let f2 = fun(2, 2000);
// let f3 = fun(3, 3000);
// Promise.all([f1, f2, f3])
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// let arr = [1, 2, 3];
// let promiseArr = [];
// arr.forEach(item => {
//   promiseArr.push(
//     new Promise(resolve => {
//       // 这里执行一些异步操作。。。。upload()等操作
//       resolve(`url${item}`);
//     })
//   );
// });
// Promise.all(promiseArr).then(res => {
//   // 批量存入数据库
//   console.log(res);
// });

// function getImage() {
//   return new Promise(resolve => {
//     let img = new Image();
//     img.src = "www.xxx.xxx";
//     img.onload = function() {
//       resolve(img.src);
//     };
//   });
// }
// function timeout() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("加载超时了") || resolve();
//     }, 3000);
//   });
// }
// Promise.race([getImage(), timeout()])
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// let arr = ["es6", ["es7", "es8"]];
// console.log(arr.includes("es7"));

// async function foo() {
//   return "111";
// }
// console.log(foo());

// async function foo() {
//   let result = await "111";
//   console.log(result);
// }
// foo();

// function timeout(a) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (a > 0) {
//         resolve("resolve=====" + 111);
//       } else {
//         reject("reject=========" + 11111);
//       }
//     }, 1000);
//   });
// }
// async function foo() {
//   //   let result = timeout();
//   let result = await timeout(1);
//   console.log(result);
//   console.log(2);
// }
// foo();

// async function foo() {
//   return await timeout();
// }

// foo().then(res => {
//   console.log(res);
// });

// timeout()

// let obj = { name: "suzhao", age: 18 };
// console.log(Object.is(obj, {}));

// function timeout(time) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         value: time,
//         done: false
//       });
//     }, time);
//   });
// }
// const arr = [timeout(1000), timeout(2000), timeout(3000)];
// arr[Symbol.asyncIterator] = function() {
//   let nextIndex = 0;
//   return {
//     next() {
//       return nextIndex < arr.length
//         ? arr[nextIndex++]
//         : Promise.resolve({ value: undefined, done: true });
//     }
//   };
// };
// async function test() {
//   for await (let item of arr) {
//     console.log(item);
//   }
// }
// test();

// let obj1 = {
//   name: "suzhao",
//   age: 18,
//   class: 3,
//   grade: 5,
//   score: { math: 100, english: 98 }
// };
// let obj2 = { ...obj1 };
// obj1.score.math = 90;
// console.log(obj1, obj2);
// let { name, grade, ...rest } = obj1;
// console.log(name, grade, rest);

// const course = {
//   math: 100,
//   chinese: 80,
//   english: 98
// };
// let res = Object.entries(course).filter(([key, val]) => {
//   console.log(key);
//   return val > 90;
// });
// console.log(res);
// console.log(Object.fromEntries(res));

// let str = "    suzhao   ";
// console.log(str.trim());
// console.log(str.trimStart());
// console.log(str.trimEnd());

// let arr = [1, 2, 3, [4, 5, [7, 8, 9]]];
// let arr = [1, 2, 3, [5, 6], 4, 3, 3];
// console.log(arr.flat().flat()) ;
// console.log(arr.flat(Infinity));
// let res = arr.flatMap(val => val + 1);
// let res = arr.map(val => val + 1);
// console.log(res);

// function fun() {
//   console.log("fun");
// }
// console.log(fun.toString());

// Promise.allSettled([
//   Promise.resolve({ code: 200, msg: "1111" }),
//   Promise.reject({ code: 400, msg: "" }),
//   Promise.resolve({ code: 200, msg: "3333" })
// ])
//   .then(res => {
//     let data = res.filter(item => {
//       return item.status === "fulfilled";
//     });
//     console.log("成功+++++", data);
//   })
//   .catch(err => {
//     console.log("失败", err);
//   });

// Promise.all([
//   Promise.resolve({ code: 200, msg: "1111" }),
//   Promise.reject({ code: 400, msg: "" }),
//   Promise.resolve({ code: 200, msg: "3333" })
// ])
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err); // {code: 400, msg: "2222"}
//   });

// let user = {
//   name: "suzhao",
//   address: {
//     city: "hangzhou",
//     getNum() {
//       return 1234;
//     }
//   }
// };
// let addressNumEs5 =
//   user && user.address && user.address.getNum && user.address.getNum();
// let addressNum = user?.address?.getNum?.();
// console.log(addressNumEs5, addressNum);

// const p3 = Promise.reject("my error").catch(err => {
//   console.error(err);
//   //   Promise.reject("reject");
//   throw new Error("error");
// });
// console.log(p3);

// async function fn1() {
//   return 100;
// }
// const res1 = fn1();
// console.log(res1); // promise 对象，resolved
// res1.then(data => {
//   console.log("data==", data);  // 100
// });

// (async function fun() {
//   let p = Promise.resolve("错误");
//   let data = await p;
//   console.log(data);
// })();

// (async function fun() {
//   let p = Promise.resolve("p   成功");
//   let p1 = Promise.reject("p1  失败");
//   let p2 = Promise.resolve("p2   成功");
//   try {
//     let data = await p;
//     let data1 = await p1;
//     let data2 = await p2;
//     console.log("data===", data);
//     console.log("data1===", data1);
//     console.log("data2===", data2);
//   } catch (err) {
//     console.log("catch===", err); //  p1  失败
//   }

//   try {
//     let data = await p;
//     console.log("data===", data); // p  成功
//   } catch (err) {
//     console.log("catch===", err);
//   }
//   try {
//     let data1 = await p1;
//     console.log("data1===", data1);
//   } catch (err) {
//     console.log("catch===", err); //  p1  失败
//   }
//   try {
//     let data2 = await p2;
//     console.log("data2===", data2); // p2  成功
//   } catch (err) {
//     console.log("catch===", err);
//   }
// })();

// (async function fun() {
//   let p1 = Promise.reject("err1");
//   let data = await p1; // 报错，不会执行
//   console.log("data1===", data);
// })();

// async function as1() {
//   console.log("as1  start"); // 2，重要，此时还没走到异步，所以先行执行本行代码！！
//   await as2(); // 先执行 as2 函数体，再执行 await，

//   //   await后面，是callback的内容，即setTimeout(cb, 5000)里面的cb
//   // 下面一行是异步回调 callback  的内容
//   console.log("as1   end"); //  5 异步代码
// }
// async function as2() {
//   console.log("as2"); //  3
// }
// console.log("script   start"); // 1
// as1();
// console.log("script   end"); // 4  到此，同步代码执行完毕

// function muti(num) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(num * num);
//     }, 2000);
//   });
// }

// let arr = [1, 2, 3];
// arr.forEach(async i => { // 同步遍历，2秒后会全部输出
//   let res = await muti(i);
//   console.log(res);
// });

// (async function() {
//   for (let i of arr) {
//     // 异步遍历，一个一个输出
//     let res = await muti(i);
//     console.log(res);
//     console.log("ok");
//   }
// })();

// console.log(100);
// 宏任务
// setTimeout(() => {
//   console.log(200);
// });
// 微任务
// Promise.resolve().then(() => {
//   console.log(300);
// });
// console.log(400);
// 顺序：100、400、300、200

// async function async1() {
//   console.log("async1  start  !"); // 2
//   await async2();
//   console.log("async1  end  !"); // 6 微任务 1
// }
// async function async2() {
//   console.log("async2"); // 3
// }
// console.log("script  start");  // 1
// setTimeout(() => {
//   console.log("setTimeout");  // 8 宏任务 1
// });
// async1();
// new Promise(resolve => {
//   console.log("promise1");  // 4
//   resolve();
// }).then(() => {
//   console.log("promise2");  // 7 微任务 2
// });
// console.log("script  end !");  // 5
// let ipt = document.getElementById("ipt");
// let timer = null;
// ipt.addEventListener("keyup", function() {
//   // setTimeout(() => {
//   //     console.log(ipt.value);
//   // },500)
//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     console.log(ipt.value);
//     timer = null;
//   }, 500);
// });

// 判断是否是数组或者对象
// function isObject(obj) {
//   return typeof obj === "object" && obj !== null;
// }
// // 全等
// function isEqual(obj1, obj2) {
//   if (!isObject(obj1) || !isObject(obj2)) {
//     // 至少有一个是值类型的，一般function不参与全等
//     return obj1 === obj2;
//   }
//   // 针对传了两个相同数据的情况  isEquel(obj1, obj1)
//   if (obj1 === obj2) {
//     return true;
//   }
//   // 两个都是对象或数据，且不相等
//   // 1、先取出两个的keys，比较个数
//   const key1 = Object.keys(obj1);
//   const key2 = Object.keys(obj2);
//   if (key1.length !== key2.length) {
//     return false;
//   }
//   // 2、以obj1为基准，依次与obj2比较
//   for (let key in obj1) {
//     // 比较当前key的val
//     let res = isEqual(obj1[key], obj2[key]);
//     if (!res) {
//       return false;
//     }
//   }
//   //      3、全相等
//   return true;
// }

// const obj1 = [1, 2, 3];
// const obj2 = [1, 2, 3];
// console.log(isEqual(obj1, obj2));

// 数组扁平化
// function flat(arr) {
//   // 验证是否是多层数组
//   const isDeep = arr.some(item => item instanceof Array);
//   if (!isDeep) {
//     return arr;
//   }
//   //主要这里不要用 call，也不要直接 [].concat(arr), call和 apply 的传参方式不同
//   let res = Array.prototype.concat.apply([], arr);
//   return flat(res);
// }
// let arr = [1, 2, [3, 4, [5, 6]]];
// console.log(flat(arr));

// 数组去重——传统方式
function unique1(arr) {
  let res = [];
  arr.forEach(item => {
    if (res.indexOf(item) < 0) {
      res.push(item);
    }
  });
  return res;
}

// 数组去重——set方式 (无序，不能重复)
function unique2(arr) {
  const set = new Set(arr);
  return [...set];
}

const arr = [1, 2, 3, 2, 4, 3, "a", "suzhao", "a", 1, 4];
let res1 = unique1(arr);
console.log(res1);
let res2 = unique2(arr);
console.log(res2);
</script>

<style lang="less">
// .box {
//   display: flex;
//   justify-content: space-between;
//   border: 1px solid #333;
//   border-radius: 10px;
//   padding: 10px;
//   width: 150px;
//   height: 150px;
//   .flex {
//     width: 30px;
//     height: 30px;
//     background: pink;
//     border-radius: 50%;
//     &.flex2 {
//       align-self: center;
//     }
//     &.flex3 {
//       align-self: flex-end;
//     }
//   }
// }
// .content {
//   width: 100%;
//   .header,
//   .footer {
//     width: 100%;
//     line-height: 20px;
//     background: gray;
//     text-align: center;
//   }
//   .footer {
//     clear: both;
//   }
//   .fl {
//     float: left;
//   }
//   .col {
//     text-align: center;
//   }
//   .container {
//     padding-left: 150px;
//     padding-right: 200px;
//     overflow: hidden;
//     .center {
//       background: #999;
//       width: 100%;
//     }
//     .left {
//       width: 150px;
//       background: pink;
//       margin-left: -100%;
//       position: relative;
//       right: 150px;
//     }
//     .right {
//       width: 200px;
//       background: yellow;
//       margin-right: -200px;
//     }
//   }
// }
// .container {
//   background: pink;
//   .left {
//     float: left;
//   }
// }
// .bfc {
//   overflow: hidden;
// }
// .div1,
// .div2 {
//   width: 100px;
//   height: 100px;
//   border: 1px solid #333;
// }
// .div1 {
//   margin-bottom: -20px;
// }
// .div2 {
//   margin-top: 2px;
// }
</style>
