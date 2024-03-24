<template>
  <div id="firebaseus-auth-container">
    <h1>Create an Account</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="text" placeholder="Name" v-model="name" />
    <button @click="loadDashboard">Sign Up</button>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import * as firebaseui from 'firebaseui'

var uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    {
      provider: auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      requireDisplayName: true,
    },
  ],
}

export default {
  data() {
    return {}
  },
  methods: {
    loadDashboard() {
      this.$router.push('/dashboard')
    },
  },
  mounted() {
    // initialise firebaseui
    var ui = new firebaseui.auth.AuthUI(auth)
    if (ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
