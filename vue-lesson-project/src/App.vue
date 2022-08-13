<template>
  <div id="app">
    <Mytitle :type="1" :fn="say">hello</Mytitle>
    <List :list="arr" :render="render">

    </List>
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
import List from './components/List.vue';

import Mytitle from './components/MyTitle';

export default {
  name: 'App',
  // 注册组件
  components: {
    Mytitle,
    List
  },
  data: {
    arr: [1, 2, 3, 4]
  },
  methods: {
    say() {
      alert(1)
    },
    render(h) {
      return <h1></h1>
    }
  }
  
}
</script>

<style lang="less">

</style>
