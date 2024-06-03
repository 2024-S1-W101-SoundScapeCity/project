<template>
  <div class="background-video-container">
    <video autoplay muted loop id="background-video">
      <source src="@/assets/earth-from-space.mp4" type="video/mp4">
    </video>
    <div class="content-overlay">
      <div id="login">
        <h1>Login</h1>
        <div v-if="error" class="error-page">
          <span>There was an error logging you in.<br>
            Check your username and password are correct.<br>
            If you don't have an account, you can <a @click="loadRegister">create one by clicking here.</a> </span>
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
    </div>
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
  }
}
</script>

<style scoped>
.background-video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

#background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.content-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: rgb(60, 152, 243);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
}

#login {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 400px;
  max-width: 100%;
  text-align: left;
  padding-top: 1ch;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.error-page {
  background-color: #ffaaaa;
  padding: 20px;
  border-radius: 5px;
  border: 1mm solid #d8000c;
  margin-bottom: 20px;
}

.error-page>span>a{
  cursor: pointer;
  text-decoration: underline;
  filter:brightness(85%);
}

.login-form input {
  display: block;
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form .button {
  display: block;
  width: 100%;
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-form .button:hover {
  background-color: #2980b9;
}
</style>
