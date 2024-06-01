<template>
  <div id="register">
    <h1>Create an Account</h1>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ error }}</p>
        <button @click="clearForm">Retry</button>
        <button @click="loadLogin">Login</button>
      </div>
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
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  collection,
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
        const userRef = doc(collection(db, 'users'))
        const userData = {
          accountType: 'Regular',
          email: this.email,
          name: this.name,
          created: Timestamp.fromDate(new Date()),
          accountId: userCred.user.uid,
        }
        await setDoc(userRef, userData)
        console.log('user created')

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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-page {
  background-color: #ffaaaa;
  padding: 20px;
  border-radius: 5px;
  border-width: 1mm;
  border-color: #d8000c;
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: auto;
  top: auto;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
</style>
