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
export default {
  data () {
    let todo = TodoService
    .setStorage(
      localforage.createInstance({
        name: 'todos'
      })
    )

    let moment = MomentService
    .setStorage(
      localforage.createInstance({
        name: 'moments'
      })
    )
    moment.setServices({todo: todo})
    return {
      MomentService: moment,
      TodoService: todo
    }
  },
  components: {
    Heading,
    Calendar
  }
}
</script>
<style src="./assets/sass/main.scss" lang="scss"></style>
