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
      isLoading: false
    }
  },
  methods: {
    async login() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCred) => {
          localStorage.setItem('userCred', userCred.user.accessToken)
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false;
      }
    },
    clearForm() {
      this.error = null
    },
    loadRegister() {
      this.$router.push('/register')
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
