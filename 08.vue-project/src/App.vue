<template>
    <div id="app">
        <!-- el-container 会检测内部是否有 el-header 和 el-footer -->
        <el-container style="min-width: 960px">
            <el-header>
                <page-header />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <page-footer />
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import PageFooter from "@/components/PageFooter.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
    name: "app",
    components: {
        PageFooter,
        PageHeader,
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.el-header {
    background-color: #333333;
}
.el-footer {
    background-color: #333333;
}
.el-main {
    min-height: calc(100vh - 120px);
    padding: 0 !important;
}
</style>
