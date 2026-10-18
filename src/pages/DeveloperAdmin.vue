<script setup>
import { ref } from 'vue'
import { clearAdminSession, createAdminAccount, hasAdminSession, hasDeveloperRole, isSupabaseConfigured, signIn } from '../services/contentService.js'

const configured = isSupabaseConfigured()
const authenticated = ref(hasAdminSession())
const developer = ref(hasDeveloperRole())
const loginEmail = ref('')
const loginPassword = ref('')
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const notice = ref('')

async function login() {
  busy.value = true; error.value = ''
  try { await signIn(loginEmail.value, loginPassword.value); authenticated.value = true; developer.value = hasDeveloperRole(); if (!developer.value) error.value = 'У этой учётной записи нет роли разработчика.' }
  catch (e) { error.value = e.message }
  finally { busy.value = false }
}
async function addAdmin() {
  busy.value = true; error.value = ''; notice.value = ''
  try { const created = await createAdminAccount(email.value, password.value); notice.value = `Администратор ${created.email} создан. Теперь он может войти в панель по адресу /#/admin.`; email.value = ''; password.value = '' }
  catch (e) { error.value = e.message }
  finally { busy.value = false }
}
function logout() { clearAdminSession(); authenticated.value = false; developer.value = false }
</script>

<template>
  <main class="admin-page">
    <section v-if="!authenticated || !developer" class="admin-login">
      <a class="admin-back" href="#/">← На сайт</a>
      <div class="admin-login-card">
        <span class="admin-mark">13</span><p class="eyebrow">13-MAKTAB · DEVELOPER</p>
        <h1>{{ authenticated ? 'Нет доступа' : 'Панель разработчика' }}</h1>
        <p class="admin-muted">{{ authenticated ? 'Войдите под учётной записью с ролью developer.' : 'Вход по email и паролю учётной записи разработчика Supabase.' }}</p>
        <form v-if="!authenticated" @submit.prevent="login">
          <label>Email<input v-model="loginEmail" type="email" autocomplete="username" required></label>
          <label>Пароль<input v-model="loginPassword" type="password" autocomplete="current-password" required></label>
          <button class="admin-primary" :disabled="busy || !configured">{{ busy ? 'Входим…' : 'Войти' }}</button>
        </form>
        <button v-else class="admin-primary" @click="logout">Выйти</button>
        <p v-if="!configured" class="admin-hint">Сначала подключите Supabase в `.env.local`.</p>
        <p v-if="error" class="admin-error">{{ error }}</p>
      </div>
    </section>

    <section v-else class="admin-layout">
      <aside class="admin-sidebar"><a class="admin-brand" href="#/"><span class="admin-mark">13</span><span>13-MAKTAB<small>DEVELOPER</small></span></a><p class="admin-nav-label">УПРАВЛЕНИЕ ДОСТУПОМ</p><a class="developer-nav-link" href="#/admin">↗ Обычная админ-панель</a><div class="admin-sidebar-bottom"><a href="#/">↗ Посмотреть сайт</a><button @click="logout">Выйти</button></div></aside>
      <div class="admin-main"><header class="admin-topbar"><div><span>13-MAKTAB / DEVELOPER</span><h1>Администраторы</h1></div><div class="admin-status"><i class="is-connected"></i>Supabase</div></header>
        <section class="admin-content"><div class="admin-section-head"><div><h2>Добавить администратора</h2><p>Аккаунт будет создан в Supabase Auth и сразу получит право редактировать сайт.</p></div></div>
          <div class="admin-panel developer-form"><form @submit.prevent="addAdmin"><label>Email нового администратора<input v-model="email" type="email" autocomplete="off" placeholder="name@example.com" required></label><label>Пароль<input v-model="password" type="password" autocomplete="new-password" minlength="8" required><small>Не менее 8 символов. Передайте пароль администратору безопасным способом.</small></label><button class="admin-primary" :disabled="busy">{{ busy ? 'Создаём…' : 'Создать администратора' }}</button></form></div>
          <p v-if="notice" class="admin-success developer-message">{{ notice }}</p><p v-if="error" class="admin-error developer-message">{{ error }}</p>
        </section>
      </div>
    </section>
  </main>
</template>
