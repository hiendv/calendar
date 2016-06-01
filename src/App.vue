<template>
  <div id="app">
    <div class="container container-tl container-tp container-pl">
      <main id="main">
        <heading></heading>
        <calendar></calendar>
      </main>
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import Heading from './components/Heading'
import TodoService from './services/todoService'
import MomentService from './services/momentService'
import localforage from 'localforage'
import alertify from 'alertify.js'
export default {
  data () {
    /**
     * ServiceProvider
     */
    let todo = TodoService
    .setVM(this)
    .setStorage(
      localforage.createInstance({
        name: 'todos'
      })
    )

    let moment = MomentService
    .setVM(this)
    .setStorage(
      localforage.createInstance({
        name: 'moments'
      })
    )
    return {
      MomentService: moment,
      TodoService: todo
    }
  },
  components: {
    Heading,
    Calendar
  },
  events: {
    'todo:created' (item) {
      alertify.success('Your note has been created !')
    },
    'todo:updated' () {
      alertify.success('Your note has been updated !')
    },
    'todo:deleted' () {
      alertify.error('Your note has been deleted !')
    },
    'todo:deleting' (item, resolve, reject) {
      alertify.confirm('Are you sure?', resolve, reject)
    }
  }
}
</script>
<style src="./assets/sass/main.scss" lang="scss"></style>
