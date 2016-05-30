<template>
  <section class="months">
    <ul>
      <li v-for="month in items" track-by="value"><a href="#month-{{ month.value }}" @click.prevent="pick(month)" :class="[{'active':month.value == item}]">{{ month.name }}</a></li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Number,
      twoWay: true
    },
    factory: {
      type: Function
    }
  },
  computed: {
    items () {
      let list = this.factory.monthsShort().map((month, index) => {
        return {
          name: month,
          value: index
        }
      })
      return list
    }
  },
  methods: {
    pick (item) {
      this.item = item.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/variables";
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: inline-block;
    width: calc(100%/12);
    a {
      display: block;
      padding: 1em;
    }
  }
}
</style>
