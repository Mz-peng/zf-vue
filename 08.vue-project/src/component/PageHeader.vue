<template>
    <el-row class="header-row">
        <el-col :span="18">
            <img src="../assets/logo.png" class="logo"/>
            <el-menu class="menu" mode="horizontal" background-color="#333333" text-color="#FFFFFF"
                     active-text-color="#FFFFFF" :router="true">
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/post">发表文章</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="6">
            <div class="nav-right">
                <el-menu class="el-menu-demo" mode="horizontal" background-color="#333333" text-color="#FFFFFF"
                         active-text-color="#FFFFFF">
                    <el-menu-item index="login">
                        <router-link to="/login">登录</router-link>
                    </el-menu-item>
                    <el-menu-item index="reg">
                        <router-link to="/reg">注册</router-link>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">张三</template>
                        <el-menu-item index="logout">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-col>
    </el-row>
</template>
<script>

export default {
    name: "page-header",
};
</script>

<style lang="scss">
.header-row {
    height: 100%;

    .logo {
        margin: 5px;
        height: 50px;
    }

    .menu, .logo {
        display: inline-block;
    }

    .nav-right {
        float: right;
        a {
            text-decoration: none;
        }
    }
}


</style>