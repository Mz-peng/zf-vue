<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <!--logo-->
          <el-col :span="3">
            <img
              src="@/assets/zflogo.png"
              width="116px"
              height="43px"
              class="logo"
            />
          </el-col>
          <!--导航-->
          <el-col :span="15">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              :router="true"
            >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/profile">个人中心</el-menu-item>
            </el-menu>
          </el-col>
          <!--登录 注册-->
          <el-col :span="6">
            <ul class="nav-right">
              <li>
                <nuxt-link to="/login">登录</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reg">注册</nuxt-link>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer>尾部</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'DefaultView',
  data() {
    return {
      activeIndex: this.$route.path,
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.logo {
  margin: 8.5px 0 0 10px;
}

.el-main {
  /* 中间内容高度 = 页面总高度 - 头60px -底60px */
  min-height: calc(100vh - 120px);
}

.el-footer {
  background: #2a2a2a;
  text-align: center;
  line-height: 60px;
  color: #ffffff;
}

.nav-right {
  width: 200px;
  float: right;
}
.nav-right li {
  display: inline-block;
  width: 60px;
  text-align: center;
  line-height: 60px;
}
</style>
