<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        v-model="collapsed"
        collapsible
      >
        <div class="logo">后台</div>
        <SideMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
      <SettingDrawer />
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import SettingDrawer from "@/components/SettingDrawer";
export default {
  components: {
    Header,
    SideMenu,
    Footer,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped lang="less">
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  &:hover {
    background: #eee;
  }
}
.nav-theme-dark .logo {
  color: #fff;
}
</style>
