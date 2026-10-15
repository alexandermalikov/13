import { newsItems } from '../data/news.js'

// The UI calls this service only; replace its internals with API requests later.
const localized = (item, language) => ({
  id: item.id,
  slug: item.slug,
  status: item.status,
  publishedAt: item.publishedAt,
  category: item.category,
  cover: item.cover,
  ...(item.translations[language] ?? item.translations.uz)
})

export async function getPublishedNews(language = 'uz') {
  return newsItems
    .filter(item => item.status === 'published')
    .slice()
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map(item => localized(item, language))
}

export async function getNewsBySlug(slug, language = 'uz') {
  const item = newsItems.find(entry => entry.slug === slug && entry.status === 'published')
  return item ? localized(item, language) : null
}
