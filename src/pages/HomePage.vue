<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getPeople, getPublishedNews, getSettings } from '../services/contentService.js'

const props = defineProps({ language: { type: String, required: true }, copy: { type: Object, required: true } })
const activeFilter = ref('all')
const news = ref([])
const people = ref([])
const settings = ref({})
const filters = computed(() => props.language === 'uz'
  ? [{ id: 'all', label: 'Barchasi' }, { id: 'school', label: 'Maktab hayoti' }, { id: 'students', label: "O'quvchilar" }, { id: 'events', label: 'Tadbirlar' }]
  : [{ id: 'all', label: 'Все' }, { id: 'school', label: 'Жизнь школы' }, { id: 'students', label: 'Ученики' }, { id: 'events', label: 'События' }])
const visibleNews = computed(() => activeFilter.value === 'all' ? news.value : news.value.filter(item => item.category === activeFilter.value))
const loadContent = async () => { [news.value, people.value] = await Promise.all([getPublishedNews(props.language), getPeople()]); settings.value = await getSettings() }
const aboutTitle = computed(() => settings.value[`about_title_${props.language}`] || props.copy.schoolTitle)
const aboutText = computed(() => settings.value[`about_text_${props.language}`] || props.copy.schoolText)
const stats = computed(() => props.language === 'uz' ? [settings.value.stat_label_1_uz || props.copy.statStudents, settings.value.stat_label_2_uz || props.copy.statTeachers, settings.value.stat_label_3_uz || props.copy.statYears] : [settings.value.stat_label_1_ru || props.copy.statStudents, settings.value.stat_label_2_ru || props.copy.statTeachers, settings.value.stat_label_3_ru || props.copy.statYears])
const loadNews = async () => { news.value = await getPublishedNews(props.language) }
onMounted(loadContent)
watch(() => props.language, loadNews)
</script>

<template>
  <main class="home-page">
  <section id="home" class="hero">
    <div class="hero__photo"></div><div class="hero__shade"></div>
    <div class="hero__orb hero__orb--one"></div><div class="hero__orb hero__orb--two"></div>
    <div class="hero__content container">
      <p class="eyebrow hero__eyebrow"><span></span>{{ copy.eyebrow }}</p>
      <h1>{{ copy.titleTop }}<br><em>{{ copy.titleAccent }}</em></h1>
      <p class="hero__intro">{{ copy.intro }}</p>
      <a class="button button--light" href="#about">{{ copy.explore }} <span aria-hidden="true">↗</span></a>
      <div class="hero__bottom"><span class="hero__school-mark">13</span><span>13-MAKTAB <i>•</i> SCHOOL NO. 13</span><a href="#news" :aria-label="copy.navNews">↓</a></div>
    </div>
    <div class="hero__side-note">{{ language === 'uz' ? 'BILIM BILAN YUKSALAMIZ' : 'РАСТЁМ ВМЕСТЕ СО ЗНАНИЯМИ' }}</div>
  </section>

  <section id="about" class="intro-section section-pad container">
    <div class="intro-section__label"><span class="section-number">01</span><span class="eyebrow">{{ copy.schoolLabel }}</span></div>
    <div class="intro-section__body"><h2>{{ aboutTitle }}</h2><p>{{ aboutText }}</p>
      <div class="stats"><div class="stat"><strong>13</strong><small>{{ stats[0] }}</small></div><div class="stat"><strong>2</strong><small>{{ stats[1] }}</small></div><div class="stat"><strong>1</strong><small>{{ stats[2] }}</small></div></div>
    </div>
    <div class="intro-section__seal" aria-hidden="true"><span>13</span><small>{{ language === 'uz' ? 'MAKTAB' : 'ШКОЛА' }}</small><i>✳</i></div>
  </section>

  <section id="news" class="news-section section-pad">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow"><span class="section-number">02</span>{{ copy.latest }}</p><h2>{{ copy.newsTitle }}</h2><p class="section-description">{{ copy.newsIntro }}</p></div><a class="text-link" href="#contact">{{ language === 'uz' ? 'Biz bilan bogʻlaning' : 'Связаться с нами' }} <span>↗</span></a></div>
      <div class="filter-row" role="tablist" :aria-label="copy.latest"><button v-for="filter in filters" :key="filter.id" :class="{ active: activeFilter === filter.id }" role="tab" :aria-selected="activeFilter === filter.id" @click="activeFilter = filter.id">{{ filter.label }}</button></div>
      <div class="news-grid">
        <article v-for="(item, index) in visibleNews" :key="item.id" class="news-card" :style="{ '--card-index': index }">
          <RouterLink class="news-card__link" :to="{ name: 'news-detail', params: { slug: item.slug } }" :aria-label="`${copy.read}: ${item.title}`">
            <div class="news-card__top"><span class="news-date"><b>{{ new Date(item.publishedAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', { day: '2-digit' }) }}</b><small>{{ new Date(item.publishedAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', { month: 'short' }).replace('.', '').toUpperCase() }}</small></span><span class="news-tag">{{ item.categoryLabel }}</span><span class="news-card__arrow">↗</span></div>
            <div class="news-card__art" :class="`news-card__art--${item.cover.theme}`"><img v-if="item.cover.imageUrl" class="news-card__image" :src="item.cover.imageUrl" :alt="item.cover.alt || item.title" loading="lazy"><template v-else><span class="art-orbit"></span><span class="art-symbol">{{ item.category === 'students' ? '✳' : item.category === 'events' ? '✦' : '✺' }}</span><span class="art-word">{{ item.category === 'students' ? 'BILIM' : item.category === 'events' ? 'BIRGA' : 'ILHOM' }}</span></template></div>
            <div class="news-card__copy"><h3>{{ item.title }}</h3><p>{{ item.excerpt }}</p><span class="news-card__read">{{ copy.read }} <span>↗</span></span></div>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section id="people" class="people-section section-pad container">
    <div class="people-heading"><p class="eyebrow"><span class="section-number">03</span>{{ copy.peopleLabel }}</p><h2>{{ copy.peopleTitle }}</h2><p>{{ copy.peopleIntro }}</p></div>
    <div class="people-grid"><article v-for="person in people" :key="person.id" class="person-card" :class="person.role === 'student' ? 'person-card--student' : 'person-card--teacher'"><div class="person-card__shape"><img v-if="person.photo_url" :src="person.photo_url" :alt="person.translations?.[language]?.name" class="person-photo"><span v-else class="person-card__initial">{{ (person.translations?.[language]?.name || (person.role === 'student' ? '13' : 'U')).slice(0, 1) }}</span><span class="person-card__spark">{{ person.role === 'student' ? '✦' : '✳' }}</span></div><div class="person-card__info"><span class="person-card__category">{{ person.role === 'student' ? copy.students : copy.teachers }}</span><h3>{{ person.translations?.[language]?.name }}</h3><p>{{ person.translations?.[language]?.title }}</p><blockquote v-if="person.translations?.[language]?.quote">{{ person.translations?.[language]?.quote }}</blockquote></div></article><template v-if="!people.length"><article class="person-card person-card--teacher"><div class="person-card__shape"><span class="person-card__initial">U</span><span class="person-card__spark">✳</span></div><div class="person-card__info"><span class="person-card__category">{{ copy.teachers }}</span><h3>{{ language === 'uz' ? 'Mehribon ustozlar' : 'Наши учителя' }}</h3><p>{{ copy.teacherRole }}</p><blockquote>{{ copy.teacherQuote }}</blockquote></div></article><article class="person-card person-card--student"><div class="person-card__shape"><span class="person-card__initial">13</span><span class="person-card__spark">✦</span></div><div class="person-card__info"><span class="person-card__category">{{ copy.students }}</span><h3>{{ language === 'uz' ? 'Iqtidorli yoshlar' : 'Талантливые ребята' }}</h3><p>{{ copy.studentRole }}</p><blockquote>{{ copy.studentQuote }}</blockquote></div></article></template></div>
  </section>

  <section id="contact" class="join-section"><div class="container join-section__inner"><div class="join-star">✳</div><p class="eyebrow">13-MAKTAB</p><h2>{{ copy.joinTitle }}</h2><p>{{ copy.joinText }}</p><a href="#about" class="button button--dark">{{ copy.joinCta }} <span>↗</span></a><span class="join-watermark">13</span></div></section>
  </main>
</template>
