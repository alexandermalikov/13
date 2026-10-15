<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <div class="hero-field">
    <Header />
    <img class="hero-back-image" src="../assets/back-image.png" alt="" />
  </div>
</template>

<style scoped>
.hero-field {
  position: relative;
  width: 100%;
  height: 100vh;
}

.hero-back-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
