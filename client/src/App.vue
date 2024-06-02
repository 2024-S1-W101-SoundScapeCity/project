<template>
  <div id="app">
    <nav>
      <!-- Existing navigation code -->
      <SearchBar @search="handleSearch"/>
    </nav>
    <router-view></router-view>
    {{ output }}
  </div>
</template>

<script>
import api from '@/services/api'
import { RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    RouterView,
    SearchBar
  },
  data() {
    return {
      output: null
    }
  },
  methods: {
    async fetchGreeting() {
      try {
        const response = await api.get('/')
        console.log(response)
      } catch (error) {
        console.error('Error fetching greeting: ', error)
      }
    },
    handleSearch(query) {
      // Implement the search logic here, e.g., filter the list of uploads
      console.log('Search query:', query);
    }
  },
  watch: {
    $route(to, from) {
      console.log('route changed from ' + from.path + ' to ' + to.path)
      this.fetchGreeting();
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
