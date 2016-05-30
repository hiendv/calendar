<template>
  <section class="years date-control">
    <ul class="clearfix">
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
    li {
      display: block;
      float: left;
      width: calc(100%/5);
    }
  }
</style>
