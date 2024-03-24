<template>
  <div>
    <div id="menu">
      <div id="placeholder">logo</div>
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>
    <div id="content">
      <h1>map square goes here</h1>
    </div>
    <div id="footer">
      <p>footer text</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTab: 'menu',
      tabs: [
        'menu',
        'menu item2',
        'menu item3',
        'menu item4',
        'menu item5',
        'menu item6',
      ],
    }
  },
  computed: {
    currentTabComponent() {
      return 'tab-' + this.currentTab.toLowerCase()
    },
  },
}
</script>
<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
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
#content {
  width: 75vw;
  height: 80vh;
  margin-left: 20vw;
  background-color: grey;
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
</style>
