<template>
  <section class="todos">
    <ul>
      <li class="todo" v-for="todo in filtered">
        <input id="{{ todo.id }}" type="checkbox" v-model="todo.completed" track-by="id">
        <div class="prepend">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path v-show="todo.completed" transition="expand" d="M 10 10 L 90 90"></path>
            <path v-show="todo.completed" transition="expand" d="M 90 10 L 10 90"></path>
          </svg>
        </div>
        <input type="text" v-model="todo.content" />
        <div class="append">
          <button class="btn"><span class="ion-trash-a"></span></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        TodoService: this.$parent.TodoService,
        filter: 'all',
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
      }
    },
    computed: {
      filtered () {
        return this.filters[this.filter](this.items)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .todo {
    position: relative;
    width: 100%;
    display: table;
    border-collapse: separate;
    padding: 1em 0;
    border-bottom: 1px dashed darken($color4, 10%);
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
