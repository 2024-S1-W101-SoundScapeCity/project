<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <p>User Profile</p>
    <div id="data">
      <div id="userData" v-if="userData">
        <p><span class="tag">Name:</span> {{ userData.name }}</p>
        <p><span class="tag">Email:</span> {{ userData.email }}</p>
        <p><span class="tag">Created:</span> {{ formatDate(userData.created) }}</p>
        <p><span class="tag">Account Type:</span> {{ userData.accountType }}</p>
        <p v-if="userData.accountType === 'Admin'"><span class="tag">Account ID:</span> <span class="account-id">{{ userData.accountId }}</span></p>
        <!--TODO: ADD PROFILE CONTROL BUTTONS HERE-->
      </div>
      <div v-else>
        Loading user data...
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'UserProfile',
  props: {
    msg: String
  },
  data() {
    return {
      userData: null
    };
  },
  methods: {
    formatDate(timestamp) {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toLocaleString();
      }
      return 'Invalid Date';
    },
    async loadUserData(user) {
      try {
        console.log("Loading user ID: " + user.uid);
        const userCollectionRef = collection(db, 'users');
        const q = query(userCollectionRef, where('accountId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          this.userData = doc.data();
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loadUserData(user);
      } else {
        console.error('No user signed in.');
      }
    });
  }
};
</script>

<style scoped>
.profile {
  text-align: center;
}

#data {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: auto;
  margin-bottom: 3ch;
  margin-top: 3ch;
  max-width: 60%;
  min-width: 40%;
  padding: 20px;
}

p {
  margin: 10px 0;
}

.loading {
  font-style: italic;
}

.account-id {
  color:darkgreen;
}

.tag {
  font-weight: bold;
}

#userData {
  text-align: left;
}
</style>
