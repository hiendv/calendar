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
        limit: 3
      }
    },
    computed: {
      year () {
        return this.item.year()
      },
      items () {
        let ysA = []
        let ysB = []

        for (let i = this.year; i < this.year + this.limit; i++) {
          ysA.push(this.yearFactory(i))
        }

        for (let i = this.year - this.limit + 1; i < this.year; i++) {
          ysB.push(this.yearFactory(i))
        }

        return ysB.concat(ysA)
      }
    },
    methods: {
      pick (year) {
        this.item = this.item.year(year.value).clone()
      },
      yearFactory (val) {
        let self = this
        return {
          name: val,
          value: val,
          isActive () {
            return val === self.item.year()
          }
        }
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
