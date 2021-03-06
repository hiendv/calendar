<template>
  <section>
    <section class="week-days date-control">
      <ul>
        <li v-for="day in weekDays" track-by="value">
          <a
          href="#"
          v-text="day.name"
          @click.prevent=""></a>
        </li>
      </ul>
    </section>
    <section class="month-days">
      <ul>
        <li v-for="chunk in items" track-by="$index" class="clearfix">
          <a
          href="#"
          v-for="item in chunk"
          :class="{'active': item.isActive(), 'padded': item.isPadded()}"
          @click.prevent="pick(item)"
          >
            <h4 v-text="item.name"></h4>
            <span v-todo-counter="item" class="todo-counter"></span>
          </a>
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
        type: Object,
        twoWay: true
      },
      factory: {
        type: Function
      }
    },
    computed: {
      weekDays () {
        let self = this
        return this.factory.daysInAWeek()
        .map((day) => {
          return self.weekDayFactory(day)
        })
      },
      items () {
        let self = this
        let list = this.item.range('month').toArray('days')
        .map((item) => {
          return self.dayFactory(item, false)
        })
        list = this.dayPadding(list)
        list = this.dayPadding(list, true)
        return chunk(list, 7)
      }
    },
    methods: {
      pick (day) {
        let newDate = this.item.clone().date(day.value)
        if (day.isPadded()) {
          this.item = newDate.month(day.month)
          return
        }
        this.item = newDate
      },
      weekDayFactory (val) {
        return {
          name: val,
          value: val
        }
      },
      dayFactory (original, padded) {
        let self = this
        let val = original.date()
        let day = {
          name: val,
          value: val,
          original: original,
          month: original.month(),
          isPadded () {
            let isPadded = padded || false
            return isPadded
          },
          isActive () {
            return !this.padded && this._id() === self.item.format('YYYY-MM-DD')
          },
          _id () {
            return original.format('YYYY-MM-DD')
          }
        }
        return day
      },
      dayPadding (list, appended) {
        var nextDay
        if (!list) {
          return []
        }
        let isAppended = appended || false
        if (isAppended) {
          while (list[list.length - 1].original.day() < 6) {
            nextDay = list[list.length - 1].original.clone().add(1, 'day')
            list.push(this.dayFactory(nextDay, true))
          }
          return list
        }
        while (list[0].original.day() > 0) {
          nextDay = list[0].original.clone().subtract(1, 'day')
          list.unshift(this.dayFactory(nextDay, true))
        }
        return list
      }
    },
    directives: {
      todoCounter (value) {
        let self = this
        this.vm.$parent.MomentService.count(value._id()).then((count) => {
          if (!this.el) {
            return
          }
          if (!count || !count.all) {
            return
          }
          let innerHTML = ''
          if (count.remaining) {
            innerHTML += '<span class="icon ion-ios-circle-filled"></span> '
          }
          if (count.completed) {
            innerHTML += '<span class="icon ion-ios-checkmark"></span>'
          }
          self.el.innerHTML = innerHTML
        }, (e) => {})
      }
    }
  }
</script>

<style lang="scss">
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
          font-size: .9em;
          float: left;
          border-right: 1px solid $color2;
          border-top: 1px solid $color2;
          h4 {
            margin: 0;
            width: 100%;
            display: inline-block;
            line-height: 2em;
            font-weight: normal;
            width: 2em;
            border-radius: 50%;
          }
          &.padded {
            background-color: $color2;
          }
          &:last-child {
            border-right: none;
          }
          &:hover, &.active {
            background-color: lighten($color4, 15%);
            color: $color1;
            .icon {
              color: $color1!important;
            }
          }
          &.active {
            background-color: $color3;
            .icon {
              color: $color1!important;
            }
          }
          .todo-counter {
            display: block;
            height: 1em;
            .icon {
              display: inline-block;
              font-size: 1.2em;
              &.ion-ios-circle-filled {
                color: #f85627;
              }
              &.ion-ios-checkmark {
                color: $color3;
              }
            }
          }
        }
        &:first-child a {
          border-top: none;
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
