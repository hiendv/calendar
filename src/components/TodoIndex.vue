<template>
  <section class="todos">
    <div class="filters">
      <a href="#" :class="{active: $key == filter}" @click.prevent="filtering($key)" v-for="f in filters" track-by="$index">{{ $key }}</a>
    </div>
    <ul v-el:todo-list>
      <li class="todo" v-for="todo in filtered | orderBy 'created_at' 'desc'" track-by="id">
        <div class="todo-detail">
          <input id="{{ todo.id }}" type="checkbox" v-model="todo.completed" @click="todoSaver(todo)">
          <div class="prepend">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path v-show="todo.completed" transition="expand" d="M 10 10 L 90 90"></path>
              <path v-show="todo.completed" transition="expand" d="M 90 10 L 10 90"></path>
            </svg>
          </div>
          <input type="text" v-model="todo.content" @keyup="todoSaver(todo) | debounce 400" v-todo-focus="todo == activeTodo">
          <div class="append">
            <button type="button" class="btn" @click.prevent="todoDestroyer(todo)"><span class="ion-trash-a"></span></button>
          </div>
        </div>
        <div class="todo-timestamp clearfix">
          <strong>{{ MomentFactory(todo.created_at).format('HH:mm') }}</strong>
          <span>- {{ MomentFactory(todo.created_at).fromNow() }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        MomentFactory: this.$parent.MomentFactory,
        filters: {
          all (items) {
            return items
          },
          remaining (items) {
            return items.filter((item) => {
              return !item.completed
            })
          },
          completed (items) {
            return items.filter((item) => {
              return item.completed
            })
          }
        }
      }
    },
    props: {
      items: {
        type: Array,
        twoWay: true
      },
      filter: {
        type: String,
        twoWay: true
      },
      todoSaver: {
        type: Function
      },
      todoDestroyer: {
        type: Function
      },
      activeTodo: {
        type: Object
      }
    },
    computed: {
      filtered () {
        return this.filters[this.filter](this.items)
      }
    },
    methods: {
      filtering (key) {
        this.filter = key
      }
    },
    directives: {
      'todo-focus': function (value) {
        if (!value) {
          return
        }
        var el = this.el
        this.vm.$nextTick(function () {
          el.focus()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  ul {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .filters {
    padding: .5em 0;
    font-size: 13px;
    text-align: center;
    background-color: darken($color4, 5%);
    a {
      display: inline-block;
      padding: 0 1em;
      color: $color1;
      text-transform: capitalize;
      text-decoration: none;
      &.active {
        text-decoration: underline;
        font-weight: bold;
      }
    }
  }
  .todo {
    padding: 1em 0;
    border-bottom: 1px dashed darken($color4, 10%);
  }
  .todo-timestamp {
    font-size: .8em;
  }
  .todo-detail {
    position: relative;
    width: 100%;
    display: table;
    border-collapse: separate;
    .prepend, .append {
      width: 1%;
      white-space: nowrap;
      position: relative;
    }
    .prepend, .append, [type="text"] {
      position: relative;
      height: 1.5em;
      display: table-cell;
      padding: 0;
      margin: 0;
    }
    .prepend, .append {
      margin: 0;
      width: 1%;
      white-space: nowrap;
      vertical-align: middle;
    }
    .prepend {
      > * {
        margin-right: .5em;
      }
    }
    .append {
      > * {
        margin-left: .5em;
        display: none;
      }
    }
    &:hover .append > * {
      display: block;
    }
    svg, [type="checkbox"] {
      width: 1.5em;
      height: 1.5em;
    }
    [type="checkbox"] {
      position: absolute;
      left: 0;
      opacity: 0;
      -webkit-appearance: none;
      z-index: 100;
      cursor: pointer;
    }
    svg {
      border: .15em solid $color1;
      padding: .1em;
      path {
        stroke: #fdfcd3;
        stroke-width: .8em;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
    }
    [type="text"], .btn {
      width: 100%;
      background-color: transparent;
      color: $color1;
      border: none;
      outline: none;
    }
    .btn {
      font-size: 1.2em;
      background-color: darken($color4, 10%);
      cursor: pointer;
    }
  }
  .expand-transition {
    transition: all 150ms ease;
    overflow: hidden;
  }

  /* .expand-enter defines the starting state for entering */
  /* .expand-leave defines the ending state for leaving */
  .expand-enter, .expand-leave {
    opacity: 0;
  }
</style>
