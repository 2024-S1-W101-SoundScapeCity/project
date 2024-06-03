<!-- DashBoard.vue -->
<template>
  <div class="layout">
    <header>
      <div class="search-bar">
        <input type="text" v-model="query" placeholder="Search..." @input="search">
        <button @click="search">Enter</button>
      </div>
    </header>
    <div id="logo">
      <img src="@/assets/logo.png">
    </div>
      <div v-if="authenticated" id="menu">
        <button v-for="tab in tabs" v-bind:key="tab.name"
          v-bind:class="['tab-button', { active: currentTab === tab.name }]" @click="navigateToTab(tab)">
          {{ tab.name }}
        </button>
      </div>
      <div v-else style="margin-top: 4ch;"></div>
    <div class="dashboard-container">
      <div class="tab-content" id="app">
        <router-view></router-view>
      </div>
      <div id="footer">
        <img src="../assets/logo.png" alt="SoundScape City Logo" class="footer-logo" />
        <span>SoundScape City</span>
        <a href="#" @click="navigateToAbout()">About</a>
      </div>
    </div>
    <div v-if="authenticated" class="logout-container">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import MapPage from '@/components/MapPage.vue'
import UserProfile from '@/components/UserProfile.vue'

export default {
  data() {
    return {
      currentTab: 'Map',
      tabs: [
        { name: 'Map', route: '/dashboard/map' },
        { name: 'User Profile', route: '/dashboard/profile' },
      ],
      tabComponents: {
        'Map': MapPage,
        'User Profile': UserProfile,
      },
      authenticated: false,
    }
  },
  created() {
    if(localStorage.getItem('userCred')) {
      this.authenticated = true;
    }
    onAuthStateChanged(auth, (user) => {
      this.authenticated = !!user;
    });
  },
  computed: {
    currentTabComponent() {
      return this.tabComponents[this.currentTab]
    },
  },
  methods: {
    navigateToTab(tab) {
      this.currentTab = tab.name
      if (this.$route.path !== tab.route) {
        this.$router.push(tab.route)
      }
    },
    navigateToAbout() {
      this.currentTab = "About";
      if (this.$route.path !== "About") {
        this.$router.push("/about");
      }
    },
    logout() {
      auth.signOut().then(() => {
        localStorage.removeItem('userCred');
        this.$router.push('/');
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    },
  },
  watch: {
    $route(to, from) {
      console.log('route changed from ' + from.path + ' to ' + to.path)
    },
  },
}
</script>

<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccffdd;
  cursor: pointer;
  background: #ccffdd;
  margin-bottom: -1px;
  margin-right: -1px;
}

#menu button.active {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccffdd;
  background: #20eec5;
  margin-bottom: -1px;
  margin-right: -1px;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  background-color: #474c4f;
  border-collapse: collapse;
  margin: 5px;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.layout {
  display: flex;
  flex-direction: column;
}

#menu {
  text-align: left;
  margin: auto;
}

#logo {
  top: 10px;
  float: left;
  margin-bottom: -6ch;
  margin-top: -6ch;
}

#logo img {
  width: 20ch;
  height: auto;
}

.dashboard-container .content {
  width: 80ch;
  border: 1px solid #000000;
  background-color: #4f4f4f;
  flex: initial;
}

.dashboard-container .tab-content {
  border: 1px solid #000000;
  flex: auto;
}

#footer {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

#footer p {
  font-size: 70%;
}

#footer span {
  font-size: 100%;
  padding-right: 1ch;
}

.logout-button {
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  float: right;
  padding: 8px 16px;
  border-radius: 10px;
  background-color: #ff5252;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff0000;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.search-bar input {
  padding: 8px;
  margin-right: 5px;
}

.search-bar button {
  padding: 8px;
}
</style>
