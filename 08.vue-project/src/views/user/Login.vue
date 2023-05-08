<template>
    <div class="login-page">
        <el-row>
            <el-col class="title">
                <h2>欢迎登录</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱地址" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-row>
                            <el-col :span="6">
                                <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
                            </el-col>
                            <el-col :span="6" :offset="1" style="height: 40px">
                                <img :src="verify" @click="getCaptcha()" />
                            </el-col>
                            <el-col :span="5" :offset="6">
                                <el-button type="text" onclick="$router.push('/forget')">忘记密码？</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import * as user from '@/api/user'
import { getLocal, setLocal } from '@/utils/local'
import { v4 } from 'uuid'
import { getCaptcha } from '@/api/public'

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
        var validateVerify = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                if (value.length !== 4) {
                    callback(new Error('验证码长度必须为4位'));
                } else if (value !== this.verifyCode) {
                    this.getCaptcha();
                    callback(new Error('验证码错误'));
                } else {
                    callback();
                }
            }
        };
        return {
            // 登录用户唯一标识
            uid: '',
            // 验证码
            verify: '',
            verifyCode: '',
            ruleForm: {
                username: '',
                password: '',
                code: '',
            },
            rules: {
                username: [
                    { validator: checkUsername, required: true, trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, required: true, trigger: 'blur' }
                ],
                code: [
                    { validator: validateVerify, required: true, trigger: 'blur' },
                ],
            }
        };
    },
    created() {
        this.uid = getLocal('uuid')
        if (!this.uid) {
            setLocal('uuid', v4())
        }
        this.getCaptcha()
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
        },
        /**
         * 获取验证码
         */
        async getCaptcha() {
            let { data } = await getCaptcha();
            this.verify = data.imageBase64
            this.verifyCode = data.code
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