<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/services/api'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView,
  },
  methods: {
    fetchGreeting() {
      api()
        .get('/')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
  mounted() {
    this.fetchGreeting()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
