<script setup>
import { ref } from 'vue'
defineProps({ language: String, darkMode: Boolean, copy: Object })
const emit = defineEmits(['language', 'theme', 'navigate-section'])
const menuOpen = ref(false)
const closeMenu = () => { menuOpen.value = false }
</script>

<template>
  <header class="site-header">
    <div class="header-inner container">
      <a class="brand" href="#home" @click.prevent="closeMenu(); emit('navigate-section', 'home')"><span class="brand-mark">13</span><span class="brand-name">13-MAKTAB<small>{{ language === 'uz' ? 'TAʼLIM MASKANI' : 'ПРОСТРАНСТВО ЗНАНИЙ' }}</small></span></a>
      <button class="menu-toggle" :aria-label="copy.menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><span></span><span></span></button>
      <nav class="main-nav" :class="{ 'main-nav--open': menuOpen }" :aria-label="language === 'uz' ? 'Asosiy navigatsiya' : 'Основная навигация'">
        <a href="#home" @click.prevent="closeMenu(); emit('navigate-section', 'home')">{{ copy.navHome }}</a><a href="#about" @click.prevent="closeMenu(); emit('navigate-section', 'about')">{{ copy.navSchool }}</a><a href="#news" @click.prevent="closeMenu(); emit('navigate-section', 'news')">{{ copy.navNews }}</a><a href="#people" @click.prevent="closeMenu(); emit('navigate-section', 'people')">{{ copy.navPeople }}</a>
      </nav>
      <div class="header-actions"><div class="language-switch" :aria-label="language === 'uz' ? 'Tilni tanlang' : 'Выберите язык'"><button :class="{ selected: language === 'uz' }" @click="emit('language', 'uz')">UZ</button><span>/</span><button :class="{ selected: language === 'ru' }" @click="emit('language', 'ru')">RU</button></div><button class="theme-toggle" :aria-label="darkMode ? copy.modeDay : copy.modeNight" :title="darkMode ? copy.modeDay : copy.modeNight" @click="emit('theme')"><span>{{ darkMode ? '☼' : '☾' }}</span></button></div>
    </div>
  </header>
</template>
