<template>
  <section class="todos">
    <ul>
      <li class="todo" v-for="todo in filtered">
        <input id="{{ todo.id }}" type="checkbox">
        <label for="{{ todo.id }}">{{ todo.content }}</label>
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
</style>
