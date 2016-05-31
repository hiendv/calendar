<template>
  <section class="date-control">
    <ul class="clearfix">
      <li v-for="item in items" track-by="value">
        <a
        href="#"
        :class="{'active': item.isActive()}"
        v-text="item.name"
        @click.prevent="pick(item)"></a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
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
      month () {
        return this.item.month()
      },
      items () {
        let self = this
        let list = this.factory.monthsShort()
        .map((name, index) => {
          return self.monthFactory(name, index)
        })
        .filter((month) => {
          let diff = Math.abs(this.month - month.value)

          // Jan, Feb
          if (this.month - this.limit < 0) {
            return diff + (this.month - this.limit) <= this.limit
          }

          // Nov, Dec
          if (this.month + this.limit >= this.total) {
            return diff - (this.month + this.limit - this.total + 1) <= this.limit
          }

          // Others
          return diff <= this.limit
        })
        list.unshift(self.monthFactory('<', this.month - this.step))
        list.push(self.monthFactory('>', this.month + this.step))
        return list
      }
    },
    methods: {
      pick (month) {
        this.item = this.item.month(month.value).clone()
      },
      monthFactory (name, val) {
        let self = this
        return {
          name: name,
          value: val,
          isActive () {
            return val === self.item.month()
          }
        }
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
