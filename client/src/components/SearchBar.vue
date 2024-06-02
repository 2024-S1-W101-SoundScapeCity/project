<template>
    <div class="search-bar">
      <input type="text" v-model="query" placeholder="Search..." @input="search">
      <button @click="search">Enter</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: ''
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
    display: inline-block;
    margin-left: 20px;
  }
  
  .search-bar input {
    padding: 5px;
    font-size: 16px;
  }
  
  .search-bar button {
    padding: 5px 10px;
    font-size: 16px;
    margin-left: 5px;
    cursor: pointer;
  }
  </style>
  
