<template>
  <div id="register">
    <h1>Create an Account</h1>
    <div v-if="error" class="error-page">
      {{ error }}
      <button @click="clearForm">Retry</button>
      <button @click="loadLogin">Login</button>
    </div>
    <form @submit.prevent="registerAccount">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="text" placeholder="Name" v-model="name" />
      <input class="button" type="submit" value="registerAccount" />
    </form>
  </div>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from '@/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: null,
    }
  },
  methods: {
    async registerAccount() {
      try {
        // create user account
        const userCred = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        await userCred.user.updateProfile({ displayName: this.name })

        // redirect to dashboard
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message
      }
    },
    clearForm() {
      this.error = null
    },
    loadLogin() {
      this.$router.push('/login')
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
