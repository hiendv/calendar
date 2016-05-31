<template>
  <section class="calendar clearfix">
    <div class="left-panel">
      <date-show :date.sync="dateInstance"></date-show>
    </div>
    <div class="right-panel">
      <date-index :item.sync="dateInstance" :factory="factory"></date-index>
    </div>
  </section>
</template>

<script>
  import DateShow from './DateShow'
  import DateIndex from './DateIndex'
  export default {
    data () {
      return {
        date: {
          id: '2016-04-27'
        },
        factory: this.$parent.MomentService
      }
    },
    computed: {
      dateInstance: {
        get () {
          return this.factory(this.date.id)
        },
        set (val) {
          this.date.id = val.format('YYYY-MM-DD')
        }
      }
    },
    components: { DateShow, DateIndex }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  .calendar {
    background-color: $color1;
    overflow: hidden;
    .left-panel, .right-panel {
      padding-bottom: 99999px;
      margin-bottom: -99999px;
    }
    .left-panel {
      float: left;
      width: 40%;
      color: $color1;
      background-color: $color4;
    }
    .right-panel {
      background-color: $color1;
      overflow: hidden;
    }
  }
</style>
