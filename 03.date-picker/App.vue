<template>
  <!-- :value="now" @input="val => now = val "  简写 v-model="now"-->
  <DatePicker v-model="now"></DatePicker>
</template>

<script>
import DatePicker from './components/DatePicker.vue'

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      now: new Date(),
    }
  },
}
</script>
