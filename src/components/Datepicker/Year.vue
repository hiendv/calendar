<template>
  <section class="years">
    <ul>
      <li v-for="year in years" track-by="value"><a href="#year-{{ year.value }}" @click.prevent="setYear(year)" :class="[{'active':year.value == item}]">{{ year.name }}</a></li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Number,
      twoWay: true
    }
  },
  data () {
    return {
      limit: 3
    }
  },
  computed: {
    years () {
      let ysA = []
      for (let i = this.item; i < this.item + this.limit; i++) {
        ysA.push({
          name: i,
          value: i
        })
      }
      let ysB = []
      for (let i = this.item - this.limit + 1; i < this.item; i++) {
        ysB.push({
          name: i,
          value: i
        })
      }
      return ysB.concat(ysA)
    }
  },
  methods: {
    setYear (year) {
      this.item = year.value
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
    width: calc(100%/5);
    a {
      display: block;
      padding: 1em;
    }
  }
}
</style>
