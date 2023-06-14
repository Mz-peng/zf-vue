<template>
    <el-container>
        <el-aside width="200px">
            <el-menu background-color="#333" text-color="#fff" active-text-color="#ffd04b" class="menu" :router="true">
                <el-submenu index="personal">
                    <template slot="title">
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-1">用户权限</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <span slot="title">个人中心</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script></script>

<style scoped lang="scss">
.menu {
    border-right: none;
}
.el-aside {
    background: #333;
    opacity: 0.8;
}
</style>
