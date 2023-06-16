<template>
    <el-container>
        <el-aside width="200px">
            <manager-menu></manager-menu>
        </el-aside>
        <el-main class="manager-main">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
import ManagerMenu from "@/components/ManagerMenu";

export default {
    components: { ManagerMenu },
};
</script>

<style scoped lang="scss">
.menu {
    border-right: none;
}

.el-aside {
    background: #333;
    opacity: 0.8;
}

.manager-main {
    margin: 20px;
}
</style>
