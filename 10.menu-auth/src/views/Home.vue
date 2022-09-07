<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
      <template v-for="menu in menuList">
        <RecursionSubMenu :key="menu.auth" v-if="menu.children" :menu="menu"></RecursionSubMenu>
        <el-menu-item :index="menu.path" :key="menu.auth" v-else>{{menu.name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import RecursionSubMenu from '@/components/RecursionSubMenu'
export default {
  name: "HomeView",
  components: {
    RecursionSubMenu
  },
  computed: {
    ...mapState(["menuList"])
  }
}
</script>

<style scoped>

</style>
