<script setup></script>
<template>
  <div class="header">
    <nav>
      <ul>
        <li><a href="#home">Yangiliklar</a></li>
      </ul>
      <ul>
        <li><a href="#home">Kirish</a></li>
      </ul>
    </nav>
  </div>
</template>
<style scoped>
.header {
  background-color: var(--teal-50);
  color: black;
  padding: 1rem;
  z-index: 1000;
}
nav {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav a {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
}
</style>
