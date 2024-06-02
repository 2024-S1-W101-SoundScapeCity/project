<template>
  <div class="background-video-container">
    <video autoplay muted loop id="background-video">
      <source src="@/assets/earth-from-space.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="content-overlay">
      <div id="logo-container">
        <img :src="logo" alt="Logo" class="logo"/>
      </div>
      <h1>Welcome to SoundScape City</h1>
      <p>Explore music your way.</p>
      <div class="button-container">
        <button v-on:click="loadLogin" class="button-style-1">Login</button>
        <button v-on:click="loadRegistration" class="button-style-2">Sign Up</button>
      </div>
    </div>
    <div class="music-player">
      <audio controls autoplay loop>
        <source src="@/assets/minecraft-music.mp3" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  methods: {
    loadLogin() {
      this.$router.push('/login')
    },
    loadRegistration() {
      this.$router.push('/register')
    },
  },
}
</script>

<style scoped>
.background-video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

#background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.content-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
}

#logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 200px;
  height: auto;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
}

.button-container {
  display: flex;
  justify-content: space-around;
  width: 50%;
  max-width: 400px;
  margin: 20px auto;
}

.button-style-1,
.button-style-2 {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
  outline: none;
}

.button-style-1 {
  background-color: #3498db;
  color: white;
}

.button-style-1:hover {
  transform: scale(1.1);
}

.button-style-2 {
  background-color: #2ecc71;
  color: white;
}

.button-style-2:hover {
  transform: scale(1.1);
}

.music-player {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
}

.music-player audio {
  width: 300px;
}
</style>
