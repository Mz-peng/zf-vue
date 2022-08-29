<template>
  <div>
    Home
    <el-button @click="login">登录</el-button>
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from, next);
    next((vm) => {
      console.log("last", vm);
    });
  },
  activated() {
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
  mounted() {
    console.log("进去页面");
  },
  methods: {
    login() {
      localStorage.setItem("login", true);
    },
    logout() {
      localStorage.clear("login");
    },
  },
};
</script>

<style scoped></style>
