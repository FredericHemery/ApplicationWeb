<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Travaux', path: '/travaux' },
  { name: 'Prenoms', path: '/prenoms' },
]
</script>

<template>
  <nav class="border-b bg-card">
    <div class="flex h-16 items-center px-6 container mx-auto">
      <RouterLink to="/" class="font-bold text-xl text-primary">MonApplication</RouterLink>
      <div class="ml-auto flex gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          active-class="bg-accent text-accent-foreground"
          inactive-class="text-muted-foreground"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
