<template>
  <section class="dates">
    <section class="week-days date-control">
      <ul>
        <li v-for="day in weekDays" track-by="value"><a href="#day-{{ day.value }}" @click.prevent="">{{ day.name }}</a></li>
      </ul>
    </section>
    <section class="month-days">
      <ul>
        <li v-for="row in items" track-by="$index" class="clearfix">
          <a v-for="date in row" href="#date-{{ date.original }}"
          :class="{
          'active':date.value == item,
          'padded': date.padded
        }" @click.prevent="pick(date)"><span>{{ date.name }}</span></a>
      </li>
    </ul>
  </section>
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
          list.unshift(
            self.createItem(
              firstDay.original.subtract(1, 'day'),
              true
              )
            )
        }
        for (let i = lastDay.weekDay; i < 6; i++) {
          list.push(
            self.createItem(
              lastDay.original.add(1, 'day'),
              true
              )
            )
        }
        return chunk(list, 7)
      }
    },
    methods: {
      pick (item) {
        this.item = item.value
      },
      createItem (item, isPadded) {
        var padded = isPadded || false
        let obj = {
          name: item.date(),
          value: item.date(),
          weekDay: item.day(),
          original: item,
          padded: padded
        }
        return obj
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/variables";
  .month-days {
    ul {
      margin:0;
      padding:0;
      li {
        display: block;
        a {
          display: block;
          width: calc(100%/7);
          padding: 1em;
          font-size: .8em;
          float: left;
          border-right: 1px solid $color2;
          border-bottom: 1px solid $color2;
          span {
            display: inline-block;
            line-height: 2em;
            width: 2em;
            border-radius: 50%;
          }
          &.padded {
            background-color: $color2;
          }
          &:last-child {
            border-right: none;
          }
          &:hover {
            span {
              color: $color1;
              background-color: $color3;
            }
          }
        }
      }
    }
  }
  .week-days {
    ul {
      padding: 0;
      background-color: darken($color2, 5%);
      li {
        display: inline-block;
        width: calc(100%/7);
        a {
          font-size: .8em;
          font-weight: bold;
          color: darken($color2, 25%);
          border-right: 1px solid darken($color2, 15%);
          border-bottom: 1px solid darken($color2, 10%);
          border-radius: 0;
          &:hover {
            width: 100%;
            background-color: transparent;
          }
        }
        &:last-child {
          a {
            border-right: none;
          }
        }
      }
    }
  }
</style>
