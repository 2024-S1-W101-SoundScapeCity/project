<template>
  <div class="about-container">
    <div class="content-overlay">
      <h1>About SoundScape City</h1>
      <p>SoundScape City is a platform where users can explore and share ambient sounds and videos from around the
        world. Whether you want to relax to the sounds of nature or discover new music from different cultures,
        SoundScape City has something for everyone.</p>
      <h2 class="left-align">How to Use</h2>
      <ul class="left-align">
        <li><strong>Explore:</strong> Browse through the collection of sounds and videos on the homepage.</li>
        <li><strong>Search:</strong> Use the search bar to find specific sounds or videos by tags, location, or user.
        </li>
        <li><strong>Upload:</strong> Share your own ambient sounds and videos by creating an account and uploading your
          files.</li>
        <li><strong>Profile:</strong> Manage your uploads and account information in your user profile.</li>
      </ul>
      <h2 class="left-align">Team:</h2>
      <ul class="left-align">
        <li><strong>Product Owner:</strong> Yoosef - JSY4969</li>
        <li><strong>Scrum Master:</strong> Johnnie - RWW5204</li>
        <li><strong>Developer:</strong> Naomi - YNW7766</li>
        <li><strong>Developer:</strong> Hubert - NWQ2105</li>
      </ul>
      <div class="button-container">
        <button v-on:click="goToMap" class="button-style-1">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToMap() {
      if (localStorage.getItem('userCred')) {
      this.$router.push('/dashboard/map');
      }
      else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}

#logo img {
  width: 100px;
  height: auto;
}

.logout-container {
  display: flex;
  align-items: center;
}

.logout-button {
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

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-color: #474c4f;
  padding: 20px;
  box-sizing: border-box;
}

.content-overlay {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
  /* Center align text */
}

.left-align {
  text-align: left;
  /* Align text to the left */
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
}

h2 {
  margin-top: 20px;
  font-size: 1.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

.button-container {
  margin-top: 20px;
}

.button-style-1 {
  background-color: #ff8c00;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-style-1:hover {
  background-color: #ffa500;
}
</style>
