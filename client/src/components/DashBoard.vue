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
          <span>{{ tab.name }}</span> &nbsp; <img :src="tab.icon" class="tab-icon">
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
      <button class="logout-button" @click="logout">Logout<img src="@/assets/icons/logout_24dp_FILL0_wght400_GRAD0_opsz24.svg"></button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import MapPage from '@/components/MapPage.vue'
import UserProfile from '@/components/UserProfile.vue'
import SoundPlayer from '@/components/SoundPlayer.vue'

export default {
  data() {
    return {
      currentTab: '',
      tabs: [
        { name: 'Map', icon: require('@/assets/icons/map_24dp_FILL0_wght400_GRAD0_opsz24.svg'), route: '/dashboard/map' },
        { name: 'User Profile', icon: require('@/assets/icons/person_24dp_FILL0_wght400_GRAD0_opsz24.svg'), route: '/dashboard/profile' },
        { name: 'Player', icon: require('@/assets/icons/music-svgrepo-com.svg'), route: '/dashboard/soundplayer' },
      ],
      tabComponents: {
        'Map': MapPage,
        'User Profile': UserProfile,
        'Player': SoundPlayer
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
    updateCurrentTab() {
      const currentPath = this.$route.path;
      const matchingTab = this.tabs.find(tab => tab.route === currentPath);
      if (matchingTab) {
        this.currentTab = matchingTab.name;
      } else {
        this.currentTab = 'Map'; //default
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log('route changed from ' + from.path + ' to ' + to.path)
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateCurrentTab();
    });
  },
}
</script>

<style scoped>
.tab-button {
  padding: 1ch 2ch;
  border-top-left-radius: 1ch;
  border-top-right-radius: 1ch;
  border: 1px solid #ccffdd;
  cursor: pointer;
  background: #ccffdd;
  margin-bottom: -1px;
  margin-right: -1px;
  align-items: center;
}

#menu {
  text-align: left;
  margin: auto;
}

#menu button.active {
  background: #20eec5;
  padding-top: 1.5ch;
}

#menu button:hover:not(.active) {
  filter: brightness(90%);
  fill: black;
}

#menu.tab-icon {
  float: right;
  top: 0;
}

#menu button span {
  font-weight: 700;
  float: left;
  margin-top: 0.5ch;
}

.dashboard-container {
  z-index: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  border-radius: 2ch;
  background-color: #474c4f;
  border-collapse: collapse;
  margin: 0 1ch;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.layout {
  display: flex;
  flex-direction: column;
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
  border-radius: 2ch;
  background-color: #4f4f4f;
  flex: initial;
}

.dashboard-container .tab-content {
  border-bottom: 1px solid black;
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

.logout-button>img {
  float: right;
  margin-top: -0.28ch;
  margin-left: 1ch;
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
