<template>
  <div class="background-video-container">
    <video autoplay muted loop id="background-video">
      <source src="@/assets/earth-from-space.mp4" type="video/mp4">
    </video>
    <div id="register" class=".content-overlay">
      <h1>Create an Account</h1>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <p>{{ error }}</p>
          <button @click="clearForm">Retry</button>
          <button @click="loadLogin">Go to Login</button>
        </div>
      </div>
      <form @submit.prevent="registerAccount">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="text" placeholder="Name" v-model="name" />
        <input class="button" type="submit" value="Register Account" />
      </form>
    </div>
  </div>
</template>

<script>
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  db,
  Timestamp,
  setDoc,
  doc,
} from '@/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: null,
      showModal: false,
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
        await updateProfile(userCred.user, { displayName: this.name })

        // add user info to user collection
        const userRef = doc(db, 'users', userCred.user.uid);
        const userData = {
          accountType: 'Regular',
          email: this.email,
          name: this.name,
          created: Timestamp.fromDate(new Date()),
          accountId: userCred.user.uid,
        }
        await setDoc(userRef, userData);
        console.log('user created: ' + userCred.user.uid);

        // redirect to dashboard
        this.$router.push('/dashboard')
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use': {
            this.error = 'This email is already in use.'
            break
          }
          case 'auth/insufficent-permission': {
            this.error = 'Permissions Error: Please try login'
            console.log(
              'Firebase has encountered a permissions error. Please update'
            )
            break
          }
          default: {
            this.error = error.message
            console.log(error)
          }
        }
        this.showModal = true
      }
    },
    clearForm() {
      this.error = null
      this.showModal = false
    },
    loadLogin() {
      this.$router.push('/login')
    },
  },
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

#register {
  margin: auto;
  margin-top: 25vh;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(60, 152, 243);
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 25%;
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

.error-page>span>a {
  cursor: pointer;
  text-decoration: underline;
  filter: brightness(85%);
}

#register>form input {
  display: block;
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#register>form .button {
  display: block;
  width: 106%;
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

#register>form .button:hover {
  background-color: #2980b9;
}

.error-page {
  background-color: #ffaaaa;
  padding: 20px;
  border-radius: 5px;
  border-width: 1mm;
  border-color: #d8000c;
}

.modal {
  position: fixed;
  z-index: 1;
  left: auto;
  top: auto;
  width: 100%;
  height: 110%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
  border-radius: 1ch;
}

.modal-content button {
  margin-right: 1ch;
}
</style>
