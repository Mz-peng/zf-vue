<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        // 多条规则 菜单校验
        username: [
          { required: true, messages: '用户名必填', trigger: 'blur' },
          {
            validator: (rule, value, rollback) => {
              if (value.length < 2) {
                rollback('用户名太短')
              } else {
                rollback()
              }
            },
          },
        ],
        password: [{ required: true, messages: '密码必填', blur: true }],
      },
    }
  },
  methods: {
    // eslint-disable-next-line require-await
    async login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          this.$message('请输入用户名或密码')
        } else {
          // 发送ajax请求
          const { username, password } = this.ruleForm
          const result = await this.$axios.post('/user/login', {
            username,
            password,
          })
          if (result.code === 1) {
            this.$message(result.data)
          } else {
            this.$message(result.data)
            window.location.href = '/'
          }
        }
      })
    },
  },
}
</script>

<style scoped></style>
