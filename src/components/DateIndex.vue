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
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: $color4;
      }
    }
  }
  .date-control {
    ul {
      margin: 0;
      padding: .5em;
      list-style: none;
      a {
        display: block;
        margin: 0 auto;
        padding: .5em;
        font-size: .9em;
        border-radius: 4px;
        &:hover {
          width: 90%;
          background-color: $color2;
          transition: all 200ms ease-in;
        }
        &:active {
          color: darken($color4, 20%);
        }
        &.active {
          width: 100%;
          background-color: darken($color2, 5%)
        }
      }
    }
  }
</style>
