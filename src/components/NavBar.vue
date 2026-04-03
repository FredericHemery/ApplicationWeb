<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'Accueil', path: '/', icon: '🏠' },
  { name: 'Travaux', path: '/travaux', icon: '🔨' },
  { name: 'Prenoms', path: '/prenoms', icon: '👶' },
  { name: 'Quiz', path: '/questionnaire', icon: '⭐' },
]
</script>

<template>
  <nav class="nav-bar">
    <div class="flex h-16 items-center px-6 container mx-auto">
      <RouterLink to="/" class="nav-logo">
        <span class="logo-icon">🌌</span>
        <span class="logo-text">StarWars App</span>
      </RouterLink>
      <div class="ml-auto flex gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="nav-link-active"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  background: linear-gradient(180deg, rgba(15, 15, 25, 0.98) 0%, rgba(10, 10, 18, 0.95) 100%);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(10px);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-family: 'Star Jedi', 'Arial Black', sans-serif;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #a0a0a0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
}

.nav-link-active {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.15);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.nav-icon {
  font-size: 1rem;
}
</style>
