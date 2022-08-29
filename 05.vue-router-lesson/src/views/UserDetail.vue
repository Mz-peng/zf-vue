<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  watch: {
    /**
     * 监控路由
     * 也可以使用路由守卫 beforeRouteLeave beforeRouteEnter beforeRouteUpdate
     */
    $route() {
      console.log("更新了");
    },
  },
  beforeRouteUpdate(to, form, next) {
    console.log(to.params, form, next);
    next();
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style scoped></style>
