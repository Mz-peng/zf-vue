<template>
  <div id="app">
    <Mytitle :type="1" :fn="say">hello</Mytitle>

    <List :list="arr" :render="render"> </List>

    <MyTable :columns="columns1" :data="data1"></MyTable>
  </div>
</template>

<script>
/* 
  组件：
  1. 声明
  2. 引用
  3. 注册
*/
// import MyTitle from './components/MyTitle.vue';
import List from "./components/List.vue";
import MyTable from "./components/MyTable.vue";

import Mytitle from "./components/MyTitle";

export default {
  name: "App",
  // 注册组件
  components: {
    Mytitle,
    List,
    MyTable,
  },
  data() {
    return {
      arr: [1, 2, 3, 4],
      columns1: [
        {
          title: "姓名",
          key: "name",
          edit: true,
        },
        {
          title: "年龄",
          key: "age",
        },
        {
          title: "地址",
          key: "address",
        },
      ],
      data1: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
        },
      ],
    };
  },
  methods: {
    say() {
      alert(1);
    },
    render(h, a) {
      return <h1>{a}</h1>;
    },
  },
};
</script>

<style lang="less"></style>
