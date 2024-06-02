<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <div v-if="!isHomePage" class="search-bar">
        <input type="text" v-model="query" placeholder="Search..." @input="search">
        <button @click="search">Enter</button>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  methods: {
    search() {
      this.$emit('search', this.query);
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.search-bar input {
  padding: 8px;
  margin-right: 5px;
}

.search-bar button {
  padding: 8px;
}
</style>
