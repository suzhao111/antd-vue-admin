<template>
  <div style="width: 200px">
    <div @click="checkMenu">检查路由</div>
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  props: {
    theme: String
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      //   console.log(routes, "====执行getMenuData=========");
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item }; //先拿出主节点，并删除子节点
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]); //有子节点，子节点可视，则对子节点递归，添加到children
          } else {
            //这里的判断主要是给分步表单用的，三级菜单不显示，但打开URL的时候，显示选中的是二级菜单
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem, [...parentKeys, item.path]);
        } else if (
          //   !item.name &&
          !item.hideInMenu &&
          item.children &&
          !item.hideChildrenMenu
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      console.log(menuData, "====执行getMenuData=========");
      return menuData;
    },
    checkMenu() {
      console.log(this.menuData);
    }
  }
};
</script>

<style></style>
