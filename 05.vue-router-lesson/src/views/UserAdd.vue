<template>
  <div>
    <h2>添加用户</h2>
    <el-form :model="ruleForm" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserAdd",
  /**
   * 进入的时候执行
   * 页面的权限
   * @param to 去哪
   * @param from 从哪来
   * @param next 是否继续
   */
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from, next);
    next((vm) => {
      // 这个方法会在组件渲染完毕后执行
      console.log(vm);
    });
  },
  /**
   * 离开的时候执行
   * @param to
   * @param from
   * @param next
   */
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave", to, from, next);
    if (this.ruleForm.username && !this.flag) {
      this.$confirm("确定关闭?")
        .then(() => {
          next();
        })
        .catch(() => {});
    } else {
      // 是否继续向下执行
      next();
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.flag = true;
          let lists = JSON.parse(localStorage.getItem("lists")) || [];
          lists.push({ id: Math.random(), username: this.ruleForm.username });
          console.log("---", lists);
          localStorage.setItem("lists", JSON.stringify(lists));
          this.$router.push("/user/list");
        }
      });
    },
  },
  data() {
    return {
      flag: false,
      ruleForm: {
        username: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
