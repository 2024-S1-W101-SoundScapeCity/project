<template>
  <div class="map">
    <div class="content-overlay">
      <button class="explore-button" @click="startExploring">
        Start Exploring
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPage',
  methods: {
    startExploring() {
      window.location.href = 'https://aut-gis.maps.arcgis.com/apps/Embed/index.html?webmap=40842990bba14a84923685e45eca7b10&extent=174.1199,-37.5038,176.1483,-36.5886&zoom=true&scale=true&search=true&searchextent=true&disable_scroll=true&theme=dark';
    }
  }
}
</script>

<style scoped>
.map {
  position: relative;
  height: 73vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0; /* You can set a background if needed */
}

.content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.explore-button {
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.explore-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}
</style>
