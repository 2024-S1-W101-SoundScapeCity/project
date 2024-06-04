<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Change Password</h2>
            <form @submit.prevent="changePassword">
                <div class="input-row">
                    <label for="oldPassword">Old Password:</label>
                    <input type="password" id="oldPassword" v-model="oldPassword" required>
                </div>
                <div class="input-row">
                    <label for="newPassword">New Password:</label>
                    <input type="password" id="newPassword" v-model="newPassword" required>
                </div>
                <div class="input-row">
                    <label for="confirmPassword">Confirm New Password:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required>
                </div>
                <div class="error" v-if="passwordError">{{ passwordError }}</div>
                <div class="buttons">
                    <button type="button" @click="cancel">Cancel</button>
                    <button id="confirm" type="submit">Change Password</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordError: ''
    };
  },
  methods: {
    async changePassword() {
      const user = auth.currentUser;
      if (user) {
        const credentials = EmailAuthProvider.credential(user.email, this.oldPassword);
        try {
          await reauthenticateWithCredential(user, credentials);
          await updatePassword(user, this.newPassword);
          alert("Password updated successfully.");
          this.$emit('passwordChanged');
          this.$emit('close');
        } catch (error) {
          console.error("Error changing password:", error);
          if (error.code === 'auth/weak-password') {
            this.passwordError = "Password should be at least 6 characters.";
          } else {
            this.passwordError = "Failed to change password. Please make sure your old password is correct.";
          }
        }
      }
    },
    cancel() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
}

h2 {
    margin-top: -0.25ch;
}

button {
    padding: 0.5ch 1ch;
    border-radius: 1ch;
    border: 0;
    margin-right: 1.5ch;
    text-transform: uppercase;
    font-weight: bold;
    background-color: grey;
    color: white;
    cursor: pointer;
}

.error {
    color: red;
}

.buttons {
    margin-top: 2ch;
}

.input-row {
    margin: 1ch;
}

.input-row > input {
    float: right;
}

.input-row > label {
    margin-right: 1ch;
}

button#confirm {
    float: right;
    margin-right: 1ch;
    background-color: #5cba5c;
}
</style>