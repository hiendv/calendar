<template>
  <section class="date-show">
  <h3>{{ moment.format("MMMM Do") }}</h3>
  <h2>{{ moment.format("dddd") }}</h2>
  <todo-index :items.sync="item.todos"></todo-index>
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
    computed: {
      moment () {
        return this.$parent.MomentFactory(this.item.id)
      }
    },
    events: {
      'date:updated' (val) {
        this.show()
      }
    },
    methods: {
      show (date) {
        var item = date || this.item
        return this.$parent.MomentService.show(item.id)
        .then((date) => {
          this.item = date
        }, (error, message, id) => {
          console.info(error, message, id)
        })
      }
    },
    components: {TodoIndex}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  .date-show {
    padding: 1em;
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
    }
  }
</style>
