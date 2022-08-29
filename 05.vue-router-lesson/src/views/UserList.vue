<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id号"></el-table-column>
      <el-table-column prop="username" label="用户名">
        <template slot-scope="scope">
          <router-link :to="`/user/detail/${scope.row.id}`">{{ scope.row.username }}</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    let data = JSON.parse(localStorage.getItem("lists"));
    console.log(data);
    return {
      tableData: data,
    };
  },
};
</script>

<style scoped></style>
