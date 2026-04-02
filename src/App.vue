<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <NavBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
