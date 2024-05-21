<template>
    <div class="profile">
      <h1>{{ msg }}</h1>
      <p>User Profile</p>
      <div id="data">
        hello
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #data {
    border: 1px solid black;
    min-width: 50%;
    min-height: 30vw;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>