<template>
  <section class="date-show">
  {{ date }}
  </section>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      twoWay: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/variables";
.date-show {
  padding: 5em;
}
</style>
