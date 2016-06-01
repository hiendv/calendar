<template>
  <section class="date-show">
    <div class="heading">
      <h3 class="clearfix">{{ moment.format("MMMM Do") }} <a href="#" class="btn" @click.prevent="createTodo()"><span class="ion-plus"></span></a></h3>
      <h2>{{ moment.format("dddd") }}</h2>
    </div>
    <todo-index
    :items.sync="item.todos"
    :filter.sync="filter"
    :todo-saver="saveTodo"
    :todo-destroyer="destroyTodo"
    :active-todo="activeTodo"
    ></todo-index>
  </section>
</template>

<script>
  import TodoIndex from './TodoIndex'
  export default {
    props: {
      item: {
        type: Object
      }
    },
    data () {
      return {
        TodoService: this.$parent.TodoService,
        MomentService: this.$parent.MomentService,
        MomentFactory: this.$parent.MomentFactory,
        filter: 'all',
        activeTodo: {}
      }
    },
    computed: {
      moment () {
        return this.MomentFactory(this.item.id)
      }
    },
    watch: {
      'item.id' (val) {
        this.show()
      }
    },
    methods: {
      show (date) {
        var item = date || this.item
        this.MomentService.find(item.id)
        .then(
          (item) => { this.item = item },
          (error) => {
            if (error.code === 404) {
              this.MomentService.store({id: item.id}).then((item) => {
                this.show()
              })
            }
          }
        )
      },
      createTodo () {
        if (this.filter === 'completed') {
          this.filter = 'all'
        }
        let item = {
          date: this.item
        }
        this.TodoService.store(item)
        .then(
          (item) => {
            this.activeTodo = item
            this.item.todos.push(item)
          },
          (error) => console.info(error)
        )
      },
      saveTodo (item) {
        this.TodoService.update(item.id, item)
        .then(
          (i) => { item = i },
          (error) => console.info(error)
        )
      },
      destroyTodo (item) {
        this.TodoService.destroy(item.id)
        .then(
          (itemDeleted) => {
            var self = this
            this.item.todos.forEach((todo) => {
              if (todo.id === itemDeleted.id) {
                self.item.todos.$remove(todo)
              }
            })
          },
          (error) => console.info(error)
        )
      }
    },
    components: {TodoIndex}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  .date-show {
    padding: 1em;
    .heading {
      margin: 0 0 1em 0;
    }
    h2, h3 {
      margin: 0;
      padding: 0;
    }
    h2 {
      font-weight: 100;
      font-size: 2.5em;
      text-transform: uppercase;
    }
    h3 {
      font-weight: normal;
      line-height: 1.2em;
      .btn {
        display: inline-block;
        padding: .3em 1em;
        line-height: 1rem;
        font-size: .7em;
        float: right;
        color: $color1;
        text-decoration: none;
        background: lighten($color3, 10%);
        border-radius: 4px;
      }
    }
  }
</style>
