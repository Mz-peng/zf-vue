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
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="ruleForm.confirmPassword"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reg">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RegView',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        // 多条规则 菜单校验
        username: [
          { required: true, messages: '用户名必填', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length < 2) {
                callback(new Error('用户名太短'))
              } else {
                callback()
              }
            },
          },
        ],
        password: [{ required: true, messages: '密码必填', blur: true }],
        confirmPassword: [
          { required: true, messages: '密码必填', blur: true },
          {
            validator: (rule, value, callback) => {
              if (value === this.ruleForm.password) {
                callback()
              } else {
                callback(new Error('两次密码不一致'))
              }
            },
          },
        ],
      },
    }
  },
  // asyncData (需要seo优化的可以放在asyncData来请求) fetch (vuex) nuxtServerInit
  methods: {
    // eslint-disable-next-line require-await
    async reg() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          this.$message('请输入用户名或密码')
        } else {
          // 发送ajax请求
          const { username, password } = this.ruleForm
          const result = await this.$axios.post('/user/reg', {
            username,
            password,
          })
          if (result.code === 1) {
            this.$message(result.data)
          } else {
            this.$message(result.data)
            await this.$router.push('/login')
          }

          // 会走服务端
          // window.location.href = '/login'
        }
      })
    },
  },
}
</script>

<style scoped></style>
