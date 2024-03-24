<template>
  <div>
    <div class="placeholder">logo</div>
    <h1>Welcome to SoundScape City</h1>
    <div class="button-container">
      <button v-on:click="loadLogin" class="button-style-1">Login</button>
      <button v-on:click="loadRegistration" class="button-style-2">
        Sign Up
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    loadLogin() {
      this.$router.push('/login')
    },
    loadRegistration() {
      this.$router.push('/register')
    },
  },
}
</script>
<style scoped>
.button-container {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}

.button-style-1,
.button-style-2 {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.button-style-1 {
  background-color: #3498db;
  color: white;
}

.button-style-1:hover {
  transform: scale(1.1);
}

.button-style-2 {
  background-color: #2ecc71;
  color: white;
}

.button-style-2:hover {
  transform: scale(1.1);
}

.placeholder {
  background-color: grey;
  width: 18vw;
  height: 6vw;
}
</style>
