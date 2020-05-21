import Vue from "vue";
import { Button, Layout, Icon, Drawer, Radio } from "ant-design-vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "ant-design-vue/lib/button/style";
// import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
// Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
