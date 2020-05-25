<template>
  <div style="width: 200px">
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
    theme: String,
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
    collapsed(val) {
      if (val) {
        this.cacheOpenKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.cacheOpenKeys;
      }
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      //   collapsed: false,
      menuData,
      //   当前选中的菜单项 key 数组
      selectedKeys: this.selectedKeysMap[this.$route.path],
      //   当前展开的 SubMenu 菜单项 key 数组
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      console.log(routes, "====执行getMenuData=========");
      const menuData = [];
      routes.forEach(item => {
        //本级菜单可显示
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          //先拿出主节点，并删除子节点
          const newItem = { ...item };
          delete newItem.children;

          //有子菜单，并子菜单可显示
          if (item.children && !item.hideChildrenMenu) {
            //对子菜单递归，添加到children，
            //将item.path放入parentKeys，
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          }

          //有子菜单，但不显示出来，不放入children，但是要记录selectedkey
          else {
            //这里的判断主要是给分步表单用的，三级菜单不显示，但打开URL的时候，显示选中的是二级菜单
            //
            if (item.children) {
              this.getMenuData(
                item.children,
                selectedKey ? parentKeys : [...parentKeys, item.path],
                selectedKey || item.path
              );
            }
          }
          menuData.push(newItem);
        }

        //本级菜单没有name，
        else if (
          //   !item.name &&
          !item.hideInMenu &&
          item.children &&
          !item.hideChildrenMenu
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path]) // 将item.path加入到parentkeys中
          );
        }

        console.log("====执行的果果=========", menuData);
      });
      //   console.log("====执行的果果=========", menuData);
      return menuData;
    }
  }
};
</script>

<style></style>
