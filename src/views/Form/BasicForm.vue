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
// obj1.c[1] = "faguo";
// console.log(obj1, copyObj, obj2);

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
var btns = [{ name: "b1" }, { name: "b2" }, { name: "b3" }];
function bind() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].fun = function() {
      console.log(i);
    };
  }
}
bind();
console.log(btns);
btns[1].fun();
btns[2].fun();
btns[3].fun();
</script>
