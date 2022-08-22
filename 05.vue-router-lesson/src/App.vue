<template>
  <el-container>
    <el-header>
      <!--跳转-->
      <!--<router-link to="/">首页</router-link>-->

      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20"
          ><el-menu
            :default-active="$route.path"
            mode="horizontal"
            background-color="#2a2a2a"
            text-color="#fffff"
            :router="true"
            active-text-color="#ffd04d"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/user">用户页面</el-menu-item>
            <el-menu-item index="/profile">个人中心</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
      <router-view name="logo"></router-view>
    </el-main>
    <el-footer>尾巴</el-footer>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-main {
  /*100vh 表示高度100%*/
  min-height: calc(100vh - 120px);
}

.el-header,
.el-footer {
  background: #2a2a2a;
}
</style>
