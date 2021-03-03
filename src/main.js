import Vue from "vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";

// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;
// import "ant-design-vue/lib/button/style";
// import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
// Vue.use(Submenu);
// Vue.use(Antd);

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
