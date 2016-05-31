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
import moment from 'moment'
import Calendar from './components/Calendar'
import Heading from './components/Heading'
import TodoService from './services/todoService'
import localforage from 'localforage'
export default {
  data () {
    return {
      DateFactory: moment,
      TodoService: TodoService.setStorage(
        localforage.createInstance({
          name: 'todos'
        })
      )
    }
  },
  components: {
    Heading,
    Calendar
  }
}
</script>
<style src="./assets/sass/main.scss" lang="scss"></style>
