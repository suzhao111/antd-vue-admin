<template>
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
</template>

<script>
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
//     if (typeof startObj[i] === "object") {
//       obj[i] = deepClone(startObj[i]);
//     } else {
//       obj[i] = startObj[i];
//     }
//   }
//   return obj;
// }
// let copyObj = deepClone(obj1);
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
</script>
