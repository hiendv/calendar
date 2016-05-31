<template>
  <section class="date-show">
    {{ item }}
  </section>
</template>

<script>
  export default {
    props: {
      item: {
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
