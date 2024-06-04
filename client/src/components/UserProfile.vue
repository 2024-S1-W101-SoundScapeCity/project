<template>
  <div class="profile">
    <h2 class="title">User Profile</h2>
    <div id="data" v-if="userData">
      <div id="userData">
        <p><span class="tag">Name:</span> {{ userData.name }}</p>
        <p><span class="tag">Email:</span> {{ userData.email }}</p>
        <p><span class="tag">Created:</span> {{ formatDate(userData.created) }}</p>
        <p><span class="tag">Account Type:</span> {{ userData.accountType }}</p>
        <p v-if="userData.accountType === 'Admin'">
          <span class="tag">Account ID: </span>
          <span @click="revealAccountId" class="account-id-hidden" v-if="!accountIdRevealed">Click to reveal</span>
          <span class="account-id" v-else>{{ userData.accountId }}</span>
        </p>
      </div>
      <div class="controls">
        <div>
          <label for="displayName">Display Name:</label>
          <input type="text" id="displayName" v-model="displayName" />
          <button @click="updateDisplayName">Update Name</button>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
          <button @click="updateEmail">Update Email</button>
        </div>
        <div>
          <button @click="showPasswordModal = true">Change Password</button>
        </div>
        <div class="delete-button-container">
          <br>
          <button @click="deleteAccount" class="delete-button">DELETE ACCOUNT</button>
        </div>
      </div>
    </div>
    <div v-else style="margin-bottom: 2ch">
      Loading user data...
    </div>
  </div>
  <ConfirmationModal :message="'Are you sure you want to delete your account? This action cannot be undone.'"
    :showModal="showConfirmationModal" @confirm="deleteAccountConfirmed" @cancel="showConfirmationModal = false"
    :danger=true />
  <PasswordChangeModal v-if="showPasswordModal" @changePassword="changePassword" @close="showPasswordModal = false" />
</template>

<script>
import ConfirmationModal from "@/components/reusable/ConfirmationModal.vue";
import PasswordChangeModal from "@/components/fixed/PasswordChangeModal.vue";
import { auth, db } from '@/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile, updateEmail, deleteUser } from 'firebase/auth';

export default {
  name: 'UserProfile',
  components: {
    ConfirmationModal,
    PasswordChangeModal
  },
  data() {
    return {
      userData: null,
      displayName: '',
      email: '',
      password: '',
      accountIdRevealed: false,
      showConfirmationModal: false,
      showPasswordModal: false
    };
  },
  methods: {
    formatDate(timestamp) {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toLocaleString();
      }
      return "Invalid Date";
    },
    async loadUserData(user) {
      try {
        console.log("Loading user ID: " + user.uid);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          this.userData = userDoc.data();
          this.displayName = this.userData.name;
          this.email = this.userData.email;
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async updateDisplayName() {
      const user = auth.currentUser;
      if (user) {
        try {
          await updateProfile(user, { displayName: this.displayName });
          const userDoc = doc(db, 'users', user.uid);
          await updateDoc(userDoc, { name: this.displayName });
          console.log("User display name changed to: '" + this.displayName + "'");
          alert("Display name updated successfully.");
        } catch (error) {
          console.error("Error updating display name:", error);
          alert("Failed to update display name.");
        }
      }
    },
    async updateEmail() {
      const user = auth.currentUser;
      if (user) {
        try {
          await updateEmail(user, this.email);
          const userDoc = doc(db, 'users', user.uid);
          await updateDoc(userDoc, { email: this.email });
          alert("Email updated successfully.");
        } catch (error) {
          console.error("Error updating email:", error);
          alert("Failed to update email.");
        }
      }
    },
    async deleteAccount() {
      this.showConfirmationModal = true;
    },
    async deleteAccountConfirmed() {
      const user = auth.currentUser;
      if (user) {
        try {
          await deleteUser(user);
          alert("Account deleted successfully.");
          this.$router.push('/');
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("Failed to delete account.");
        }
      }
    },
    revealAccountId() {
      this.accountIdRevealed = !this.accountIdRevealed;
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loadUserData(user);
      } else {
        console.error("No user signed in.");
      }
    });
  }
};
</script>


<style scoped>
.profile {
  text-align: center;
}

.title {
  font-weight: bold;
  text-transform: uppercase;
}

#data {
  margin: auto;
  margin-bottom: 3ch;
  margin-top: 3ch;
  max-width: 60%;
  min-width: 40%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  color: black;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 2ch;
}

#userData {
  text-align: left;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1ch 0 0 0;
}

.controls>div>label {
  padding-right: 1ch;
}

.controls>div>input {
  margin-right: 1ch;
  border-radius: 1ch;
  border: 1px solid rgb(130, 130, 130);
  padding: 0.5ch;
}

.controls>div {
  margin-bottom: 10px;
}

.controls button:not(.delete-button) {
  cursor: pointer;
  border: 0;
  padding: 0.5ch 1ch;
  border-radius: 1ch;
  background-color: gray;
  color: white;
}

.delete-button-container {
  margin-top: auto;
}

.delete-button {
  align-self: flex-end;
  background-color: #ff5252;
  color: white;
  font-weight: bold;
  border-radius: 1ch;
  border: 0;
  padding: 0.5ch 1ch;
}

.delete-button:hover {
  background-color: red;
  cursor: pointer;
}

@media (min-width: 768px) {
  #data {
    grid-template-columns: repeat(2, 1fr);
  }

  #userData {
    grid-column: 1;
  }

  .controls {
    grid-column: 2;
    float: none;
  }
}

p {
  margin: 10px 0;
}

.loading {
  font-style: italic;
}

.account-id {
  color: darkgreen;
  font-weight: bold;
  cursor: default;
}

.account-id-hidden {
  color: darkgreen;
  font-weight: bold;
  cursor: pointer;
}

.tag {
  font-weight: bold;
}
</style>
