<template>
  <section class="months date-control">
    <ul>
      <li v-for="month in items" track-by="name"><a href="#month-{{ month.value }}" @click.prevent="pick(month)" :class="[{'active':month.value == item}]">{{ month.name }}</a></li>
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
    data () {
      return {
        limit: 2,
        total: 12,
        step: 2
      }
    },
    computed: {
      items () {
        let list = this.factory.monthsShort()
        .map((month, index) => {
          return {
            name: month,
            value: index
          }
        })
        .filter((month) => {
          let diff = Math.abs(this.item - month.value)
          if (this.item - this.limit < 0) {
            return diff + (this.item - this.limit) <= this.limit
          }
          if (this.item + this.limit >= this.total) {
            return diff - (this.item + this.limit - this.total + 1) <= this.limit
          }
          return diff <= this.limit
        })
        list.unshift({
          name: '<',
          value: this.item - this.step
        })
        list.push({
          name: '>',
          value: this.item + this.step
        })
        return list
      }
    },
    methods: {
      pick (item) {
        if (item.value < 0) {
          return false
        }
        if (item.value >= this.total) {
          return false
        }
        this.item = item.value
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/variables";
  ul {
    background-color: darken($color2, 17%);
    border-bottom: 1px solid darken($color2, 20%);
    li {
      display: inline-block;
      width: calc(100%/7);
    }
  }
</style>
