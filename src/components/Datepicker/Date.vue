<template>
  <section class="week-days">
    <ul>
      <li v-for="day in weekDays" track-by="value"><a href="#day-{{ day.value }}">{{ day.name }}</a></li>
    </ul>
  </section>
  <section class="dates">
    <ul>
      <li v-for="row in items" track-by="$index">
        <a v-for="date in row" href="#date-{{ date.original }}" :class="[{'active':date.value == item}]" @click.prevent="pick(date)">{{ date.name }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import {chunk} from 'lodash'
require('moment-range')
export default {
  props: {
    item: {
      type: Number,
      twoWay: true
    },
    target: {
      type: Object
    },
    factory: {
      type: Function
    }
  },
  computed: {
    weekDays () {
      var list = this.factory.weekdaysShort().map((item) => {
        return {
          name: item,
          value: item
        }
      })
      return list
    },
    items () {
      var self = this
      let list = this.target.range('month').toArray('days').map((item) => {
        return self.createItem(item)
      })
      let firstDay = list[0]
      let lastDay = list[list.length - 1]
      for (let i = 0; i < firstDay.weekDay; i++) {
        list.unshift(self.createItem(firstDay.original.subtract(1, 'day')))
      }
      for (let i = lastDay.weekDay; i < 6; i++) {
        list.push(self.createItem(lastDay.original.add(1, 'day')))
      }
      return chunk(list, 7)
    }
  },
  methods: {
    pick (item) {
      this.item = item.value
    },
    createItem (item) {
      return {
        name: item.date(),
        value: item.date(),
        weekDay: item.day(),
        original: item
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/variables";
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: block;
      a {
        width: calc(100%/7);
        display: inline-block;
        padding: 1em;
      }
    }
    .week-days & {
      li {
        display: inline-block;
        width: calc(100%/7);
        a {
          width: 100%;
        }
      }
    }
  }
</style>
