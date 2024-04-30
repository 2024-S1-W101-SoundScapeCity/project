<template>
  <div class="layout">
    <div id="menu">
      <div id="placeholder">logo</div>
      <button v-for="tab in tabs" v-bind:key="tab.name" v-bind:class="['tab-button', { active: currentTab === tab.name }]"
        v-on:click="currentTab = tab.name" @click="navigateToTab(tab.route)">
        {{ tab.name }}
      </button>
      <component v-bind:is="currentTabComponent" class="tab-button"></component>
    </div>
    <div class="dashboard-container">
      <div id="tab-content">
        <router-view></router-view>
      </div>
      <div id="content" class="map-container">
        <iframe class="map-iframe" width="1080" height="720" frameborder="0" scrolling="no" allowfullscreen
          src="https://arcg.is/1veiH00"></iframe>
      </div>
      <div id="footer">
        <p>footer text</p>
      </div>
    </div>
  </div>
</template>
<script>
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
        { name: 'Menu Item 6', route: '/dashboard/menu item6' },
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
  flex-direction: row;
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
  float: left;
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

.map-container {
  position: relative;
  width: 80ch;
  /* Same width as #content */
  height: 100vh;
  /* Same height as #content */
}

.map-iframe {
  /*to make the iframe fit the entire container*/
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
