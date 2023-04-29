<template>
  <div>
    <ul>
      <template v-if="!render">
        <li v-for="l in list" :key="l">
          {{ l }}
        </li>
      </template>
      <template v-else v-for="l in list">
        <List :render="render" :key="l" :a="l"></List>
      </template>
    </ul>
  </div>
</template>

<script>
import List from "./list.js";
export default {
  props: ["list", "render"],
  components: {
    List,
  },
};
</script>

<style lang="scss" scoped></style>
