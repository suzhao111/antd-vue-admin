<template>
  <div class="header">
    <span>Header</span>
    <!-- <button @click="localeChange">国际化</button> -->

    <a-dropdown>
      <a-icon type="global" />

      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">中文</a-menu-item>
        <a-menu-item key="enUS">English</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    localeChange({ key }) {
      console.log("更改语言");
      this.$router.push({ query: { ...this.$route.query, locale: key } });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  span {
    margin-right: 30px;
  }
  float: right;
  margin-right: 30px;
}
</style>
