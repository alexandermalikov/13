<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getNewsBySlug, getPublishedNews } from '../services/contentService.js'

const props = defineProps({ language: { type: String, required: true } })
const emit = defineEmits(['navigate-section'])
const route = useRoute()
const article = ref(null)
const related = ref([])
const notFound = ref(false)
const isLoading = ref(true)
const labels = computed(() => props.language === 'uz'
  ? { back: 'Yangiliklarga qaytish', home: 'Bosh sahifa', latest: 'Boshqa yangiliklar', notFound: 'Yangilik topilmadi', notFoundText: 'Bu nashr mavjud emas yoki olib tashlangan.', readTime: 'daq. oʻqish' }
  : { back: 'Ко всем новостям', home: 'Главная', latest: 'Другие новости', notFound: 'Новость не найдена', notFoundText: 'Эта публикация недоступна или была удалена.', readTime: 'мин. чтения' })
const formattedDate = computed(() => article.value && new Intl.DateTimeFormat(props.language === 'uz' ? 'uz-UZ' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(article.value.publishedAt)))
const readingTime = computed(() => article.value ? Math.max(1, Math.ceil(article.value.body.join(' ').split(/\s+/).length / 180)) : 1)

let requestId = 0
async function loadArticle() {
  const currentRequest = ++requestId
  isLoading.value = true
  article.value = null
  notFound.value = false
  const slug = route.params.slug
  const [nextArticle, allNews] = await Promise.all([
    getNewsBySlug(slug, props.language),
    getPublishedNews(props.language)
  ])
  if (currentRequest !== requestId) return
  article.value = nextArticle
  notFound.value = !nextArticle
  related.value = allNews.filter(item => item.slug !== slug).slice(0, 2)
  document.title = nextArticle ? `${nextArticle.title} — 13-maktab` : '13-maktab — Yangiliklar'
  isLoading.value = false
}

watch(() => [route.params.slug, props.language], loadArticle, { immediate: true })
</script>

<template>
  <main class="article-page container">
    <nav class="article-breadcrumb" :aria-label="language === 'uz' ? 'Sahifa yoʻli' : 'Навигационная цепочка'">
      <button type="button" @click="emit('navigate-section', 'home')">{{ labels.home }}</button><span>/</span><button type="button" @click="emit('navigate-section', 'news')">{{ language === 'uz' ? 'Yangiliklar' : 'Новости' }}</button><span>/</span><span class="article-breadcrumb__current">{{ article?.title ?? labels.notFound }}</span>
    </nav>

    <section v-if="isLoading" class="article-not-found article-loading"><p>{{ language === 'uz' ? 'Yangilik yuklanmoqda…' : 'Загружаем публикацию…' }}</p></section>

    <section v-else-if="notFound" class="article-not-found">
      <span class="article-not-found__number">404</span><h1>{{ labels.notFound }}</h1><p>{{ labels.notFoundText }}</p>
      <button class="button button--dark" type="button" @click="emit('navigate-section', 'news')">{{ labels.back }} <span>↗</span></button>
    </section>

    <article v-else-if="article" class="article-detail">
      <header class="article-header">
        <span class="article-category">{{ article.categoryLabel }}</span>
        <h1>{{ article.title }}</h1>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <div class="article-meta"><time :datetime="article.publishedAt">{{ formattedDate }}</time><span class="article-meta__dot"></span><span>{{ readingTime }} {{ labels.readTime }}</span></div>
      </header>

      <div class="article-cover" :class="`news-card__art--${article.cover.theme}`" role="img" :aria-label="article.title">
        <img v-if="article.cover.imageUrl" class="article-cover__image" :src="article.cover.imageUrl" :alt="article.cover.alt || article.title"><template v-else><span class="article-cover__rings"></span><span class="article-cover__spark">{{ article.category === 'students' ? '✳' : article.category === 'events' ? '✦' : '✺' }}</span><span class="article-cover__school">13</span></template>
      </div>

      <div class="article-body-layout">
        <aside class="article-aside"><span class="article-aside__line"></span><span>{{ language === 'uz' ? '13-MAKTAB YANGILIKLARI' : 'НОВОСТИ ШКОЛЫ № 13' }}</span></aside>
        <div class="article-body"><p v-for="(paragraph, index) in article.body" :key="index" :class="{ 'article-lead': index === 0 }">{{ paragraph }}</p><div class="article-signoff"><span>✳</span>{{ language === 'uz' ? '13-maktab jamoasi' : 'Команда школы № 13' }}</div></div>
      </div>

      <footer class="article-footer"><button class="text-link" type="button" @click="emit('navigate-section', 'news')">← {{ labels.back }}</button><span class="article-footer__mark">13 — {{ language === 'uz' ? 'BILIM VA ILHOM' : 'ЗНАНИЯ И ВДОХНОВЕНИЕ' }}</span></footer>
    </article>

    <section v-if="article && related.length" class="related-news">
      <div class="section-heading"><div><p class="eyebrow"><span class="section-number">↗</span>{{ labels.latest }}</p></div><button class="text-link" type="button" @click="emit('navigate-section', 'news')">{{ labels.back }} <span>↗</span></button></div>
      <div class="related-news__grid"><RouterLink v-for="item in related" :key="item.id" class="related-card" :to="{ name: 'news-detail', params: { slug: item.slug } }"><span class="news-tag">{{ item.categoryLabel }}</span><h2>{{ item.title }}</h2><p>{{ item.excerpt }}</p><span class="related-card__arrow">↗</span></RouterLink></div>
    </section>
  </main>
</template>
