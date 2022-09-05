<template>
  <div>{{ $store.state.username }}</div>
</template>

<script>
export default {
  name: 'ProfileView',
  middleware: 'auth',
}
</script>

<style scoped></style>
