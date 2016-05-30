<template>
  <section class="date-index">
    <year :item.sync="year" :factory="factory"></year>
    <month :item.sync="month" :factory="factory"></month>
    <date :item.sync="date" :factory="factory" :target="item"></date>
  </section>
</template>

<script>
import Year from './Datepicker/Year'
import Month from './Datepicker/Month'
import Date from './Datepicker/Date'
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
  watch: {
    year (val) {
      this.item = this.factory(this.item.year(val))
    },
    month (val) {
      this.item = this.factory(this.item.month(val))
    },
    date (val) {
      this.item = this.factory(this.item.date(val))
    }
  },
  data () {
    return {
      year: this.item.year(),
      month: this.item.month(),
      date: this.item.date()
    }
  },
  components: { Year, Month, Date }
}
</script>

<style lang="scss">
@import "../assets/sass/variables";
ul {
  li {
    a {
      text-align: center;
    }
  }
}
</style>
