<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
import CreateTodo from './components/CreateTodo.vue'

export default {
  name: 'app',
  components: {
    CreateTodo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
