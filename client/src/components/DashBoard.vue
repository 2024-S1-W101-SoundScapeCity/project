<template>
  <div class="layout">
    <div id="menu">
      <div id="placeholder">logo</div>
      <button v-for="tab in tabs" v-bind:key="tab.name"
        v-bind:class="['tab-button', { active: currentTab === tab.name }]" v-on:click="currentTab = tab.name"
        @click="navigateToTab(tab.route)">
        {{ tab.name }}
      </button>
      <component v-bind:is="currentTabComponent" class="tab-button"></component>
    </div>
    <div class="dashboard-container">
      <div id="tab-content">
        <router-view></router-view>
      </div>
      <div id="footer">
        <p>footer text</p>
      </div>
    </div>
    <div class="logout-container">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>


<script>
import { auth } from '@/firebase';

export default {
  data() {
    return {
      currentTab: 'map',
      tabs: [
        { name: 'map', route: '/dashboard/map' },
        { name: 'menu item2', route: '/dashboard/menu item2' },
        { name: 'Menu Item 3', route: '/dashboard/menu item3' },
        { name: 'Menu Item 4', route: '/dashboard/menu item4' },
        { name: 'Menu Item 5', route: '/dashboard/menu item5' },
        { name: 'User Profile', route: '/dashboard/profile' },
      ],
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab.name
    },
  },
  methods: {
    navigateToTab(route) {
      this.$router.push(route)
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/');
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
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
  background-color: grey;
  border-collapse: collapse;
  margin: 5px;
}

.layout {
  display: flex;
  flex-direction: column;
}

#menu {
  text-align: left;
}

#menu img {
  size: 10%;
}

#menu #placeholder {
  background-color: grey;
  width: 18vw;
  height: 6vw;
}

.dashboard-container #content {
  width: 80ch;
  height: 100vh;
  border: 1px solid #000000;
  background-color: #4f4f4f;
  flex: initial;
}

.dashboard-container #tab-content {
  border: 1px solid #000000;
  flex: auto;
}

#footer {
  text-decoration: none;
  text-align: center;
  float: bottom;
}

#footer p {
  font-size: 70%;
}

#footer p span {
  font-size: 100%;
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
</style>
