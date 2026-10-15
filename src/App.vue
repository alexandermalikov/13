<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'

const language = ref('uz')
const darkMode = ref(false)
const route = useRoute()
const router = useRouter()

const copy = computed(() => language.value === 'uz' ? {
  eyebrow: 'BILIM — KELAJAK POYDEVORI', titleTop: 'Har bir kun —', titleAccent: 'yangi imkoniyat',
  intro: '13-maktab — bilim, doʻstlik va orzular sari birgalikda qadam tashlaydigan maskan.',
  explore: 'Maktab bilan tanishing', latest: 'Soʻnggi yangiliklar', newsTitle: 'Maktabimiz hayotidan', newsIntro: 'Yutuqlar, qiziqarli voqealar va biz bilan faxrlanadigan lahzalar.',
  read: 'Batafsil', schoolLabel: 'BIZNING MAKTAB', schoolTitle: 'Har bir oʻquvchi uchun imkoniyat', schoolText: 'Biz mehribon, xavfsiz va ilhomlantiruvchi muhitda sifatli taʼlim berishga intilamiz. Oʻquvchilarimizni mustaqil fikrlashga, izlanishga va katta orzular sari dadil qadam tashlashga ruhlantiramiz.',
  statStudents: 'MAKTAB RAQAMI', statTeachers: 'SAYT TILLARI', statYears: 'BIR MAQSAD', peopleLabel: 'BIZNING JAMOA', peopleTitle: 'Maktabimiz faxrlari', peopleIntro: 'Taʼlim va ijod yoʻlida bizni ilhomlantiradigan ustozlar va oʻquvchilar.', teachers: 'Ustozlar', students: 'Oʻquvchilar', teacherRole: 'Ona tili va adabiyot oʻqituvchisi', studentRole: 'Fan olimpiadasi sovrindori', teacherQuote: '“Har bir bolaning ichida kashf etilmagan isteʼdod bor.”', studentQuote: '“Qiziqish va mehnat — muvaffaqiyatning boshlanishi.”',
  joinTitle: 'Biz bilan birga oʻsing', joinText: 'Yangi oʻquv yili, yangidan-yangi bilimlar va unutilmas xotiralar sari!', joinCta: 'Maktab haqida', footerText: 'Bilim, mehr va ilhom maskani.', navHome: 'Bosh sahifa', navSchool: 'Maktab haqida', navNews: 'Yangiliklar', navPeople: 'Jamoamiz', modeDay: 'Kunduzgi rejim', modeNight: 'Tungi rejim', menu: 'Menyuni ochish'
} : {
  eyebrow: 'ЗНАНИЯ — ФУНДАМЕНТ БУДУЩЕГО', titleTop: 'Каждый день —', titleAccent: 'новая возможность',
  intro: 'Школа № 13 — место, где вместе открывают знания, дружбу и смело идут к мечтам.',
  explore: 'Познакомиться со школой', latest: 'Последние новости', newsTitle: 'Жизнь нашей школы', newsIntro: 'Достижения, интересные события и моменты, которыми мы гордимся.',
  read: 'Подробнее', schoolLabel: 'НАША ШКОЛА', schoolTitle: 'Возможности для каждого ученика', schoolText: 'Мы стремимся дать качественное образование в доброжелательной, безопасной и вдохновляющей атмосфере. Помогаем ученикам мыслить самостоятельно, исследовать мир и уверенно идти к своим мечтам.',
  statStudents: 'НОМЕР ШКОЛЫ', statTeachers: 'ЯЗЫКА САЙТА', statYears: 'ОБЩАЯ ЦЕЛЬ', peopleLabel: 'НАША КОМАНДА', peopleTitle: 'Гордость нашей школы', peopleIntro: 'Учителя и ученики, которые вдохновляют нас в учёбе и творчестве.', teachers: 'Учителя', students: 'Ученики', teacherRole: 'Учитель родного языка и литературы', studentRole: 'Призёр предметной олимпиады', teacherQuote: '«В каждом ребёнке есть талант, который ждёт своего открытия».', studentQuote: '«Интерес и труд — начало больших достижений».',
  joinTitle: 'Растите вместе с нами', joinText: 'Новый учебный год, новые знания и воспоминания, которые останутся с вами!', joinCta: 'О школе', footerText: 'Место знаний, доброты и вдохновения.', navHome: 'Главная', navSchool: 'О школе', navNews: 'Новости', navPeople: 'Наша команда', modeDay: 'Дневной режим', modeNight: 'Ночной режим', menu: 'Открыть меню'
})

function setLanguage(value) {
  language.value = value
  document.documentElement.lang = value
  localStorage.setItem('school13-language', value)
}

function toggleTheme() {
  darkMode.value = !darkMode.value
  localStorage.setItem('school13-theme', darkMode.value ? 'dark' : 'light')
}

async function navigateToSection(section) {
  if (route.name !== 'home') await router.push({ name: 'home' })
  await nextTick()
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  darkMode.value = localStorage.getItem('school13-theme') === 'dark'
  setLanguage(localStorage.getItem('school13-language') || 'uz')
})
</script>

<template>
  <div class="site-shell" :class="{ 'theme-dark': darkMode }">
    <Header :language="language" :dark-mode="darkMode" :copy="copy" @language="setLanguage" @theme="toggleTheme" @navigate-section="navigateToSection" />
    <RouterView v-slot="{ Component }">
      <component :is="Component" :language="language" :copy="copy" @navigate-section="navigateToSection" />
    </RouterView>
    <footer class="site-footer container"><a class="footer-brand" href="#home" @click.prevent="navigateToSection('home')"><span class="brand-mark">13</span><span>13-MAKTAB<small>{{ copy.footerText }}</small></span></a><span>© 2026 {{ language === 'uz' ? '13-maktab. Barcha huquqlar himoyalangan.' : 'Школа № 13. Все права защищены.' }}</span><a href="#home" class="back-top" @click.prevent="navigateToSection('home')">↑</a></footer>
  </div>
</template>
