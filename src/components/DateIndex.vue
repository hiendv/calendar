<template>
  <section class="date-index">
    <year :item.sync="item" :factory="factory"></year>
    <month :item.sync="item" :factory="factory"></month>
    <day :item.sync="item" :factory="factory"></day>
  </section>
</template>

<script>
  import Year from './Datepicker/Year'
  import Month from './Datepicker/Month'
  import Day from './Datepicker/Day'
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
    components: { Year, Month, Day }
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
    .date-control & {
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
