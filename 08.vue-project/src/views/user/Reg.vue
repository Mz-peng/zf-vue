<template>
  <div class="reg-page">
      <el-row>
          <el-col class="title">
              <h2>欢迎注册</h2>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="10" :offset="7">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="邮箱地址" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item style="text-align: center">
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
              </el-form>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import * as user from '@/api/user'

export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('邮箱地址不能为空'));
            }
            setTimeout(() => {
                let reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的邮箱地址'));
                } else {
                    if (value.length < 6) {
                        callback(new Error('邮箱地址长度不能小于6位'));
                    } else {
                        callback();
                    }
                }

            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                password: '',
                checkPass: '',
            },
            rules: {
                username: [
                    { validator: checkUsername, required: true, trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, required: true, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, required: true, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        await user.reg(this.ruleForm).then(res => {
                            console.log(res)
                            this.$message({
                                type: 'success',
                                message: res.msg
                            })
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 1000)
                        })
                    } catch (e) {
                        this.$message({
                            type: 'error',
                            message: e
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}

</script>

<style lang="scss">
.title {
    text-align: center;
    line-height: 60px;
    padding-bottom: 20px;
}
</style>