<template>
  <el-submenu :index="menu.path">
    <template slot="title">
      <router-link :to="menu.path">{{menu.name}}</router-link>
    </template>
    <template v-for="childMenu in menu.children">
      <RecursionSubMenu
          :key="childMenu.auth"
          :menu="childMenu"
          v-if="childMenu.children"></RecursionSubMenu>
      <el-menu-item
          :index="childMenu.path"
          :key="childMenu.auth"
          v-else>{{childMenu.name}}</el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "RecursionSubMenu",
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>
