<template>
  <section class="calendar clearfix">
    <div class="left-panel">
      <date-show :date.sync="date"></date-show>
    </div>
    <div class="right-panel">
      <date-index :item.sync="date" :factory="$parent.Moment"></date-index>
    </div>
  </section>
</template>

<script>
import DateShow from './DateShow'
import DateIndex from './DateIndex'
export default {
  watch: {
    date (val) {
      console.log(val)
    }
  },
  data () {
    return {
      date: this.$parent.Moment()
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
    float: left;
    padding-bottom: 99999px;
    margin-bottom: -99999px;
  }
  .left-panel {
    width: 40%;
    background-color: $color3;
  }
  .right-panel {
    width: 60%;
    background-color: $color1;
  }
}
</style>
