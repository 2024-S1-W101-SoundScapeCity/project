<template>
  <div id="login">
    <h1>Login</h1>
    <div v-if="error" class="error-page">
      {{ error }}
      <button @click="clearForm">Retry</button>
      <button @click="loadRegister">Create Account</button>
    </div>
    <form class="login-form" @submit.prevent="login">
      <input id="email" type="text" placeholder="Email" v-model="email" />
      <input
        id="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <input class="button" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { auth, signInWithEmailAndPassword } from '@/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message
      }
    },
    clearForm() {
      this.error = null
    },
    loadRegister() {
      this.$router.push('/signup')
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-page {
  background-color: #ffaaaa;
  padding: 20px;
  border-radius: 5px;
  border-width: 1mm;
  border-color: #d8000c;
}
</style>
