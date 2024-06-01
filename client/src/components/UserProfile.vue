<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <p>User Profile</p>
    <div id="data">
      <div v-if="userData">
        <p>Account ID: {{ userData.accountId }}</p>
        <p>Account Type: {{ userData.accountType }}</p>
        <p>Created: {{ formatDate(userData.created) }}</p>
        <p>Email: {{ userData.email }}</p>
        <p>Name: {{ userData.name }}</p>
      </div>
      <div v-else>
        Loading user data...
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import { collection, query, where, getDocs} from 'firebase/firestore';

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
    }
  },
  async created() {
    try {
      const user = auth.currentUser;
      console.log(user.uid);
      console.log(user.displayName);
      if (user) {
        const userCollectionRef = collection(db, 'users');
        const q = query(userCollectionRef, where('accountId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          this.userData = doc.data();
        } else {
          console.error('User document does not exist.');
        }
      } else {
        console.error('No user signed in.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
};
</script>

<style scoped>
#data {
  border: 1px solid black;
  margin: auto;
  margin-bottom: 5%;
  max-width: 80%;
  min-width: 50%;
  min-height: 30vw;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
