<template>
  <section class="calendar clearfix">
    <div class="left-panel">
      <date-show :item.sync="date"></date-show>
    </div>
    <div class="right-panel">
      <date-index :item.sync="dateInstance" :factory="MomentFactory"></date-index>
    </div>
  </section>
</template>

<script>
  import DateShow from './DateShow'
  import DateIndex from './DateIndex'
  export default {
    data () {
      let MomentService = this.$parent.MomentService
      return {
        date: {},
        dateInstance: null,
        TodoService: this.$parent.TodoService,
        MomentService: MomentService,
        MomentFactory: MomentService.getFactory()
      }
    },
    watch: {
      dateInstance (val) {
        let id = val.format('YYYY-MM-DD')
        if (this.date.id === id) {
          return
        }
        this.$set('date.id', id)
      }
    },
    ready () {
      this.dateInstance = this.MomentFactory()
    },
    components: { DateShow, DateIndex }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  .calendar {
    background-color: $color1;
    @media (min-width: 768px) {
      overflow: hidden;
      .left-panel, .right-panel {
        padding-bottom: 99999px;
        margin-bottom: -99999px;
      }
      .left-panel {
        float: left;
        width: 40%;
      }
      .right-panel {
        background-color: $color1;
        overflow: hidden;
      }
    }
    .left-panel {
      color: $color1;
      background-color: $color4;
    }
  }
</style>
